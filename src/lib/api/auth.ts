export const mockLogin = async (username: string, password: string) => {
  // Replace with API call when Kevin's BE is ready
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  if (username === "user" && password === "password") {
    const token = "mock-jwt-token"; // Mock JWT
    console.log("Login successful, token generated:", token);
    // Set token as a cookie
    if (typeof document !== "undefined") {
      document.cookie = `token=${token}; path=/; max-age=3600; SameSite=Strict;`;
    }
    return { token };
  }
  throw new Error("Invalid credentials");
};

export const getToken = () => {
  // Retrieve the token from cookies
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
    return tokenCookie ? tokenCookie.split("=")[1] : null;
  }
  return null;
};
