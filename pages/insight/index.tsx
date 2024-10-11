import ConfirmModal from "@/components/commons/confirm-modal";
import Container from "@/components/commons/container";
import DropdownMenu from "@/components/commons/dropdown-menu";
import Layout from "@/components/commons/layout";
import { useState } from "react";

const data = {
  id: 93,
  time: "2024-09-30 17:05",
  content:
    "- 성능 개요  \n   - CPU  \n     - 평균 사용량: 12.70%  \n     - 최대 사용량: 18.70% (발생 시간: 16:50)  \n   - 메모리  \n     - 평균 사용량: 35.52 MB  \n     - 최대 사용량: 35.54 MB (발생 시간: 16:50)  \n   - 네트워크 수신  \n     - 평균 수신량: 0.07 KB  \n     - 최대 수신량: 0.13 KB (발생 시간: 16:50)  \n   - 네트워크 송신  \n     - 평균 송신량: 0.09 KB  \n     - 최대 송신량: 0.16 KB (발생 시간: 16:50)  \n\n- 탐지된 비정상 패턴  \n   1. CPU 사용량이 17:00에 급격히 감소하여 6.70%로 떨어졌습니다. 이는 비정상적인 패턴으로, 시스템의 부하가 갑자기 줄어들었음을 나타냅니다.  \n   2. 네트워크 송신량이 16:50에서 17:00 사이에 0.16 MB에서 0.02 MB로 급감했습니다. 이는 데이터 전송에 문제가 발생했을 가능성을 시사합니다.  \n\n- 권장 조치  \n   1. CPU 사용량 감소 원인 분석 및 시스템 로그 검토 필요.  \n   2. 네트워크 송신 문제 해결을 위해 네트워크 장비 점검 및 설정 확인 필요.  ",
  isChecked: false,
};

export default function Insight() {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const openConfirmModal = (option: string) => {
    setSelectedOption(option);
    setIsConfirmModalOpen(true);
  };
  const closeConfirmModal = () => setIsConfirmModalOpen(false);

  const handleMenuSelect = (option: string) => {
    if (option === "edit") return;
    openConfirmModal(option);
  };
  return (
    <Layout>
      <div className="px-5 xs:px-7 sm:px-10 max-w-[1200px]">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row justify-start items-center gap-2 xs:gap-5">
            <span className="text-[24px] xs:text-[30px] sm:text-[36px] text-black font-bold pl-1">
              인사이트
            </span>
          </div>
          <div className="flex flex-row justify-start items-center gap-0.5">
            <div>
              <DropdownMenu options={["edit", "restart", "stop", "delete"]} />
            </div>
          </div>
        </div>
        <div className="text-[12px] xs:text-[15px] sm:text-[18px] text-[#979797] font-semibold mt-1 xs:mt-2 pl-1">
          ForPaw BE의 스프링 프로젝트
        </div>
        <Container
          title="성능 요약"
          link="/insight"
          update="2024.09.10_18 업데이트됨"
        >
          <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {data.content}
          </div>
        </Container>
        <Container
          title="일일 요약"
          link="/insight"
          update="2024.09.10_18 업데이트됨"
        >
          <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {
              "[Spring] \n- [❗ Critical] 2024-09-10 11:30: /api/orders 엔드포인트에서 HTTP 500 에러 발생. 응답 시간 5초 이상 지연. \n- [⚠Warning] 2024-09-10 15:00: /api/users 요청 200회 중 10회 실패(서버 연결 끊김). \n[MongoDB] \n- [❗ Critical] 2024-09-10 12:45:데이터베이스 연결 실패 2회 발생 (Connection Timeout). \n- [ℹ Info]2024-09-10 18:00: 쿼리 실행 시간 1초 초과 경고 발생 (N+1 쿼리감지). \n[FastAPI] \n- [⚠ Warning] 2024-09-10 09:30: 인증 요청 실패율15% 발생 (로그인 시도 실패 증가). \n- [ℹ Info] 2024-09-10 16:45:서버 메모리 사용량 90% 도달. 메모리 최적화 필요. "
            }
          </div>
        </Container>
        <Container
          title="장기 트렌드 분석"
          link="/insight"
          update="2024.09.10_18 업데이트됨"
        >
          <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {
              "- 지난 7일간 CPU 사용량 평균: 65%, 최대: 92% \n- 메모리 사용량 추세: 평균 75%, 증가 추세 \n- 데이터베이스 응답 시간 평균: 1.5초, 최근 24시간 동안 10% 증가 \n- 네트워크 트래픽: 수신량 20% 증가, 송신량 15% 증가 \n- 장기적으로 CPU 사용량이 지속적으로 증가하고 있으며, 리소스 확장이 필요할 수 있습니다."
            }
          </div>
        </Container>
        <Container
          title="추천"
          link="/insight"
          update="2024.09.10_18 업데이트됨"
        >
          <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {
              "- 현재 CPU 사용량이 85% 이상으로 높습니다. CPU 리소스 확장 또는 트래픽 부하 분산을 권장합니다. \n- 데이터베이스 응답 시간이 느려지고 있습니다. 쿼리 최적화 및 데이터베이스 인덱스를 점검하십시오. \n- 메모리 사용량이 90%에 도달할 가능성이 높습니다. 캐시 설정을 최적화하여 메모리 사용을 줄이십시오. \n- 네트워크 트래픽이 급증하고 있습니다. 네트워크 설정을 최적화하여 성능 문제를 방지하십시오."
            }
          </div>
        </Container>
      </div>
    </Layout>
  );
}
