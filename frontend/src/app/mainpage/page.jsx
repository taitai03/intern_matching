"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function MainPage() {
  const [internships, setInternships] = useState([]);
  const [rooms,setRooms]=useState([])
  const router = useRouter();
  const token = localStorage.getItem("token")


    useEffect(() => {
      fetch("http://localhost:8080/internships", {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      })
        .then(res => res.json())
        .then(data => setInternships(data));
    }, []);

    useEffect(() => {
      fetch("http://localhost:8080/chat_rooms", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      })
        .then(res => res.json())
        .then(setRooms)
    }, [])

    const handleLogout = () => {

      localStorage.removeItem("user");
      localStorage.removeItem("token"); 
      sessionStorage.clear();
      router.push("/"); 
    };
  
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
              <p className="text-gray-600 text-sm mb-2">{job.description}</p>
              <p className="text-gray-500 text-sm mb-4">{job.requirements}</p>
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