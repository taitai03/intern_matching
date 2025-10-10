// frontend/src/app/internships/[id]/page.jsx
"use client"

import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function InternshipDetail() {
  useAuthRedirect(); 
  
  const router = useRouter()
  const params = useParams()   
  const id = params.id         // Promise unwrap いらない
  const [internship, setInternship] = useState(null)
  const [loading, setLoading] = useState(true)

  // インターン詳細を取得
  useEffect(() => {
    if (!id) return
  
    const token = localStorage.getItem("token")
  
    fetch(`http://localhost:8080/internships/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`)
        return res.json()
      })
      .then(data => {
        setInternship(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("取得失敗:", err)
        setLoading(false)
      })
  }, [id])
  

  const handleApply = async () => {
    const token = localStorage.getItem("token")
    const res = await fetch(`http://localhost:8080/internships/${id}/entries`, {
      method: "POST",
      body: JSON.stringify({ internship_id: id }),
      headers: {       "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json" },
    })
    const data = await res.json()
    if (res.ok) {
      alert("応募完了！")
      router.push(`/chat/${data.chat_room_id}`) // 応募後にチャット画面へ
    }
  }

  if (loading) return <p>読み込み中...</p>
  if (!internship) return <p>インターンが見つかりませんでした。</p>

  return (
<div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
  <h1 className="text-3xl font-bold text-gray-900 mb-4">
    {internship.title}
  </h1>

  <p className="text-gray-700 leading-relaxed mb-6">
    {internship.description}
  </p>

  <p className="text-gray-700 leading-relaxed mb-6">{internship.requirements}</p>


  <div className="flex items-center justify-between mb-8">
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        internship.status === "open"
          ? "bg-green-100 text-green-700"
          : "bg-gray-200 text-gray-600"
      }`}
    >
      {internship.status === "open" ? "募集中" : "募集終了"}
    </span>
  </div>

  <button
    onClick={handleApply}
    disabled={internship.status !== "open"}
    className={`w-full py-3 rounded-xl font-semibold transition 
      ${
        internship.status === "open"
          ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] cursor-pointer"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
  >
    {internship.status === "open" ? "応募する" : "募集は終了しました"}
  </button>
</div>

  )
}
