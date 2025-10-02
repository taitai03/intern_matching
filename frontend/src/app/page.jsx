"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/users/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email,
            password,
          },
        }),
      });

      if (!res.ok) {
        throw new Error("ログインに失敗しました");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token); // トークンを保存
      alert("ログイン成功！");
      router.push('/mainpage')
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>            
      <header className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="text-xl font-bold">ScoutService</h1>
      <div className="flex gap-4">
      </div>
      </header>
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      {/* ログインフォーム */}
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">ログイン</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg px-3 py-2"
            required
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg px-3 py-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            ログイン
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          アカウントをお持ちでないですか？{" "}
          <Link href="auth/signup" className="text-blue-600 hover:underline">
            サインアップはこちら
          </Link>
        </p>
      </div>

      {/* サービス説明 */}
      <div className="mt-12 max-w-2xl text-center">
        <h2 className="text-xl font-bold mb-4">サービスについて</h2>
        <p className="text-gray-700 leading-relaxed">
          企業と学生をつなぐインターンマッチングサービスです。
          <br />
          学生は興味のある企業を見つけて応募でき、
          企業は募集を掲載して学生と直接やり取りできます。
        </p>
      </div>
    </div>
    </div>

  );
}