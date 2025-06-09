import React, { useEffect, useState } from "react";

export default function SLAProgress({ createdAt }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!createdAt) return;

    const createdTime = new Date(createdAt).getTime();
    const total = 7 * 24 * 60 * 60 * 1000;
    const updateProgress = () => {
      const now = Date.now();
      const diff = now - createdTime;
      const percent = Math.min(100, (diff / total) * 100);
      setProgress(percent);
    };

    updateProgress();
    const interval = setInterval(updateProgress, 1000);
    return () => clearInterval(interval);
  }, [createdAt]);

  if (!createdAt) return null;

  const getBarColor = () => {
    if (progress < 50) return "bg-green-600";
    if (progress < 80) return "bg-yellow-500";
    return "bg-red-600";
  };

  return (
    <div className="relative h-6 w-full overflow-hidden rounded bg-gray-300">
      <div
        className={`h-full ${getBarColor()} flex items-center justify-center text-sm font-medium text-white transition-all duration-1000`}
        style={{ width: `${progress}%` }}
      >
        {Math.floor(progress)}%
      </div>
    </div>
  );
}
