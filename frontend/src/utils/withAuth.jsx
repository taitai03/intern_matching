// src/utils/withAuth.jsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const withAuth = (WrappedComponent) => {
  return function Protected(props) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) router.push("/");
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};
