import { useEffect, useState } from "react";
import { AnsiUp } from "ansi_up";
import { submitSSHCommand } from "@/api/project/project-api";

interface TerminalInput {
  type: string;
  value: string;
}

interface UseSSHCommandReturn {
  inputs: TerminalInput[];
  isConnected: boolean;
  setInputs: React.Dispatch<React.SetStateAction<TerminalInput[]>>;
  handleCommandSubmit: (command: string) => Promise<void>;
}

export const useSSHCommand = (): UseSSHCommandReturn => {
  const [inputs, setInputs] = useState<TerminalInput[]>([
    { type: "text", value: "Welcome to React Terminal UI!" },
  ]);
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const ansiUp = new AnsiUp();

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

      setInputs((prev) => [...prev, { type: "text", value: htmlOutput }]);
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

  const handleCommandSubmit = async (command: string) => {
    if (!command || !isConnected) return;

    try {
      await submitSSHCommand(command);
    } catch (error) {
      console.error("명령어 전송 실패:", error);
    }
  };

  return {
    inputs,
    isConnected,
    setInputs,
    handleCommandSubmit,
  };
};
