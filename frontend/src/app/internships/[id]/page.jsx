// frontend/src/app/internships/[id]/page.jsx
"use client"

import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function InternshipDetail() {
  const router = useRouter()
  const params = useParams()   
  const id = params.id         // Promise unwrap いらない
  const [internship, setInternship] = useState(null)
  const [loading, setLoading] = useState(true)

  // インターン詳細を取得
  useEffect(() => {
    console.log("詳細画面で受け取ったID:", id)
    if (!id) return
  
    const token = localStorage.getItem("token")
    console.log("送信するトークン:", token)
  
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
        console.log("APIから返ってきたデータ:", data)
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
    console.log("送信するトークン:", token)
    const res = await fetch(`http://localhost:8080/internships/${id}/entries`, {
      method: "POST",
      body: JSON.stringify({ internship_id: id }),
      headers: {       "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json" },
    })
    const data = await res.json()
    console.log("エントリーAPIのレスポンス:", data)
    if (res.ok) {
      alert("応募完了！")
      router.push(`/chat/${data.chat_room_id}`) // 応募後にチャット画面へ
    }
  }

  if (loading) return <p>読み込み中...</p>
  if (!internship) return <p>インターンが見つかりませんでした。</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{internship.title}</h1>
      <p className="mb-2">{internship.description}</p>
      <p className="mb-4 text-gray-600">
        ステータス: {internship.status === "open" ? "募集中" : "募集終了"}
      </p>
      <button
        onClick={handleApply}
        disabled={internship.status !== "open"}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        応募する
      </button>
    </div>
  )
}
