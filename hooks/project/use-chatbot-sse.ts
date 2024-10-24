import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";

interface LogFile {
  name: string;
}

interface UseChatbotSSEProps {
  logFiles: LogFile[];
  isFirstQuestion: boolean;
}

interface UseChatbotSSEReturn {
  question: string;
  logSummary: string;
  isConnected: boolean;
  handleQuestionChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  startSSE: () => Promise<void>;
  stopSSE: () => void;
}

export const useChatbotSSE = ({
  logFiles,
  isFirstQuestion,
}: UseChatbotSSEProps): UseChatbotSSEReturn => {
  console.log("logFiles: ", logFiles);
  console.log("isFirstQuestion: ", isFirstQuestion);

  const [question, setQuestion] = useState("");
  const [logSummary, setLogSummary] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const eventSourceRef = useRef<ReadableStreamDefaultReader | null>(null);

  const handleQuestionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => setQuestion(event.target.value);

  const startSSE = async () => {
    if (question === "" || logFiles.length === 0) return;

    try {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        throw new Error("Access token is missing");
      }

      const baseURL = process.env.NEXT_CHATBOT_API_BASE_URL;
      const response = await fetch(`${baseURL}/logs/question`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify({ logFiles, question, isFirstQuestion }),
      });

      if (!response.body) {
        throw new Error("Streaming not supported");
      }

      const reader = response.body.getReader();
      eventSourceRef.current = reader;
      setIsConnected(true);

      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;
        const chunk = decoder.decode(value);
        setLogSummary((prev) => prev + chunk);
      }

      setIsConnected(false);
    } catch (error) {
      console.error("Failed to fetch:", error);
      setIsConnected(false);
    }
  };

  const stopSSE = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.cancel();
    }
    setIsConnected(false);
  };

  useEffect(() => {
    return () => stopSSE();
  }, []);

  return {
    question,
    logSummary,
    isConnected,
    handleQuestionChange,
    startSSE,
    stopSSE,
  };
};
