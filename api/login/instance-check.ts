interface ValidateSSHRequest {
  remoteName: string;
  remoteHost: string;
  remoteKeyPath: string;
}

export const SSHPemKeyUpload = async (file: File): Promise<string | null> => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${baseURL}/accounts/ssh`, {
      method: "POST",
      body: formData,
    });

    // if (!response.ok) {
    //   throw new Error("Network response was not ok");
    // }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error uploading SSH key:", error);
    throw error;
  }
};

export const validateInstance = async (
  remoteValues: ValidateSSHRequest
): Promise<boolean> => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${baseURL}/accounts/validate/ssh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(remoteValues),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    // return data.result.isValid;
    // return true;
    return false;
  } catch (error) {
    console.error("Error validating SSH:", error);
    throw error;
  }
};
