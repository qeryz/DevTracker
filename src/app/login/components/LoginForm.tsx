"use client";

import { useState } from "react";
import { useMutation } from "react-query";
import { login } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const mutation = useMutation(
    ({ username, password }: { username: string; password: string }) =>
      login(username, password),
    {
      onSuccess: (data) => {
        document.cookie = `access=${data.access}; path=/; max-age=3600; SameSite=Strict;`;
        document.cookie = `refresh=${data.refresh}; path=/; max-age=604800; SameSite=Strict;`; // 7 days

        router.push("/dashboard");
      },
      onError: (error) => {
        console.error("Login failed", error);
        setErrorMessage("Invalid username or password");
      },
    },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    mutation.mutate({ username, password });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="space-y-4 p-8 border rounded-md">
        <h1 className="text-2xl">Login</h1>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
