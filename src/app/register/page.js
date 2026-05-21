"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getProviders, signIn } from "next-auth/react";
import AuthCard from "@/components/AuthCard";

const socialProviders = [
  { id: "google", name: "Google" },
  { id: "facebook", name: "Facebook" },
  { id: "github", name: "GitHub" },
];

function ProviderIcon({ id }) {
  if (id === "google") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path fill="#EA4335" d="M12 10.2v3.9h5.4c-.2 1.3-1.6 3.9-5.4 3.9-3.2 0-5.9-2.7-5.9-6s2.7-6 5.9-6c1.8 0 3 .8 3.7 1.4l2.5-2.4C16.6 3.5 14.5 2.7 12 2.7 6.9 2.7 2.7 6.9 2.7 12S6.9 21.3 12 21.3c6.9 0 9.1-4.8 9.1-7.2 0-.5 0-.8-.1-1.1H12z" />
      </svg>
    );
  }
  if (id === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#1877F2]" aria-hidden="true">
        <path d="M24 12.1C24 5.4 18.6 0 12 0S0 5.4 0 12.1c0 6 4.4 11 10.1 12v-8.4H7.1v-3.6h3V9.3c0-3 1.8-4.7 4.5-4.7 1.3 0 2.6.2 2.6.2v2.9h-1.5c-1.5 0-2 1-2 1.9v2.3h3.4l-.5 3.6h-2.9v8.4C19.6 23.1 24 18.1 24 12.1z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.2.8-.6v-2.1c-3.3.8-4-1.6-4-1.6-.6-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6a4.7 4.7 0 011.2-3.2 4.3 4.3 0 01.1-3.2s1-.3 3.3 1.2a11.3 11.3 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.5 1.2.2 2.6.1 3.2a4.6 4.6 0 011.2 3.2c0 4.7-2.8 5.7-5.5 6 .4.4.8 1 .8 2v2.9c0 .4.2.7.8.6A12 12 0 0012 .3z" />
    </svg>
  );
}

const inputClass =
  "w-full rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-black/30 px-4 py-3 text-sm text-black dark:text-white outline-none transition placeholder:text-black/30 dark:placeholder:text-white/30 focus:border-black/40 dark:focus:border-white/40";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [availableProviderIds, setAvailableProviderIds] = useState([]);

  useEffect(() => {
    async function loadProviders() {
      const providers = await getProviders();
      const filtered = Object.values(providers ?? {}).filter((p) => p.id !== "credentials");
      setAvailableProviderIds(filtered.map((p) => p.id));
    }
    loadProviders();
  }, []);

  async function handleRegister(event) {
    event.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message ?? "Failed to create account.");
        return;
      }
      await signIn("credentials", { email, password, callbackUrl: "/" });
      router.refresh();
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialLogin(provider) {
    if (!availableProviderIds.includes(provider)) {
      setError(`${provider.charAt(0).toUpperCase() + provider.slice(1)} sign-in is not configured yet.`);
      return;
    }
    setError("");
    await signIn(provider, { callbackUrl: "/" });
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <AuthCard
        title="Create your account"
        subtitle="Join TechTalk and personalize your reading and video feed."
        footer={
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-black dark:text-white hover:underline">
              Login
            </Link>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-sm font-medium text-black/70 dark:text-white/70">Name</label>
            <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className={inputClass} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium text-black/70 dark:text-white/70">Email</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputClass} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-medium text-black/70 dark:text-white/70">Password</label>
            <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={inputClass} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="confirm-password" className="text-sm font-medium text-black/70 dark:text-white/70">Confirm Password</label>
            <input id="confirm-password" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className={inputClass} />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-black dark:bg-white px-4 py-3 text-sm font-semibold text-white dark:text-black transition hover:bg-black/80 dark:hover:bg-white/80 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

        <div className="my-5 h-px bg-black/10 dark:bg-white/10" />

        <div className="space-y-2">
          {socialProviders.map((provider) => (
            <button
              key={provider.id}
              type="button"
              onClick={() => handleSocialLogin(provider.id)}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-black/20 px-4 py-3 text-sm font-semibold text-black dark:text-white transition hover:bg-black/5 dark:hover:bg-white/5"
            >
              <ProviderIcon id={provider.id} />
              Continue with {provider.name}
            </button>
          ))}
        </div>
      </AuthCard>
    </section>
  );
}
