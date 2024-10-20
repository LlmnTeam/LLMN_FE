import { useState } from "react";
import { CloudInstanceList, CloudInstance } from "@/types/new-item/new-item";

interface UseNewItemInputReturn {
  projectName: string;
  description: string;
  cloudName: string;
  containerName: string;
  sshInfoId: number | null;
  cloudOptions: string[];
  containerOptions: string[];
  handleProjectNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloudSelect: (name: string) => void;
  handleContainerSelect: (name: string) => void;
  setCloudData: (data: CloudInstanceList | null) => void;
}

export default function useNewItemInput(): UseNewItemInputReturn {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [cloudName, setCloudName] = useState("");
  const [containerName, setContainerName] = useState("");
  const [sshInfoId, setSshInfoId] = useState<number | null>(null);
  const [cloudOptions, setCloudOptions] = useState<string[]>(["연결하지 않음"]);
  const [containerOptions, setContainerOptions] = useState<string[]>([
    "연결하지 않음",
  ]);
  const [cloudInstances, setCloudInstances] = useState<CloudInstance[]>([]);

  const setCloudData = (data: CloudInstanceList | null) => {
    if (data) {
      setCloudInstances(data.cloudInstances);
      const cloudNames = data.cloudInstances.map((cloud) => cloud.cloudName);
      setCloudOptions([...cloudNames, "연결하지 않음"]);
    }
  };

  const handleCloudSelect = (name: string) => {
    setCloudName(name);

    const selectedCloud = cloudInstances.find(
      (cloud) => cloud.cloudName === name
    );

    if (selectedCloud) {
      setSshInfoId(selectedCloud.sshInfoId);
      const containerNames = selectedCloud.containers.map(
        (container) => container.containerName
      );
      setContainerOptions([...containerNames, "연결하지 않음"]);
    } else {
      setSshInfoId(null);
      setContainerOptions(["연결하지 않음"]);
    }
    setContainerName("");
  };

  const handleContainerSelect = (name: string) => {
    setContainerName(name);
  };

  const handleProjectNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProjectName(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  return {
    projectName,
    description,
    cloudName,
    containerName,
    sshInfoId,
    cloudOptions,
    containerOptions,
    handleProjectNameChange,
    handleDescriptionChange,
    handleCloudSelect,
    handleContainerSelect,
    setCloudData,
  };
}
