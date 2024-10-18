export const CheckEmailDuplication = async (
  email: string
): Promise<boolean> => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${baseURL}/accounts/check/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("email data : ", data);
    return data.result.isValid;
  } catch (error) {
    console.error("사용불가능한 이메일입니다.", error);
    throw error;
  }
};

export const VerifyEmailCode = async (
  email: string,
  code: string,
  type: string
): Promise<boolean | void> => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(
      `${baseURL}/accounts/verify/code?codeType=${type}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("code data : ", data);
    return data.result.isMatching;
  } catch (error) {
    console.error("쿼리문: 코드가 일치하지 않습니다.", error);
  }
};

export const ResendCode = async (
  email: string,
  type: string
): Promise<boolean | void> => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(
      `${baseURL}/accounts/resend/code?codeType=${type}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("email data : ", data);
    return data.success;
  } catch (error) {
    console.error("사용불가능한 이메일입니다.", error);
  }
};

export const CheckRegisteredEmail = async (email: string): Promise<boolean> => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${baseURL}/accounts/recovery/code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("email data : ", data);
    return data.result.isValid;
  } catch (error) {
    console.error("사용불가능한 이메일입니다.", error);
    throw error;
  }
};
