import { SSHInfo } from "@/src/types/login/login-type";
import { useState } from "react";

interface UseSSHInfosReturn {
  sshInfos: SSHInfo[];
  saveSSHInfosToSession: (infos: SSHInfo[]) => void;
  getSSHInfosFromSession: () => SSHInfo[];
  addSSHInfo: (info: SSHInfo) => void;
  resetSSHInfos: () => void;
}

export default function useSSHInfos(): UseSSHInfosReturn {
  const SSH_INFOS_KEY = "sshInfos";

  const [sshInfos, setSSHInfos] = useState<SSHInfo[]>([]);

  const saveSSHInfosToSession = (infos: SSHInfo[]) => {
    sessionStorage.setItem(SSH_INFOS_KEY, JSON.stringify(infos));
  };

  const getSSHInfosFromSession = (): SSHInfo[] => {
    const storedData = sessionStorage.getItem(SSH_INFOS_KEY);
    return storedData ? JSON.parse(storedData) : [];
  };

  const addSSHInfo = (info: SSHInfo) => {
    const updatedInfos = [...sshInfos, info];
    setSSHInfos(updatedInfos);
    saveSSHInfosToSession(updatedInfos);
    sessionStorage.setItem("monitoringSshHost", info.remoteHost);
  };

  const resetSSHInfos = () => {
    setSSHInfos([]);
    sessionStorage.removeItem(SSH_INFOS_KEY);
  };

  return {
    sshInfos,
    saveSSHInfosToSession,
    getSSHInfosFromSession,
    addSSHInfo,
    resetSSHInfos,
  };
}
