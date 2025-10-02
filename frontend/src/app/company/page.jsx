"use client";
import { useState } from "react";

export default function CompanyDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:8080/internships", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        internship: { title, description, requirements },
      }),
    });

    if (res.ok) {
      alert("募集を作成しました！");
      setTitle("");
      setDescription("");
      setRequirements("");
    } else {
      const data = await res.json();
      alert("エラー: " + (data.errors || "作成に失敗しました"));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">企業ダッシュボード</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="募集タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="募集内容"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="応募要件"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          募集を作成
        </button>
      </form>
    </div>
  );
}
