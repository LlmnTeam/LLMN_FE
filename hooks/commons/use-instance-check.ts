import { useState, useEffect } from "react";
import { validateIPv4, validateIPv6, filterInput } from "@/libs/ip-utils";
import useIsMobile from "./use-is-mobile";
import { validateRemoteName } from "@/libs/validation-utils";
import { SSHPemKeyUpload, validateInstance } from "@/api/login/instance-check";

interface UseInstanceCheckReturn {
  remoteName: string;
  remoteHost: string;
  remoteKeyPath: string;
  remoteNameMsg: string;
  remoteHostMsg: string;
  remoteKeyPathMsg: string;
  isValidRemoteName: boolean;
  isValidRemoteHost: boolean;
  isValidRemoteKeyPath: boolean;
  isValidInstance: boolean;
  handleRemoteNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoteHostChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoteKeyPathChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  checkInstanceValidity: () => void;
  resetRemoteValues: () => void;
}

export default function useInstanceCheck(
  initialRemoteName: string = "",
  initialRemoteHost: string = "",
  initialRemoteKeyPath: string = ""
): UseInstanceCheckReturn {
  const [remoteName, setRemoteName] = useState<string>("");
  const [remoteHost, setRemoteHost] = useState<string>("");
  const [remoteKeyPath, setRemoteKeyPath] = useState<string>("");
  const [isValidRemoteName, setIsValidRemoteName] = useState<boolean>(false);
  const [isValidRemoteHost, setIsValidRemoteHost] = useState<boolean>(false);
  const [isValidRemoteKeyPath, setIsValidRemoteKeyPath] =
    useState<boolean>(false);
  const [remoteNameMsg, setRemoteNameMsg] = useState<string>("");
  const [remoteHostMsg, setRemoteHostMsg] = useState<string>("");
  const [remoteKeyPathMsg, setRemoteKeyPathMsg] = useState<string>("");

  const [isValidInstance, setIsValidInstance] = useState<boolean>(false);

  const isMobile = useIsMobile(640);

  useEffect(() => {
    setRemoteName(initialRemoteName);
    setRemoteHost(initialRemoteHost);
    setRemoteKeyPath(initialRemoteKeyPath);
  }, [initialRemoteName, initialRemoteHost, initialRemoteKeyPath]);

  const handleRemoteNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputRemoteName = event.target.value;
    setRemoteName(inputRemoteName);

    if (inputRemoteName.trim() === "") {
      setIsValidRemoteName(false);
      setRemoteNameMsg("");
      return;
    }

    if (validateRemoteName(inputRemoteName)) {
      setIsValidRemoteName(true);
      setRemoteNameMsg("사용 가능한 사용자명입니다.");
    } else {
      setIsValidRemoteName(false);
      setRemoteNameMsg(
        "3~32자의 영어, 숫자, 하이픈(-), 밑줄(_)을 입력해주세요."
      );
    }
  };

  const handleRemoteHostChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    let inputRemoteHost = event.target.value;
    const isIPv6 = inputRemoteHost.includes(":");
    const cleanedRemoteHost = filterInput(inputRemoteHost, isIPv6);
    setRemoteHost(cleanedRemoteHost);

    if (cleanedRemoteHost.trim() === "") {
      setRemoteHostMsg("");
      setIsValidRemoteHost(false);
      return;
    }

    if (!cleanedRemoteHost.includes(".") && !cleanedRemoteHost.includes(":")) {
      setIsValidRemoteHost(false);
      setRemoteHostMsg("IPv4 또는 IPv6 형식 중 하나만 입력하세요.");
      return;
    }

    if (isIPv6) {
      if (validateIPv6(cleanedRemoteHost)) {
        setIsValidRemoteHost(true);
        setRemoteHostMsg("유효한 IPv6 주소입니다.");
      } else {
        setIsValidRemoteHost(false);
        setRemoteHostMsg(
          isMobile
            ? "IPv6 형식에 맞춰 입력하세요. 예: 2001:db8::1"
            : "IPv6 형식에 맞춰 입력하세요. 예: 2001:0db8:85a3:0000:0000:8a2e:0370:7334"
        );
      }
    } else {
      if (validateIPv4(cleanedRemoteHost)) {
        setIsValidRemoteHost(true);
        setRemoteHostMsg("유효한 IPv4 주소입니다.");
      } else {
        setIsValidRemoteHost(false);
        setRemoteHostMsg("IPv4 형식에 맞춰 입력하세요. 예: 192.168.0.1");
      }
    }
  };

  const handleRemoteKeyPathChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    console.log("file: ", file);
    if (!file) return;

    const result = await SSHPemKeyUpload(file);
    if (result && typeof result === "string") {
      setRemoteKeyPath(result);
      setIsValidRemoteKeyPath(true);
      setRemoteKeyPathMsg("프라이빗 키 업로드가 완료되었습니다.");
    } else {
      setRemoteKeyPath("");
      setIsValidRemoteKeyPath(false);
      setRemoteKeyPathMsg(
        "프라이빗 키 업로드에 실패했습니다. 다시 시도해주세요."
      );
    }
  };

  useEffect(() => {
    if (remoteHost.includes(":")) {
      setRemoteHostMsg(
        isMobile
          ? "IPv6 형식에 맞춰 입력하세요. 예: 2001:db8::1"
          : "IPv6 형식에 맞춰 입력하세요. 예: 2001:0db8:85a3:0000:0000:8a2e:0370:7334"
      );
    }

    console.log("isMobile: ", isMobile);
    console.log("remoteHostMsg: ", remoteHostMsg);
  }, [isMobile, isValidRemoteHost, remoteHost]);

  const checkInstanceValidity = async (): Promise<void> => {
    const isValid = await validateInstance({
      remoteName,
      remoteHost,
      remoteKeyPath,
    });
    setIsValidInstance(isValid);
  };

  const resetRemoteValues = () => {
    setRemoteName("");
    setRemoteHost("");
    setRemoteKeyPath("");
    setIsValidRemoteName(false);
    setIsValidRemoteHost(false);
    setIsValidRemoteKeyPath(false);
    setRemoteNameMsg("");
    setRemoteHostMsg("");
    setRemoteKeyPathMsg("");
    setIsValidInstance(false);
  };

  return {
    remoteName,
    remoteHost,
    remoteKeyPath,
    remoteNameMsg,
    remoteHostMsg,
    remoteKeyPathMsg,
    isValidRemoteName,
    isValidRemoteHost,
    isValidRemoteKeyPath,
    isValidInstance,
    handleRemoteNameChange,
    handleRemoteHostChange,
    handleRemoteKeyPathChange,
    checkInstanceValidity,
    resetRemoteValues,
  };
}
