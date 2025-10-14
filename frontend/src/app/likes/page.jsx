"use client";
import  Link  from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LikedInternships() {
  const [jobs, setJobs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("");
  const [rooms,setRooms]=useState([])
  const router = useRouter();



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
  
    let url = "http://localhost:8080/likes";
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
      .then(setJobs)
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

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   fetch("http://localhost:8080/likes", {
  //     headers: { Authorization: `Bearer ${token}` }
  //   })
  //     .then(res => res.json())
  //     .then(setJobs);
  // }, []);

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
            href="/mainpage"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            ホームへ
          </Link>
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
      <h2 className="text-2xl font-bold mb-6 text-gray-800">お気に入り一覧</h2>

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
        {jobs.map((job) => (
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
