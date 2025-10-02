"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  // ログアウト処理
  const handleLogout = () => {
    localStorage.removeItem("token"); // JWT削除
    router.push("/login"); // ログイン画面に戻る
  };

  // インターン募集を取得
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/posts", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="flex justify-between items-center p-4 bg-blue-600 text-white">
        <h1 className="text-xl font-bold">ScoutService</h1>
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/chat")}
            className="bg-white text-blue-600 px-4 py-2 rounded-md"
          >
            チャット
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-md"
          >
            ログアウト
          </button>
        </div>
      </header>

      {/* メイン */}
      <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg"
          >
            <h2 className="text-lg font-bold">{post.title}</h2>
            <p className="text-gray-600">{post.company_name}</p>
            <p className="mt-2 text-sm text-gray-700">
              {post.description.slice(0, 80)}...
            </p>
            <button
              onClick={() => router.push(`/posts/${post.id}`)}
              className="mt-3 inline-block text-blue-600 hover:underline"
            >
              詳細を見る →
            </button>
          </div>
        ))} */}
        <h>ここにインターンの掲載</h>
      </main>
    </div>
  );
}
