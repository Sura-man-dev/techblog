"use client";

import { useEffect, useState } from "react";

export default function VideosPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  return (
    <div className="flex gap-6">

      {/* 🔥 LEFT SIDEBAR (FIXED) */}
      <aside className="hidden lg:block w-[260px] fixed top-20 left-6 space-y-6">
        
        {/* Categories */}
        <div className="bg-slate-900 p-4 rounded-xl border">
          <h3 className="text-sm font-semibold mb-3">Categories</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="text-indigo-400">AI Videos</li>
            <li>Web Development</li>
            <li>JavaScript</li>
            <li>DevOps</li>
          </ul>
        </div>

        {/* Tags */}
        <div className="bg-slate-900 p-4 rounded-xl border">
          <h3 className="text-sm font-semibold mb-3">Popular Tags</h3>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 bg-slate-800 rounded">Next.js</span>
            <span className="px-2 py-1 bg-slate-800 rounded">React</span>
            <span className="px-2 py-1 bg-slate-800 rounded">AI</span>
          </div>
        </div>
      </aside>

      {/* 🔥 MAIN CONTENT */}
      <main className="flex-1 lg:ml-[300px]">

        <h1 className="text-2xl font-bold mb-6">Tech Videos</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video._id} className="bg-slate-900 rounded-xl overflow-hidden border">
              
              <img src={video.thumbnail} className="w-full h-40 object-cover" />

              <div className="p-4">
                <h3 className="text-sm font-semibold">{video.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{video.views} views</p>
              </div>

            </div>
          ))}
        </div>
      </main>
    </div>
  );
}