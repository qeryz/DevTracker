"use client";

import { useState } from "react";
import { useMutation } from "react-query";
import { mockLogin } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const mutation = useMutation(
    ({ username, password }: { username: string; password: string }) =>
      mockLogin(username, password),
    {
      onSuccess: (data) => {
        // Store the token and redirect on success
        console.log("Login successful!", data.token);
        router.push("/dashboard"); // Redirect to the dashboard
      },
      onError: (error) => {
        console.error("Login failed", error);
      },
    },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ username, password });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="space-y-4 p-8 border rounded-md">
        <h1 className="text-2xl">Login</h1>
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
        <button type="submit" className="w-full py-2 bg-blue-500 text-white">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
