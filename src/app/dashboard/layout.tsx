import { ReactNode } from "react";

export const metadata = {
  title: "Dashboard",
  description: "Track your dev tasks easily and efficiently.",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
