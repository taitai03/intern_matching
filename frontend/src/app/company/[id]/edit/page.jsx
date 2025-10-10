"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useHandleAuthError } from "@/hooks/useHAndleAuthError";
import Link from "next/link";

export default function EditInternship() {
  useAuthRedirect(); 
  const { handleAuthError } = useHandleAuthError();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");
  const [rooms, setRooms] = useState([]);
  const [requirements,setRequirements]=useState("")
  const router = useRouter();
  const params = useParams(); // URLの [id] を取得

  // ページ読み込み時に現在の募集情報を取得
  useEffect(() => {
    if (!params.id) return;

    const fetchInternship = async () => {
      const res = await fetch(`http://localhost:8080/internships/${params.id}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
      });

      // 認証エラーならここで中断
      if (handleAuthError(res)) return;

      if (!res.ok) {
        alert("募集情報の取得に失敗しました");
        return;
      }

      const data = await res.json();
      setTitle(data.title);
      setDescription(data.description);
      setRequirements(data.requirements);
      setStatus(
        data.status === 0 ? "open" :
        data.status === 1 ? "closed" :
        data.status
      );
    };

    fetchInternship();
  }, [params.id]);

  useEffect(() => {
    fetch("http://localhost:8080/chat_rooms", {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(setRooms)
  }, [])

  // 更新処理
  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8080/internships/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ internship: { title, description, status,requirements } }),
    });

    if (res.ok) {
      router.push("/company"); // 更新後に一覧へ戻る
    } else {
      alert("更新に失敗しました");
    }
  };

  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token"); // JWTなど使っている場合も削除
    sessionStorage.clear();
    router.push("/"); // 例: ログインページに戻す
  };

  return (
    <div>
      <header className="bg-blue-600 text-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Intern Matching</h1>
        <div className="flex gap-4">
        <Link
            href="/company"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            募集済み一覧
          </Link>
        <Link
            href="/company/recruitment"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            募集ページの作成
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
      <div className="p-6">
      <h1 className="text-xl font-bold mb-4">募集内容を編集</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="open">募集中</option>
          <option value="closed">募集終了</option>
        </select>
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
          更新する
        </button>
      </form>
      </div>
    </div>

  );
}
