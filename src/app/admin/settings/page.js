"use client";

import { useState } from "react";
import {
  FaCog,
  FaUserShield,
  FaBell,
  FaLock,
  FaPalette,
  FaGlobe,
  FaSave,
  FaMoon,
  FaSun,
  FaEnvelope,
} from "react-icons/fa";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "TECH TALK",
    adminName: "Beti",
    adminEmail: "admin@techtalk.com",
    notifications: true,
    commentsApproval: true,
    darkMode: false,
    maintenanceMode: false,
    language: "English",
  });

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSave = () => {
    alert("Settings Saved Successfully!");
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <FaCog className="text-blue-600" />
          Admin Settings
        </h1>
        <p className="text-gray-500 mt-2">
          Manage your dashboard preferences and system controls.
        </p>
      </div>

      {/* Profile Settings */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
          <FaUserShield className="text-blue-600" />
          Admin Profile
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          <input
            type="text"
            value={settings.adminName}
            onChange={(e) => handleChange("adminName", e.target.value)}
            placeholder="Admin Name"
            className="border rounded-lg px-4 py-3"
          />

          <input
            type="email"
            value={settings.adminEmail}
            onChange={(e) => handleChange("adminEmail", e.target.value)}
            placeholder="Admin Email"
            className="border rounded-lg px-4 py-3"
          />
        </div>
      </div>

      {/* Site Settings */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
          <FaGlobe className="text-green-600" />
          Website Settings
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) => handleChange("siteName", e.target.value)}
            placeholder="Website Name"
            className="border rounded-lg px-4 py-3"
          />

          <select
            value={settings.language}
            onChange={(e) => handleChange("language", e.target.value)}
            className="border rounded-lg px-4 py-3"
          >
            <option>English</option>
            <option>Amharic</option>
            <option>Arabic</option>
          </select>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
          <FaPalette className="text-purple-600" />
          Preferences
        </h2>

        <div className="space-y-5">

          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <FaBell />
              Email Notifications
            </span>

            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) =>
                handleChange("notifications", e.target.checked)
              }
              className="w-5 h-5"
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <FaLock />
              Comments Need Approval
            </span>

            <input
              type="checkbox"
              checked={settings.commentsApproval}
              onChange={(e) =>
                handleChange("commentsApproval", e.target.checked)
              }
              className="w-5 h-5"
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              {settings.darkMode ? <FaMoon /> : <FaSun />}
              Dark Mode
            </span>

            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={(e) =>
                handleChange("darkMode", e.target.checked)
              }
              className="w-5 h-5"
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <FaEnvelope />
              Maintenance Mode
            </span>

            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) =>
                handleChange("maintenanceMode", e.target.checked)
              }
              className="w-5 h-5"
            />
          </div>

        </div>
      </div>

      {/* Save Button */}
      <div>
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
        >
          <FaSave />
          Save Settings
        </button>
      </div>

    </div>
  );
}