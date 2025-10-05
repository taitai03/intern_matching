"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function MainPage() {
  const [internships, setInternships] = useState([]);
  const [rooms,setRooms]=useState([])
  const router = useRouter();

    useEffect(() => {
      fetch("http://localhost:8080/internships", {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      })
        .then(res => res.json())
        .then(data => setInternships(data));
    }, []);

    useEffect(() => {
      fetch("http://localhost:8080/chat_rooms")
        .then(res => res.json())
        .then(setRooms)
    }, [])
  
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
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
            ログアウト
          </button>
        </div>
      </header>

      {/* メイン */}
      <main className="flex-1 p-6">
        <h2 className="text-lg font-semibold mb-4">募集一覧</h2>

        <ul className="space-y-4">
        {internships.map((job) => (
          <li key={job.id} className="p-4 border rounded flex justify-between">
            <div
            onClick={() => router.push(`/internships/${job.id}`)}
            >
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.description}</p>
              <p className="text-gray-600">{job.requirements}</p>
              <span className="text-sm text-gray-500">
                ステータス: {job.status === "open" ? "募集中" : "募集終了"}
              </span>
            </div>
          </li>
        ))}
      </ul>
      </main>
    </div>
  );
}