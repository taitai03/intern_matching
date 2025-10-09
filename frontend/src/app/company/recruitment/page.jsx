"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewInternship() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [genreId, setGenreId] = useState("");
  const [genres, setGenres] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // ジャンル一覧をRailsから取得
    fetch("http://localhost:8080/genres")
      .then(res => res.json())
      .then(data => setGenres(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/internships", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ internship: { title, description, status: "open" ,requirements,genre_id:genreId} }),
    });

    if (res.ok) {
      router.push("/company");
    } else {
      alert("エラーが発生しました");
    }
  };

  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token"); 
    sessionStorage.clear();
    router.push("/auth/login"); 
  };

  return (
    <div>
      <header className="bg-blue-600 text-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Intern Matching</h1>
        <div className="flex gap-4">
        <Link
            href="/company/"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            投稿済み募集一覧
          </Link>
          <Link
            href="/chat"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            チャット
          </Link>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
            ログアウト
          </button>
        </div>
      </header>
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
            新規インターン募集の作成
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* タイトル */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">タイトル</label>
              <input
                type="text"
                placeholder="例：長期インターン募集（エンジニア）"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl shadow-sm p-3 text-gray-900"
              />
            </div>

            {/* 募集内容 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">募集内容</label>
              <textarea
                placeholder="インターンの業務内容を入力してください"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl shadow-sm p-3 text-gray-900 h-32 resize-none"
              />
            </div>

            {/* 応募要件 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">応募要件</label>
              <textarea
                placeholder="応募条件・スキルなどを記入してください"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl shadow-sm p-3 text-gray-900 h-28 resize-none"
              />
            </div>

            <select
              value={genreId}
              onChange={(e) => setGenreId(e.target.value)}
              className="w-full border p-2 mb-3 rounded"
            >
              <option value="">ジャンルを選択</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>

            {/* ボタン */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-transform transform hover:-translate-y-0.5"
              >
                投稿する
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}
