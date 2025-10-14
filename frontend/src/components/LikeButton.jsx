"use client";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function LikeButton({ jobId, liked, onLike }) {
  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={() => onLike(jobId)}
      className={`flex items-center gap-1 px-3 py-2 rounded-full shadow-md transition-all duration-300 ${
        liked ? "bg-red-500 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
      }`}
    >
      <Heart
        className={`w-5 h-5 transition-transform duration-300 ${
          liked ? "fill-current scale-110" : ""
        }`}
      />
      <span className="font-medium">
        {liked ? "いいね済み" : "いいね"}
      </span>
    </motion.button>
  );
}
