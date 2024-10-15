import { useState, useEffect } from "react";

interface UseInstanceCheckReturn {
  remoteName: string;
  remoteHost: string;
  remoteKeyPath: string;
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
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);
  const [isPasswordMatching, setIsPasswordMatching] = useState<boolean | null>(
    null
  );
  const [validationMessage, setValidationMessage] =
    useState<string>("비밀번호를 입력해주세요.");
  const [confirmMessage, setConfirmMessage] = useState<string>("");

  const handleRemoteNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRemoteName(event.target.value);
  };

  const handleRemoteHostChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRemoteHost(event.target.value);
  };

  const handleRemoteKeyPathChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRemoteKeyPath(event.target.value);
  };

  return {
    remoteName,
    remoteHost,
    remoteKeyPath,
    handleRemoteNameChange,
    handleRemoteHostChange,
    handleRemoteKeyPathChange,
  };
};
