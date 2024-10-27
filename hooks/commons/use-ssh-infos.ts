import { SSHInfo } from "@/types/login/login-type";
import { useState, useEffect } from "react";

// const defaultSSHInfos: SSHInfo[] = [
//   {
//     remoteName: "ubuntu",
//     remoteHost: "54.180.202.202",
//     remoteKeyPath: "file:///Users/LLMN/ssh/Llmn.pem",
//   },
//   {
//     remoteName: "local",
//     remoteHost: "192.168.1.101",
//     remoteKeyPath: "/path/to/key2.pem",
//   },
//   {
//     remoteName: "Amazon Linux",
//     remoteHost: "72.180.244.93",
//     remoteKeyPath: "/path/to/key2.pem",
//   },
//   {
//     remoteName: "ubuntu",
//     remoteHost: "54.180.244.93",
//     remoteKeyPath: "/path/to/key2.pem",
//   },
// ];

export default function useSSHInfos() {
  const SSH_INFOS_KEY = "sshInfos";

  const [sshInfos, setSSHInfos] = useState<SSHInfo[]>([]);
  // const [monitoringSshHost, setMonitoringSshHost] = useState<string>("");

  const saveSSHInfosToSession = (infos: SSHInfo[]) => {
    sessionStorage.setItem(SSH_INFOS_KEY, JSON.stringify(infos));
  };

  const getSSHInfosFromSession = (): SSHInfo[] => {
    const storedData = sessionStorage.getItem(SSH_INFOS_KEY);
    return storedData ? JSON.parse(storedData) : [];
  };

  // useEffect(() => {
  //   const storedInfos = getSSHInfosFromSession();
  //   setSSHInfos(storedInfos);
  // }, []);

  const addSSHInfo = (info: SSHInfo) => {
    const updatedInfos = [...sshInfos, info];
    setSSHInfos(updatedInfos);
    saveSSHInfosToSession(updatedInfos);
    sessionStorage.setItem("monitoringSshHost", info.remoteHost);
  };

  // const removeSSHInfo = (index: number) => {
  //   const updatedInfos = sshInfos.filter((_, i) => i !== index);
  //   setSSHInfos(updatedInfos);
  //   saveSSHInfosToSession(updatedInfos);
  // };

  const resetSSHInfos = () => {
    setSSHInfos([]);
    sessionStorage.removeItem(SSH_INFOS_KEY);
  };

  return {
    sshInfos,
    // monitoringSshHost,
    // setMonitoringSshHost,
    saveSSHInfosToSession,
    getSSHInfosFromSession,
    addSSHInfo,
    // removeSSHInfo,
    resetSSHInfos,
  };
}
