import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "./components/LoginForm"; // Ensure the path is correct

const LoginPage = async () => {
  const cookieStore = await cookies(); // Synchronous call
  const token = cookieStore.get("token");

  if (token) {
    console.log("Token found, redirecting to dashboard:", token.value);
    redirect("/dashboard"); // Redirect to the dashboard if the token exists
  }

  return <LoginForm />;
};

export default LoginPage;
