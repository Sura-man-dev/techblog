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
        <path
          fill="#EA4335"
          d="M12 10.2v3.9h5.4c-.2 1.3-1.6 3.9-5.4 3.9-3.2 0-5.9-2.7-5.9-6s2.7-6 5.9-6c1.8 0 3 .8 3.7 1.4l2.5-2.4C16.6 3.5 14.5 2.7 12 2.7 6.9 2.7 2.7 6.9 2.7 12S6.9 21.3 12 21.3c6.9 0 9.1-4.8 9.1-7.2 0-.5 0-.8-.1-1.1H12z"
        />
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

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [availableProviderIds, setAvailableProviderIds] = useState([]);

  useEffect(() => {
    async function loadProviders() {
      const providers = await getProviders();
      const filtered = Object.values(providers ?? {}).filter((provider) => provider.id !== "credentials");
      setAvailableProviderIds(filtered.map((provider) => provider.id));
    }

    loadProviders();
  }, []);

  async function handleCredentialsLogin(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch (_error) {
      setError("Login failed. Please try again.");
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
        title="Welcome back"
        subtitle="Sign in to continue reading premium tech content."
        footer={
          <>
            New here?{" "}
            <Link href="/register" className="font-semibold text-indigo-500 hover:text-indigo-400">
              Create an account
            </Link>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleCredentialsLogin}>
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-indigo-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-indigo-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <div className="pt-1 text-right">
            <Link href="#" className="text-sm font-medium text-indigo-500 hover:text-indigo-400">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {error ? <p className="mt-3 text-sm text-red-500">{error}</p> : null}

        <div className="my-5 h-px bg-slate-200 dark:bg-slate-700" />

        <div className="space-y-2">
          {socialProviders.map((provider) => (
            <button
              key={provider.id}
              type="button"
              onClick={() => handleSocialLogin(provider.id)}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              <ProviderIcon id={provider.id} />
              {`Continue with ${provider.name}`}
            </button>
          ))}
        </div>
      </AuthCard>
    </section>
  );
}
