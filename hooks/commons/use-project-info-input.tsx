import { useState } from "react";
import {
  CloudInstanceList,
  CloudInstance,
} from "@/types/new-item/new-item-type";
import { validateProjectName } from "@/utils/validation-utils";

interface UseProjectInfoInputReturn {
  projectName: string;
  description: string;
  cloudName: string;
  containerName: string;
  sshInfoId: number | null;
  cloudOptions: string[];
  containerOptions: string[];
  isValidProjectName: boolean;
  projectNameMsg: string;
  handleProjectNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloudSelect: (name: string) => void;
  handleContainerSelect: (name: string) => void;
  setCloudData: (data: CloudInstanceList | null) => void;
}

export default function useProjectInfoInput(): UseProjectInfoInputReturn {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [cloudName, setCloudName] = useState("");
  const [containerName, setContainerName] = useState("");
  const [isValidProjectName, setIsValidProjectName] = useState(false);
  const [projectNameMsg, setProjectNameMsg] = useState<string>("");
  const [sshInfoId, setSshInfoId] = useState<number | null>(null);
  const [cloudOptions, setCloudOptions] = useState<string[]>(["연결하지 않음"]);
  const [containerOptions, setContainerOptions] = useState<string[]>([
    "연결하지 않음",
  ]);
  const [cloudInstances, setCloudInstances] = useState<CloudInstance[]>([]);
  const maxDescriptionLength = 300;

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
    const inputProjectName = event.target.value;
    setProjectName(inputProjectName);

    if (inputProjectName.trim() === "") {
      setIsValidProjectName(false);
      setProjectNameMsg("");
      return;
    }

    if (validateProjectName(inputProjectName)) {
      setIsValidProjectName(true);
      setProjectNameMsg("사용 가능한 사용자명입니다.");
    } else {
      setIsValidProjectName(false);
      setProjectNameMsg(
        "3-32자의 한글, 영어, 숫자, 하이픈(-), 밑줄(_)을 입력해주세요."
      );
    }
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputDescription = event.target.value;
    if (inputDescription.length <= maxDescriptionLength) {
      setDescription(inputDescription);
    }
  };

  return {
    projectName,
    description,
    cloudName,
    containerName,
    sshInfoId,
    cloudOptions,
    containerOptions,
    isValidProjectName,
    projectNameMsg,
    handleProjectNameChange,
    handleDescriptionChange,
    handleCloudSelect,
    handleContainerSelect,
    setCloudData,
  };
}
