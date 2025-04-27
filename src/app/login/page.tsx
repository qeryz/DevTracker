import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "./components/LoginForm";
import { verifyAccessToken } from "@/lib/api/auth";

const LoginPage = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access")?.value;

  let isValid = false;

  if (accessToken) {
    try {
      isValid = await verifyAccessToken(accessToken);
    } catch (error) {
      console.error("Access token is invalid or expired:", error);
    }
  }
  if (isValid) redirect("/dashboard"); // Redirect to the dashboard if the token is valid

  return <LoginForm />;
};

export default LoginPage;
