import { Navigate, useLocation } from "react-router-dom";
import type { PropsWithChildren } from "react";

type UserLite = {
  id: number;
  nome: string;
  email: string;
  tipo?: "admin" | "usuario";
};

export default function RequireAdmin({ children }: PropsWithChildren) {
  const loc = useLocation();

  let user: UserLite | null = null;
  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    user = null;
  }

  if (!user || user.tipo !== "admin") {
    return <Navigate to="/login" replace state={{ from: loc }} />;
  }

  return <>{children}</>;
}

