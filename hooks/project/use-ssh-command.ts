import { useEffect, useState } from "react";
import { AnsiUp } from "ansi_up";
import { initSSHCommand, submitSSHCommand } from "@/api/project/project-api";

interface TerminalInput {
  type: string;
  value: string;
}

interface UseSSHCommandReturn {
  inputs: TerminalInput[];
  isConnected: boolean;
  setInputs: React.Dispatch<React.SetStateAction<TerminalInput[]>>;
  handleCommandSubmit: (command: string) => Promise<void>;
  resetInputs: () => void;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useSSHCommand = (): UseSSHCommandReturn => {
  const [inputs, setInputs] = useState<TerminalInput[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const ansiUp = new AnsiUp();

  const connectSocket = () => {
    const ws = new WebSocket("ws://54.180.252.169:8080/ws");
    setSocket(ws);

    ws.onopen = async () => {
      console.log("WebSocket 연결됨");
      setIsConnected(true);
      await initSSHCommand();
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
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.close();
      console.log("WebSocket 수동으로 종료");
      setSocket(null);
      setIsConnected(false);
    }
  };

  const handleCommandSubmit = async (command: string) => {
    if (!command || !isConnected) return;

    try {
      await submitSSHCommand(command);
    } catch (error) {
      console.error("명령어 전송 실패:", error);
    }
  };

  const resetInputs = () => {
    setInputs([]);
  };

  return {
    inputs,
    isConnected,
    setInputs,
    handleCommandSubmit,
    resetInputs,
    connectSocket,
    disconnectSocket,
  };
};
