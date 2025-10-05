"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function ChatRoom() {
  const params = useParams()

  const roomId = params.id
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  useEffect(() => {
    if (!roomId) return
    const token = localStorage.getItem("token");

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
    <div>
      <h1>チャットルーム</h1>
      <div>
      {messages.map((msg, index) => (
        <p key={msg.id || index}>
          <b>{msg.user.name}:</b> {msg.content}
        </p>
      ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="メッセージを入力"
      />
      <button onClick={sendMessage}>送信</button>
    </div>
  )
}
