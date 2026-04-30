"use client";

import { useEffect, useState } from "react";

export default function VideoPage({ params }) {
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(`/api/videos/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setVideo(data.video);
        setComments(data.comments);
      });
  }, [params.id]);

  if (!video) return <p>Loading...</p>;

  return (
    <div className="grid lg:grid-cols-3 gap-6">

      {/* 🔥 MAIN CONTENT */}
      <div className="lg:col-span-2 space-y-4">

        <video controls className="w-full rounded-xl">
          <source src={video.videoUrl} />
        </video>

        <h1 className="text-xl font-bold">{video.title}</h1>
        <p className="text-gray-400">{video.description}</p>

        {/* LIKE */}
        <button className="px-4 py-2 bg-indigo-600 rounded">👍 Like</button>

        {/* COMMENTS */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Comments</h3>

          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write comment..."
            className="w-full p-2 rounded bg-slate-800"
          />

          <button className="mt-2 px-3 py-1 bg-indigo-500 rounded">
            Post
          </button>

          <div className="mt-4 space-y-3">
            {comments.map((c) => (
              <div key={c._id} className="flex gap-3">
                <img src={c.user.image} className="w-8 h-8 rounded-full" />
                <div>
                  <p className="text-sm font-semibold">{c.user.name}</p>
                  <p className="text-xs text-gray-400">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔥 RIGHT SIDE (AUTHOR + RELATED) */}
      <div className="space-y-4">

        {/* AUTHOR */}
        <div className="bg-slate-900 p-4 rounded-xl border">
          <img src={video.author.image} className="w-12 h-12 rounded-full" />
          <p className="mt-2 font-semibold">{video.author.name}</p>
        </div>

        {/* RELATED */}
        <div className="bg-slate-900 p-4 rounded-xl border">
          <h3 className="mb-3 font-semibold">Related Videos</h3>
          <p className="text-sm text-gray-400">Coming from same category</p>
        </div>
      </div>
    </div>
  );
}