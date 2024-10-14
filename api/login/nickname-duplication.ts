export const checkNicknameDuplication = async (
  nickname: string
): Promise<{ isDuplicate: boolean }> => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${baseURL}/accounts/check/nick`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickName: nickname }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: { isDuplicate: boolean } = await response.json();
    console.log("nick data", data);
    return data; // 서버 응답 반환
  } catch (error) {
    console.error("닉네임 체크 중 오류 발생:", error);
    throw error; // 에러 처리를 호출한 곳으로 전파
  }
};
