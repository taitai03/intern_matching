"use client"
import { useEffect, useRef, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"

export default function ChatRoom() {
  const params = useParams()

  const roomId = params.id
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    if (!roomId) return
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    console.log(userData)
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setCurrentUserId(parsedUser.id);
    }

    fetch(`http://localhost:8080/chat_rooms/${roomId}/messages`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
    })
      .then(res => res.json())
      .then(data => {

        const msgs = Array.isArray(data) ? data : data.messages || [];
        setMessages(msgs);
      }); // Rails返却形式に合わせる
  }, [roomId])

  useEffect(() => {
    // メッセージが追加されたら自動スクロール
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const sendMessage = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/chat_rooms/${roomId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
       },
      body: JSON.stringify({ content: input }),
    })
    if (res.ok) {
      const newMsg = await res.json()
      console.log(newMsg)
      setMessages(prev => [...prev, newMsg])
      setInput("")
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
    {/* ヘッダー */}
    <header className="bg-blue-600 text-white shadow-md px-6 py-4 flex justify-between items-center">
      チャットルーム
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
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
            ログアウト
          </button>
        </div>
    </header>

    {/* メッセージ一覧 */}
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
      {messages.map((msg, index) => {
        const isMine = msg.user_id === currentUserId;
        return (
          <div
            key={msg.id || index}
            className={`flex ${isMine ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2 shadow-md ${
                isMine
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none"
              }`}
            >
              <p className="text-sm font-semibold mb-1">
                {msg.user?.name || (isMine ? "あなた" : "相手")}
              </p>
              <p>{msg.content}</p>
              <p className="text-xs text-gray-300 mt-1 text-right">
                {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>

    {/* 入力欄 */}
    <div className="p-3 bg-white border-t flex items-center gap-2 sticky bottom-0">
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="メッセージを入力..."
        className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
      >
        送信
      </button>
    </div>
  </div>
  )
}
