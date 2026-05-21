"use client";

import { useState } from "react";
import { FaCog, FaUserShield, FaBell, FaLock, FaGlobe, FaSave, FaEnvelope } from "react-icons/fa";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "TechTalk",
    adminName: "",
    adminEmail: "",
    notifications: true,
    commentsApproval: true,
    maintenanceMode: false,
    language: "English",
  });

  const handleChange = (key, value) => setSettings({ ...settings, [key]: value });

  const inputClass =
    "w-full border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm bg-white dark:bg-black/20 text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 outline-none focus:border-black/30 dark:focus:border-white/30 transition";

  return (
    <div className="space-y-6 max-w-2xl">

      <div>
        <h1 className="text-2xl font-bold text-black dark:text-white flex items-center gap-2">
          <FaCog className="text-black/40 dark:text-white/40" /> Settings
        </h1>
        <p className="text-sm text-black/40 dark:text-white/40 mt-1">Manage dashboard preferences and system controls.</p>
      </div>

      {/* Admin Profile */}
      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 p-5">
        <h2 className="font-bold text-black dark:text-white flex items-center gap-2 mb-4">
          <FaUserShield className="text-black/40 dark:text-white/40" /> Admin Profile
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" value={settings.adminName} onChange={(e) => handleChange("adminName", e.target.value)} placeholder="Admin Name" className={inputClass} />
          <input type="email" value={settings.adminEmail} onChange={(e) => handleChange("adminEmail", e.target.value)} placeholder="Admin Email" className={inputClass} />
        </div>
      </div>

      {/* Site Settings */}
      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 p-5">
        <h2 className="font-bold text-black dark:text-white flex items-center gap-2 mb-4">
          <FaGlobe className="text-black/40 dark:text-white/40" /> Website Settings
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" value={settings.siteName} onChange={(e) => handleChange("siteName", e.target.value)} placeholder="Website Name" className={inputClass} />
          <select value={settings.language} onChange={(e) => handleChange("language", e.target.value)} className={inputClass}>
            <option>English</option>
            <option>Amharic</option>
            <option>Arabic</option>
          </select>
        </div>
      </div>

      {/* Preferences */}
      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 p-5">
        <h2 className="font-bold text-black dark:text-white mb-4">Preferences</h2>
        <div className="space-y-4">
          {[
            { key: "notifications", icon: <FaBell />, label: "Email Notifications" },
            { key: "commentsApproval", icon: <FaLock />, label: "Comments Need Approval" },
            { key: "maintenanceMode", icon: <FaEnvelope />, label: "Maintenance Mode" },
          ].map(({ key, icon, label }) => (
            <div key={key} className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-sm text-black/70 dark:text-white/70">
                <span className="text-black/40 dark:text-white/40">{icon}</span>
                {label}
              </span>
              <button
                onClick={() => handleChange(key, !settings[key])}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings[key] ? "bg-black dark:bg-white" : "bg-black/20 dark:bg-white/20"
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white dark:bg-black transition-transform ${settings[key] ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => alert("Settings saved!")}
        className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl text-sm font-semibold hover:bg-black/80 dark:hover:bg-white/80 transition"
      >
        <FaSave /> Save Settings
      </button>
    </div>
  );
}
