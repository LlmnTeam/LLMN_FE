import { useState, useEffect } from "react";
import { useIsMobile } from "./use-is-mobile";

const validateIPv4 = (value: string) => {
  const pattern =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return pattern.test(value);
};

const validateIPv6 = (value: string) => {
  const pattern = /^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4})$/;
  return pattern.test(value);
};

const filterInput = (value: string, isIPv6: boolean): string => {
  if (isIPv6) {
    return value.replace(/[^0-9a-fA-F:]/g, "");
  } else {
    return value.replace(/[^0-9.]/g, "");
  }
};

interface UseInstanceCheckReturn {
  remoteName: string;
  remoteHost: string;
  remoteKeyPath: string;
  remoteHostMsg: string;
  isValidRemoteHost: boolean | null;
  handleRemoteNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoteHostChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoteKeyPathChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export const useInstanceCheck = (): UseInstanceCheckReturn => {
  const [remoteName, setRemoteName] = useState<string>("");
  const [remoteHost, setRemoteHost] = useState<string>("");
  const [remoteKeyPath, setRemoteKeyPath] = useState<string>("");
  const [remoteHostMsg, setRemoteHostMsg] = useState<string>(
    "IPv4 또는 IPv6 형식 중 하나만 입력하세요."
  );
  const [isValidRemoteHost, setIsValidRemoteHost] = useState<boolean | null>(
    null
  );

  const isMobile = useIsMobile(640);

  useEffect(() => {
    console.log("isMobile: ", isMobile);
  }, [isMobile]);

  const handleRemoteNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRemoteName(event.target.value);
  };

  const handleRemoteHostChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    let value = event.target.value;

    const isIPv6 = value.includes(":");

    value = filterInput(value, isIPv6);

    if (isIPv6) {
      if (validateIPv6(value)) {
        setIsValidRemoteHost(true);
        setRemoteHostMsg("유효한 IPv6 주소입니다.");
      } else {
        setIsValidRemoteHost(false);
        setRemoteHostMsg(
          isMobile
            ? "IPv6 예: 2001:db8::1"
            : "IPv6 형식에 맞춰 입력하세요. 예: 2001:0db8:85a3:0000:0000:8a2e:0370:7334"
        );
      }
    } else {
      if (validateIPv4(value)) {
        setIsValidRemoteHost(true);
        setRemoteHostMsg("유효한 IPv4 주소입니다.");
      } else {
        setIsValidRemoteHost(false);
        setRemoteHostMsg("IPv4 형식에 맞춰 입력하세요. 예: 192.168.0.1");
      }
    }

    setRemoteHost(value);
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

  const handleRemoteKeyPathChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRemoteKeyPath(event.target.value);
  };

  return {
    remoteName,
    remoteHost,
    remoteKeyPath,
    remoteHostMsg,
    isValidRemoteHost,
    handleRemoteNameChange,
    handleRemoteHostChange,
    handleRemoteKeyPathChange,
  };
};
