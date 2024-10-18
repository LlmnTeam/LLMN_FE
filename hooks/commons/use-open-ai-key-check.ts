import { useEffect, useState } from "react";

interface useOpenAIKeyCheckReturn {
  openAIKey: string;
  isVaildOpenAIKey: boolean | null;
  openAIKeyMsg: string;
  handleOpenAIKeyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // verifyOpenAIKey: () => Promise<void>;
}

export default function useOpenAIKeyCheck(): useOpenAIKeyCheckReturn {
  const [openAIKey, setOpenAIKey] = useState<string>("");
  const [isVaildOpenAIKey, setIsValidOpenAIKey] = useState<boolean>(false);
  const [openAIKeyMsg, setOpenAIKeyMsg] = useState<string>("");

  const handleOpenAIKeyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputOpenAIKey = event.target.value;
    setOpenAIKey(inputOpenAIKey);

    if (inputOpenAIKey.trim() === "") {
      setIsValidOpenAIKey(false);
      setOpenAIKeyMsg("");
    }
  };

  // const verifyNickname = async (): Promise<void> => {
  //   if (!validateNickname(nickname)) {
  //     setIsValidNickname(false);
  //     setNicknameMsg("2자 이상 8자 이하의 한글, 영어, 숫자를 입력하세요.");
  //     return;
  //   }

  //   try {
  //     const result = await checkNicknameDuplication(nickname);
  //     console.log("result: ", result);
  //     if (!result.isDuplicate) {
  //       setIsValidNickname(true);
  //       setNicknameMsg("사용 가능한 닉네임입니다.");
  //     } else {
  //       setIsValidNickname(false);
  //       setNicknameMsg("이미 사용 중인 닉네임입니다.");
  //     }
  //   } catch (error) {
  //     console.error("닉네임 체크 중 오류 발생:", error);
  //     setIsValidNickname(false);
  //     setNicknameMsg("닉네임 검사 중 오류가 발생했습니다.");
  //   }
  // };

  useEffect(() => {
    const timer = setTimeout(async () => {
      // if (nickname) {
      //   await verifyNickname();
      // }
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return {
    openAIKey,
    isVaildOpenAIKey,
    openAIKeyMsg,
    handleOpenAIKeyChange,
    // verifyOpenAIKey,
  };
}
