export const mockLogin = async (username: string, password: string) => {
  // Replace with API call when Kevin's BE is ready
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  if (username === "user" && password === "password") {
    const token = "mock-jwt-token"; // Mock JWT
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("token", token);
    }
    return { token };
  }
  throw new Error("Invalid credentials");
};
export const getToken = () => {
  return typeof localStorage !== "undefined"
    ? localStorage.getItem("token")
    : null;
};
