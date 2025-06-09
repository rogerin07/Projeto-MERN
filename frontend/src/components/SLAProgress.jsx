import React, { useEffect, useState } from "react";

export default function SLAProgress({ createdAt }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!createdAt) return;
    const createdTime = new Date(createdAt).getTime();
    const now = Date.now();
    const diff = now - createdTime;
    const total = 7 * 24 * 60 * 60 * 1000; // 7 dias em ms
    const percent = Math.min(100, (diff / total) * 100);
    setProgress(percent);
  }, [createdAt]);

  if (!createdAt) return null;

  return (
    <div className="h-4 w-full rounded bg-gray-300">
      <div
        className="h-4 rounded bg-green-600"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
