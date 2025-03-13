// 외부 라이브러리
import { useState } from "react";
import { AnsiUp } from "ansi_up";

// 서버 사이드 데이터, 타입 및 API
import type { TerminalInput } from "@/src/types/project/project-type";
import {
  initSSHCommand,
  submitSSHCommand,
} from "@/src/api/project/project-api";

interface UseSSHCommandReturn {
  inputs: TerminalInput[];
  isConnected: boolean;
  setInputs: React.Dispatch<React.SetStateAction<TerminalInput[]>>;
  handleCommandSubmit: (command: string) => Promise<void>;
  resetInputs: () => void;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export default function useSSHCommand(): UseSSHCommandReturn {
  const [inputs, setInputs] = useState<TerminalInput[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const ansiUp = new AnsiUp();

  const connectSocket = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      const sshURL = process.env.NEXT_PUBLIC_SSH_URL;

      if (!sshURL) {
        console.error("SSH URL is not defined in environment variables.");
        return;
      }

      const ws = new WebSocket(sshURL);
      setSocket(ws);

      ws.onopen = async () => {
        console.log("WebSocket 연결됨");
        setIsConnected(true);
        try {
          await initSSHCommand();
          resolve();
        } catch (error) {
          console.error("initSSHCommand 실패: ", error);
          reject(error);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket 에러: ", error);
        reject(error);
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
    });
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.close();
      console.log("WebSocket 수동으로 종료");
      setSocket(null);
      setIsConnected(false);
      setInputs([]);
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
}
