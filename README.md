<p align="center">
  <img src="docs/images/banner.jpg" width="300" alt="배너">
</p>

</br>

> **미리보기**
> - 💡 [프로젝트 소개](#1-프로젝트-소개)
> - 📌 [시스템 구성도](#21-시스템-구성도)
> - 🗂 [사용 기술](#22-사용-기술)
> - 🎥 [소개 및 시연 영상](#3-소개-및-시연-영상)
> - 🙇🏻‍♂️ [팀 소개](#4-팀-소개)
</br>

## 1. 프로젝트 소개
### 1.1. 개발 배경 및 필요성
멀티 클라우드 환경과 MSA 도입으로 인해 애플리케이션이 여러 인프라에 **분산**되면서 로그 데이터의 양이 **급증**하고 있다. 이에 따라 로그 데이터를 체계적으로 수집하고 신속히 분석하는 역량이 더욱 중요해졌다.

그러나, 기존의 규칙 기반 탐지 방식은 **고정된 패턴**이나 사전 정의된 **조건**에 의존하기 때문에, 새로운 문제나 예상치 못한 비정상적인 동작을 감지하는 데 **한계**가 있다. 
</br></br>
<img width="1400" alt="기존의 문제" src="docs/images/past.png">
</br>

이를 해결하기 위해 **LLM** 기반 로그 분석 시스템을 도입하여

  > - 로그 데이터를 자동으로 **요약**하고,
  > - 비정상적인 패턴을 **탐지**하며,
  > - 관리자가 핵심 정보를 신속하게 **파악**하고 **대응**할 수 있도록 지원한다.
</br>

### 1.2. 개발 목표

이 프로젝트의 목표는 **멀티 클라우드** 환경에서 발생하는 대규모 **로그** 데이터를 효율적으로 **수집**하고, **LLM**을 활용해 이를 요약하고 분석하는 시스템을 구축하는 것이다.

  > - 실시간 로그 모니터링을 통해 주요 이벤트를 **포착**하고, 이상 패턴을 신속하게 **탐지**하여, 관리자가 로그 데이터를 일일이 분석하지 않아도 **문제**를 빠르게 파악할 수 있도록 지원한다.
  > - 로그 데이터를 **계층적**으로 요약하고, **중요도**에 따라 선별 제공하여, 관리자가 **핵심 정보**에 집중할 수 있도록 설계한다.
  > - 구체적인 **대응 방안**을 제공하여 비정상적인 시스템 동작을 신속하게 **해결**할 수 있도록 지원한다.
</br>

이 시스템을 통해 로그 데이터 분석에 대한 **부담**을 줄이고, 문제를 보다 **신속**하고 **효율**적으로 해결할 수 있다. </br></br>

### 1.3 주요 내용</br>

| 구분 | 주요 내용 | 
|:------------:|--------------|
| LLM 기반 로그 분석 | - 광범위한 데이터 학습으로 **범용성**을 갖춘 LLM 활용 (GPT 4o-mini)<br>- 특정 서비스 종속성 없이 **일관**된 분석 수행<br>- 정교한 프롬프팅 기법을 통한 세밀한 분석 | 
| 로그 데이터 수집 및 표준화 | - Filebeat & Logstash로 다양한 로그 형식 통합<br>- Elasticsearch에 **통일된** 구조로 저장<br>- 로그 형식이 달라도 공통 필드로 **일관성** 확보 |
| 계층적 로그 분석 | - 로그를 **시간대별**로 분류 & 요약<br>- `시간대별 요약 → 일일 요약 → 주간 요약` 순으로 **단계적** 분석<br>- LLM 사용 시, 컨텍스트가 길어지면 이전 대화를 **자동 요약**하여 토큰 절약| 
| 원격 서버 제어 | - **SSH**로 원격 서버에 접근해, 문제 발생 시 신속 대응 가능<br>- 실시간 성능 지표 모니터링 |
| 반응형 웹 인터페이스 제공 | - PC, 태블릿, 모바일 등 **다양한 기기**에 일관된 사용자 경험 제공<br>|

</br>

## 2. 상세설계
### 2.1. 시스템 구성도
#### 2.1.1. 아키텍쳐</br>
<img width="850" alt="시스템 구성도" src="docs/images/architecture.png">
</br></br>

  > - 각 클라우드 인스턴스의 도커 컨테이너에서 생성된 로그를 Filebeat가 **수집**한 뒤, Logstash로 전달하여 **전처리**한다.
  > - 전처리된 로그는 ElasticSearch에 **저장**되고, Spring Boot가 이를 활용하거나 FastAPI에 분석을 요청한다.
  > - FastAPI는 OpenAI API를 활용해 로그 데이터를 **분석**하고 **요약**한 뒤, MySQL에 **저장**한다.
  > - 사용자가 특정 로그에 대한 **질문**하면, FastAPI가 로그 데이터와 대화 컨텍스트를 기반으로 OpenAI API를 호출한 뒤, **분석 결과**를 SSE 스트리밍 방식으로 사용자에게 **전달**한다.
  > - 사용자가 클라우드 서버를 원격 제어하기 위해 **명령**을 내리면, Apache MINA SSHD가 SSH를 통해 **실행**하고, Redis Pub/Sub을 통해 실행 결과를 사용자에게 **전달**한다.
</br>

#### 2.1.2. 로그 데이터 관리 </br>
<img width="750" alt="로그 데이터 관리" src="docs/images/log_file_manage.png">
</br>

  > - 모든 로그 데이터를 그대로 저장하는 대신, 시간대별로 **요약**하여 주요 이벤트만 축적하는 방식으로 관리한다.
  > - 시간대별 요약 데이터를 바탕으로 '**일일 요약**'을 생성하고, 이를 다시 종합해 '**주간 요약**'을 생성하는 **다단계 분석** 방식 채택.
</br>

#### 2.1.3. 토큰 한계를 해결하는 대화 맥락 유지 </br>
<img width="600" alt="대화 맥락 유지" src="docs/images/token_management.png">
</br>

  > - 대화가 일정량 이상 누적될 때마다 시스템이 이전 대화를 **요약**하여 프롬프트에 포함.
  > - 요약된 대화는 새로운 질문과 함께 시스템 프롬프트에 **추가**되어, LLM이 이전 대화 **맥락**을 유지하면서 답변할 수 있도록 지원한다.
</br>

### 2.2. 사용 기술

| 번호 | 기술               | 버전   | 번호 | 기술                | 버전   |
|:----:|:------------------:|:------:|:----:|:-------------------:|:------:|
| 1    | Filebeat          | 8.5    | 10   | Junit5             | 5.10.2 |
| 2    | ElasticSearch     | 8.15   | 11   | FastAPI            | 0.110.3 |
| 3    | Logstash          | 8.15   | 12   | Gradle             | 8.5    |
| 4    | Docker            | 24.0.5 | 13   | React              | 18     |
| 5    | Redis             | 7.24   | 14   | TypeScript         | 5.6    |
| 6    | MySQL             | 8.0.33 | 15   | NextJS             | 14.2.13 |
| 7    | Java JDK          | 17.0.9 | 16   | Tailwind CSS       | 3.4.1  |
| 8    | Spring Boot       | 3.2.0  | 17   | Apache MINA SSHD   | 2.93   |
| 9    | JWT               | 4.3.0  | 18   | Figma              | UI3    |
</br>

## 3. 소개 및 시연 영상
### 3.1. 소개 </br>
|로그인|회원가입(3단계 중 2단계, 클라우드 등록)|
|:--:|:--:|
|<img width="500" alt="로그인" src="docs/images/로그인.png">|<img width="500" alt="회원가입" src="docs/images/회원가입.png">|

|대시보드|검색|
|:--:|:--:|
|<img width="500" alt="대시보드" src="docs/images/대시보드.png">|<img width="500" alt="검색" src="docs/images/검색.png">|

|프로젝트 목록|프로젝트 상세조회|
|:--:|:--:|
|<img width="500" alt="프로젝트 목록" src="docs/images/프로젝트.png">|<img width="500" alt="프로젝트 상세조회" src="docs/images/로그 개요.png">|

|로그 조회|로그 요약|
|:--:|:--:|
|<img width="500" alt="로그 조회" src="docs/images/로그 조회.png">|<img width="500" alt="로그 요약" src="docs/images/로그 요약.png">|

|질문하기|원격 SSH 명령|
|:--:|:--:|
|<img width="500" alt="질문하기" src="docs/images/질문.png">|<img width="500" alt="원격 SSH 명령" src="docs/images/커맨드.png">|

|인사이트(성능요약, 일일요약) |인사이트(주간 요약, 추천)|
|:--:|:--:|
|<img width="500" alt="인사이트 1" src="docs/images/인사이트 1.png">|<img width="500" alt="인사이트 2" src="docs/images/인사이트 2.png">|

|대시보드(모바일) ||프로젝트(모바일)||
|:--:|:--:|:--:|:--:|
|<img width="250" alt="대시보드(모바일)_1" src="docs/images/dashboard_1-mobile.png">|<img width="250" alt="대시보드(모바일)_2" src="docs/images/dashboard_2-mobile.png">|<img width="250" alt="프로젝트 목록(모바일)" src="docs/images/project_list-mobile.png">|<img width="250" alt="프로젝트 상세조회(모바일)" src="docs/images/project_detail-mobile.png">|

|인사이트(모바일) |질문하기(모바일)|원격 SSH 명령(모바일)|검색(모바일)|
|:--:|:--:|:--:|:--:|
|<img width="250" alt="인사이트(모바일)" src="docs/images/insight-mobile.png">|<img width="250" alt="질문하기(모바일)" src="docs/images/chatbot-mobile.png">|<img width="250" alt="원격 SSH 명령(모바일)" src="docs/images/llmn_terminal-dark-mobile.png">|<img width="250" alt="검색(모바일)" src="docs/images/search-mobile.png">|
</br>

### 3.2. 시연 영상 </br>
- **회원가입 (정보 입력 → 모니터링할 클라우드의 SSH 정보 검증 및 등록 → OpenAI 키 검증 및 추가)**

https://github.com/user-attachments/assets/b7565570-59dd-4459-b86e-dc59c5bd0f54

</br>

- **로그 요약 및 인사이트 조회, 로그 검색** 

https://github.com/user-attachments/assets/9c2ae38d-41b0-4252-9841-b8a054e96235

</br>

- **특정 로그에 대해 질문하기**

https://github.com/user-attachments/assets/b23fdeee-924a-478a-9b58-0596aaa2e955

</br>

- **클라우드 서버 원격 제어를 위해 명령 내리기 (SSH)**

https://github.com/user-attachments/assets/1df00660-5230-4598-88d3-076efc01772e

</br>

### 3.3. 발표 영상 </br>
<a href="https://www.youtube.com/watch?v=EM1icrt529k&list=PLFUP9jG-TDp-CVdTbHvql-WoADl4gNkKj&index=43">
  <img src="docs/images/with_play_button.png" alt="프로젝트 소개 영상" width="500"/>
</a>

</br></br>

### 3.4. 기술 문서
> 프로젝트의 더 자세한 내용을 알고 싶다면,
[기술 보고서](https://drive.google.com/file/d/1BxEIVz1w0_RAQzgx6qRXeIWAzMcSfHMQ/view?usp=sharing)와 [API 문서](https://blog.naver.com/hoyai-/223493668067)를 참고해 주세요.
</br>

## 4. 팀 소개

| 이름  | 역할  | 내용  |
|:------:|:----:|------|
| 이종일  | FE | <ul><li>React, NextJS, TS, TailWind CSS를 이용한 웹 페이지 구현</li><li>UI/UX 개선을 통한 반응형 웹 페이지 구현</li><li>SSR을 활용하여 사용자 요청에 따른 효율적인 동적 데이터 처리 구현</li><li>SSR과 JWT 토큰 기반 인증으로 효율적인 로그인 상태 관리 및 접근 제어 로직 개발</li><li>입력 폼에서 실시간 피드백을 제공하는 마이크로 메시지 로직 설계 및 구현</li></ul> |
| 이한홍  | BE | <ul><li>API 명세 및 DB 설계</li><li>Figma를 활용한 UI/UX 디자인</li><li>기술 보고서 작성</li><li>Filebeat, Logstash, ElasticSearch를 활용한 로그 수집 파이프라인 구축 및 Spring Boot 연동</li><li>사용자가 클라우드 서버를 원격 제어할 수 있도록 Apache MINA SSHD를 활용한 SSH 실행 및 Redis Pub/Sub 기반 응답 처리 기능 구현</li><li>사용자가 특정 로그에 대해 질문하면 이를 분석하고,  SSE 스트리밍 방식으로 답변을 제공하는 챗봇 기능 구현</li><li>OpenAI API를 활용한 로그 요약·분석 및 이상 징후 자동 탐지 기능 구현</li></ul> |
| 박재홍  | Demo | <ul><li>시연회 준비 및 발표 자료 제작</li></ul> |
