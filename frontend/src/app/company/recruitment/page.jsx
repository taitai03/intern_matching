"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewInternship() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/internships", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ internship: { title, description, status: "open" ,requirements} }),
    });

    if (res.ok) {
      router.push("/company");
    } else {
      alert("エラーが発生しました");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">新規募集作成</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="募集内容"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
            placeholder="応募要件"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            className="w-full border p-2 rounded"
          />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          投稿する
        </button>
      </form>
    </div>
  );
}
