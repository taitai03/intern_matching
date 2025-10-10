"use client";

export const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
        <div className="absolute inset-3 rounded-full bg-white shadow-inner"></div>
      </div>
      <h2 className="text-2xl font-semibold text-blue-700 tracking-wide mb-2">
        Intern Matching
      </h2>
      <p className="text-gray-600">認証を確認中です...</p>
    </div>
  );
};
