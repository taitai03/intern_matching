"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuthRedirect() {
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      // トップに戻してメッセージ表示用フラグをセット
      sessionStorage.setItem("authMessage", "ログインまたはサインアップしてください。");
      router.push("/");
    }else{
      setChecking(false)
    }
  }, [router]);
  return checking
}
