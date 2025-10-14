"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";




export default function Header() {
  const checking = useAuthRedirect();


  const [room,setRooms]=useState([])
  const router=useRouter()
  const [currentUser,setCurrentUser]=useState([])
  
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




    const handleLogout = () => {

      localStorage.removeItem("user");
      localStorage.removeItem("token"); 
      sessionStorage.clear();
      router.push("/"); 
    };
  return (
    <header className="bg-blue-600 text-white shadow-md px-6 py-4 flex justify-between items-center">
    <h1 className="text-xl font-bold">Intern Matching</h1>
    <div className="flex gap-4">
      <Link
        href={href}
        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
        ホームへ
      </Link>

      {currentUser.role !== "company" && (
          <Link
            href="/likes"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            お気に入り一覧
          </Link>
        )}

        {currentUser.role === "company" && (
          <Link
            href="/company/recruitment"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            募集ページの作成
          </Link>
        )}
      <Link
        href="/chat"
        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
      >
        チャット
      </Link>
      <button onClick={handleLogout} className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
        ログアウト
      </button>
    </div>
  </header>
  );
}