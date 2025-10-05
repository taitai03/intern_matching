"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditInternship() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");
  const [requirement,setRequirement]=useState('')
  const router = useRouter();
  const params = useParams(); // URLの [id] を取得

  // ページ読み込み時に現在の募集情報を取得
  useEffect(() => {
    const fetchInternship = async () => {
      if (!params.id) return;
      try {
        const res = await fetch(`http://localhost:8080/internships/${params.id}`, {
          headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });
        if (!res.ok) throw new Error("募集情報の取得に失敗");
        const data = await res.json();
        setTitle(data.title);
        setDescription(data.description);
        setRequirement(data.requirements)
        setStatus(data.status);
      } catch (err) {
        console.error(err);
        alert("募集情報の取得に失敗しました");
      }
    };
    fetchInternship();
  }, [params.id]);

  // 更新処理
  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8080/internships/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ internship: { title, description, status,requirement } }),
    });

    if (res.ok) {
      router.push("/company"); // 更新後に一覧へ戻る
    } else {
      alert("更新に失敗しました");
    }
  };

  return (
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
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
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
  );
}
