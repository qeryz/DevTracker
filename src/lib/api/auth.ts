import axiosInstance from "./axiosInstance";

export const login = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post("/token/", {
      username,
      password,
    });

    const { access, refresh } = response.data;

    // Store tokens in cookies (client-side only)
    // Note: For prod we would use httpOnly cookies
    if (typeof document !== "undefined") {
      document.cookie = `access=${access}; path=/; max-age=3600; SameSite=Strict;`;
      document.cookie = `refresh=${refresh}; path=/; max-age=604800; SameSite=Strict;`; // 7 days
    }

    return { access, refresh };
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Invalid credentials");
  }
};

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await axiosInstance.post("/token/refresh/", {
      refresh: refreshToken,
    });

    const { access } = response.data;

    if (typeof document !== "undefined") {
      document.cookie = `access=${access}; path=/; max-age=3600; SameSite=Strict;`;
    }

    return access;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    throw error;
  }
};

export const verifyAccessToken = async (token: string) => {
  try {
    await axiosInstance.post("/token/verify/", {
      token,
    });
    return true;
  } catch (error) {
    console.error("Access token verification failed:", error);
    throw new Error("Access token is invalid or expired");
  }
};

export const getCookie = (name: string) => {
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((c) => c.startsWith(`${name}=`));
    return cookie ? cookie.split("=")[1] : null;
  }
  return null;
};

export const getAccessToken = () => getCookie("access");
export const getRefreshToken = () => getCookie("refresh");
