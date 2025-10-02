"use client";

import Link from "next/link";

export default function MainPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-blue-600 text-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">インターンマッチング</h1>
        <div className="flex gap-4">
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

      {/* メイン */}
      <main className="flex-1 p-6">
        <h2 className="text-lg font-semibold mb-4">募集一覧</h2>

        {/* 企業の募集カード (仮データ) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((id) => (
            <div
              key={id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold mb-2">企業 {id}</h3>
              <p className="text-gray-600 mb-4">
                インターン募集の説明がここに入ります。
              </p>
              <button className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition">
                詳細を見る
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}