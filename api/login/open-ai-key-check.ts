const verifyOpenAIKey = async (apiKey: string) => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${baseURL}/accounts/validate/key`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey }),
    });

    const data = await response.json();
    return data.result.isValid;
  } catch (error) {
    console.error("Error verifying API key:", error);
  }
};
