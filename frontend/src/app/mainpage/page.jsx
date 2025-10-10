"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export default function MainPage() {
  const checking = useAuthRedirect();

  const [internships, setInternships] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("");
  const [rooms,setRooms]=useState([])
  const router = useRouter();
  const token = localStorage.getItem("token")
  

  useEffect(() => {
    fetch("http://localhost:8080/genres")
      .then((res) => res.json())
      .then((data) => setGenres(data));
  }, []);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }
  
    let url = "http://localhost:8080/internships";
    if (selectedGenre) {
      url += `?genre_id=${selectedGenre}`;
    }
  
    fetch(url, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) router.push("/");
          throw new Error("Server Error");
        }
        return res.json();
      })
      .then(setInternships)
      .catch((err) => console.error(err));
  }, [selectedGenre]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }
  
    fetch("http://localhost:8080/chat_rooms", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) router.push("/");
          throw new Error("Server Error");
        }
        return res.json();
      })
      .then(setRooms)
      .catch((err) => console.error(err));
  }, []);

    const handleLogout = () => {

      localStorage.removeItem("user");
      localStorage.removeItem("token"); 
      sessionStorage.clear();
      router.push("/"); 
    };


  if (checking){
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-700">
      <div className="flex items-center space-x-3 mb-4 animate-pulse">
        <div className="w-5 h-5 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-lg font-medium">認証を確認しています...</span>
      </div>
      <p className="text-sm text-gray-500">しばらくお待ちください</p>
    </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-blue-600 text-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Intern Matching</h1>
        <div className="flex gap-4">
          <Link
            href="/chat"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            チャット
          </Link>
          <button onClick={handleLogout} className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
            ログアウト
          </button>
        </div>
      </header>

      {/* メイン */}
      <main className="flex-1 p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">募集一覧</h2>

            {/* ジャンル選択 */}
            <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        className="border p-2 rounded mb-4"
      >
        <option value="">すべてのジャンル</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {internships.map((job) => (
          <li
            key={job.id}
            className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between border border-gray-100"
          >

            <div
              onClick={() => router.push(`/internships/${job.id}`)}
              className="cursor-pointer flex-1"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {job.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">業務内容：{job.description}</p>
              <p className="text-gray-500 text-sm mb-4">応募要件：{job.requirements}</p>
              <span
                className={`text-sm font-medium ${
                  job.status === "open" ? "text-green-600" : "text-gray-400"
                }`}
              >
                ステータス：{job.status === "open" ? "募集中" : "募集終了"}
              </span>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => router.push(`/internships/${job.id}`)}
                disabled={job.status !== "open"}
                className={`px-4 py-2 rounded-lg font-medium text-white transition
                  ${
                    job.status === "open"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
              >
                応募する
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
    </div>
  );
}