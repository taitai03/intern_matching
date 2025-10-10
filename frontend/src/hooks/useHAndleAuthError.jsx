"use client";

import { useRouter } from "next/navigation";

export const useHandleAuthError = () => {
  const router = useRouter();

  const handleAuthError = (res) => {
    if (res.status === 401 || res.status === 403) {
      // トークン削除（ログアウト）
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      sessionStorage.clear();

      // トップページに戻す
      router.push("/");

      // 任意：アラートで理由を伝える
      alert("アクセス権がありません。ログインし直してください。");
      return true; // エラー処理を検知
    }
    return false; // 問題なし
  };

  return { handleAuthError };
};
