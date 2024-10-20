import { useState, useEffect } from "react";

interface UseNewItemInputReturn {
  projectName: string;
  description: string;
  cloudName: string;
  containerName: string;
  cloudOptions: string[];
  containerOptions: string[];
  handleProjectNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloudSelect: (name: string) => void;
  handleContainerSelect: (name: string) => void;
}

export default function useNewItemInput(): UseNewItemInputReturn {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [cloudName, setCloudName] = useState("");
  const [containerName, setContainerName] = useState("");
  const cloudOptions = [
    "Ubuntu (54.180.244.93)",
    "Amazon Linux (72.180.244.93)",
    "연결하지 않음",
  ];
  const containerOptions = ["Spring", "FastAPI", "React", "연결하지 않음"];

  const handleProjectNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputProjectName = event.target.value;
    setProjectName(inputProjectName);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputDescription = event.target.value;
    setDescription(inputDescription);
  };

  const handleCloudSelect = (name: string) => {
    setCloudName(name);
  };
  const handleContainerSelect = (name: string) => {
    setContainerName(name);
  };

  return {
    projectName,
    description,
    cloudName,
    containerName,
    cloudOptions,
    containerOptions,
    handleProjectNameChange,
    handleDescriptionChange,
    handleCloudSelect,
    handleContainerSelect,
  };
}
