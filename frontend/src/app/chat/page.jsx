"use client"
import Header from "@/components/Header";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ChatList() {
  useAuthRedirect(); 

  const [rooms, setRooms] = useState([])
  const [currentUser,setCurrentUser]=useState([])
  const router = useRouter();
  
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setCurrentUser(parsedUser);
        console.log("ユーザーデータ:", parsedUser);
      } catch (error) {
        console.error("JSON解析エラー:", error);
      }
    }
  }, []); 

  if (!currentUser) {
    return <div>ユーザー情報を読み込み中...</div>;
  }
  const href = currentUser.role === "company" ? "/company" : "/mainpage";

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

        <Header />
        <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          チャット一覧
        </h1>

        {rooms.length === 0 ? (
          <p className="text-gray-500 text-center">チャットルームがありません。</p>
        ) : (
          <ul className="space-y-4 max-w-2xl mx-auto">
            {rooms.map((room) => (
              <li key={room.id}>
                <Link
                  href={`/chat/${room.id}`}
                  className="block bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 hover:bg-blue-50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {room.internship.title || "タイトル未設定"}
                      </h2>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {room.company.name}
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        応募者: {room.applicant.name}
                      </p>
                    </div>
                    <div className="text-blue-600 text-sm font-medium">
                      チャットを開く →
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>


  )
}
