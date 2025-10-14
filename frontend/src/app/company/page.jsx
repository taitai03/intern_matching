"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useHandleAuthError } from "@/hooks/useHAndleAuthError";
import Header from "@/components/Header";

export default function CompanyDashboard() {
  useAuthRedirect(); 
  const { handleAuthError } = useHandleAuthError();

  const [internships, setInternships] = useState([]);
  const router = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  useEffect(() => {
    fetch("http://localhost:8080/internships", {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    })
    .then(async (res) => {
      if (handleAuthError(res)) return; // ← ここで不正アクセス検知
      const data = await res.json();
      setInternships(data);
    })
    .catch((err) => console.error(err));
  }, []);

  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token"); // JWTなど使っている場合も削除
    sessionStorage.clear();
    router.push("/"); // 例: ログインページに戻す
  };

  return (
    <div>
      <Header />
      <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">募集一覧</h1>

      <ul className="space-y-4">
        {internships.map((job) => (
          <li key={job.id} className="p-4 border rounded flex justify-between">
            <div>
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.description}</p>
              <p className="text-gray-600">{job.requirements}</p>
              <span className="text-sm text-gray-500">
                ステータス: {job.status === "open" ? "募集中" : "募集終了"}
              </span>
            </div>
            <button
              onClick={() => router.push(`/company/${job.id}/edit`)}
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              編集
            </button>


          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}
