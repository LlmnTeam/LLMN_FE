import { useEffect, useState } from "react";
import { AnsiUp } from "ansi_up";
import { submitSSHCommand } from "@/api/project/project-api";

interface SSHMessage {
  role: "user" | "system";
  content: string;
}

interface UseSSHCommandReturn {
  command: string;
  commandOutput: string;
  sshMessageList: SSHMessage[];
  isConnected: boolean;
  setCommand: (command: string) => void;
  handleCommandChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCommandSubmit: () => Promise<void>;
}

export const useSSHCommand = (): UseSSHCommandReturn => {
  const [command, setCommand] = useState("");
  const [commandOutput, setCommandOutput] = useState("");
  const [sshMessageList, setSSHMessageList] = useState<SSHMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const ansiUp = new AnsiUp();

  const handleCommandChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputCommand = event.target.value;
    setCommand(inputCommand);
  };

  useEffect(() => {
    const ws = new WebSocket("ws://54.180.252.169:8080/ws");
    setSocket(ws);

    ws.onopen = () => {
      console.log("WebSocket 연결됨");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const cleanedData = event.data.replace(/\]0;[^]*/g, "");
      const htmlOutput = ansiUp.ansi_to_html(cleanedData);
      setCommandOutput((prev) => prev + "<br/>" + htmlOutput);

      setSSHMessageList((prev) => [
        ...prev,
        { role: "system", content: cleanedData },
      ]);
    };

    ws.onclose = () => {
      console.log("WebSocket 연결 종료");
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error("WebSocket 에러: ", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleCommandSubmit = async () => {
    if (!command || !isConnected) return;

    try {
      await submitSSHCommand(command);

      setSSHMessageList((prev) => [
        ...prev,
        { role: "user", content: command },
      ]);

      setCommand("");
    } catch (error) {
      console.error("명령어 전송 실패:", error);
    }
  };

  return {
    command,
    commandOutput,
    sshMessageList,
    isConnected,
    setCommand,
    handleCommandChange,
    handleCommandSubmit,
  };
};
