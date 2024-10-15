import { checkNicknameDuplication } from "@/api/login/nickname-check";
import { useEffect, useState } from "react";

interface UseNicknameCheckReturn {
  nickname: string;
  isPossibleNickname: boolean | null;
  nicknameMsg: string;
  handleNicknameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  verifyNickname: () => Promise<void>;
}

export const useNicknameCheck = (): UseNicknameCheckReturn => {
  const [nickname, setNickname] = useState<string>("");
  const [isPossibleNickname, setIsPossibleNickname] = useState<boolean | null>(
    null
  );
  const [nicknameMsg, setNicknameMsg] = useState<string>(
    "닉네임은 2자 이상 8자 이하로 설정해주세요."
  );

  const validateNickname = (nickname: string): boolean => {
    const regex = /^.{2,8}$/;
    return regex.test(nickname);
  };

  const handleNicknameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputNickname = event.target.value;
    setNickname(inputNickname);
    if (inputNickname.trim() === "") {
      setNicknameMsg("닉네임은 2자 이상 8자 이하로 설정해주세요.");
      setIsPossibleNickname(null);
    }
  };

  const verifyNickname = async (): Promise<void> => {
    if (!validateNickname(nickname)) {
      setNicknameMsg("닉네임은 2자 이상 8자 이하로 설정해주세요.");
      setIsPossibleNickname(null);
      return;
    }

    try {
      const result = await checkNicknameDuplication(nickname);
      console.log("result: ", result);
      if (!result.isDuplicate) {
        setIsPossibleNickname(true);
        setNicknameMsg("사용 가능한 닉네임입니다.");
      } else {
        setIsPossibleNickname(false);
        setNicknameMsg("이미 사용 중인 닉네임입니다.");
      }
    } catch (error) {
      console.error("닉네임 체크 중 오류 발생:", error);
      setIsPossibleNickname(false);
      setNicknameMsg("닉네임 검사 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (nickname) {
        await verifyNickname();
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [nickname]);

  return {
    nickname,
    isPossibleNickname,
    nicknameMsg,
    handleNicknameChange,
    verifyNickname,
  };
};
