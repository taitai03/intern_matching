"use client"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ChatList() {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/chat_rooms",{      headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, 
    },})
      .then(res => res.json())
      .then(data => {
        const roomsArray = Array.isArray(data) ? data : data.rooms || [];
        console.log(data)
        setRooms(roomsArray);
      })
  }, [])

  return (
    <div>
      <h1>チャット一覧</h1>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <Link href={`/chats/${room.id}`}>
              <span>
                {room.company_name} - {room.student_name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
