"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  HandHeartIcon,
  InfoIcon,
  Loader2Icon,
  LogInIcon,
  UserPlusIcon,
} from "lucide-react"
import { signIn, signUp } from "@/lib/auth-client"

type Mode = "login" | "signup"

const inputClassName =
  "w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500/60"

function friendlyError(error: { code?: string; message?: string } | null | undefined) {
  const code = error?.code ?? ""
  if (code.includes("INVALID_EMAIL_OR_PASSWORD")) {
    return "Wrong email or password. Please try again."
  }
  if (code.includes("USER_ALREADY_EXISTS")) {
    return "This email is already registered. Please login instead."
  }
  if (code.includes("PASSWORD_TOO_SHORT")) {
    return "Password must be at least 6 characters."
  }
  if (code.includes("INVALID_EMAIL")) {
    return "Please enter a valid email address."
  }
  if (code.includes("SOCIAL")) {
    return error?.message ?? "Google sign-in failed. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local."
  }
  if (error?.message) {
    return error.message
  }
  return "Something went wrong. Please try again."
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.68 2.85c2.16-2 3.4-4.95 3.4-8.67z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09L2.18 7.07C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.68-2.85c-1.02.68-2.33 1.06-3.6 1.06-2.86 0-5.29-1.93-6.16-4.53l-3.66 2.84C3.99 20.53 7.7 23 12 23z"
      />
    </svg>
  )
}

export function LoginForm({ missingEnvVars }: { missingEnvVars: string[] }) {
  const [mode, setMode] = useState<Mode>("login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState<Mode | "google" | null>(null)
  const router = useRouter()

  const finish = () => {
    router.push("/deshbord/my-booking")
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loading) return
    setError("")
    setLoading(mode)
    try {
      const response =
        mode === "signup"
          ? await signUp.email({
              name,
              email,
              password,
            })
          : await signIn.email({
              email,
              password,
            })

      if (response.error) {
        setError(friendlyError(response.error))
      } else {
        finish()
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(null)
    }
  }

  const handleGoogle = async () => {
    if (loading) return
    setError("")
    setLoading("google")
    try {
      const response = await signIn.social({
        provider: "google",
      })

      if (response.error) {
        setError(friendlyError(response.error))
        setLoading(null)
      } else {
        finish()
      }
    } catch {
      setError("Google sign-in failed. Please try again.")
      setLoading(null)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-14">
      <div className="rounded-3xl border border-border bg-card/70 shadow-md p-8 space-y-6">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-linear-to-br from-green-950 to-orange-900 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
            <HandHeartIcon className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-foreground">
            {mode === "login" ? "Welcome Back" : "Join WinterCare"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {mode === "login"
              ? "Login with your email or Google account to continue."
              : "Create an account to organize and join events."}
          </p>
        </div>

        {missingEnvVars.length > 0 ? (
          <div className="flex gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
            <InfoIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed text-amber-700 dark:text-amber-400">
              Missing env vars:
              <span className="mx-1 font-bold">{missingEnvVars.join(", ")}</span>
              — set them in
              <code className="mx-1 font-bold">.env.local</code>
              and restart the dev server. Google sign-in also needs an OAuth
              client id/secret from Google Cloud Console (redirect:
              <code className="mx-1 font-bold">/api/auth/callback/google</code>).
            </p>
          </div>
        ) : null}

        <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-muted">
          {(["login", "signup"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setMode(tab)
                setError("")
              }}
              className={`py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                mode === tab
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "login" ? "Login" : "Sign Up"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" ? (
            <div className="space-y-2">
              <label
                htmlFor="login-name"
                className="text-sm font-bold text-foreground"
              >
                Name
              </label>
              <input
                id="login-name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className={inputClassName}
              />
            </div>
          ) : null}

          <div className="space-y-2">
            <label
              htmlFor="login-email"
              className="text-sm font-bold text-foreground"
            >
              Email
            </label>
            <input
              id="login-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={inputClassName}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="login-password"
              className="text-sm font-bold text-foreground"
            >
              Password
            </label>
            <input
              id="login-password"
              type="password"
              required
              minLength={6}
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={
                mode === "signup" ? "At least 6 characters" : "Your password"
              }
              className={inputClassName}
            />
          </div>

          {error ? (
            <p className="text-xs font-semibold text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading !== null}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-600 text-white font-bold text-sm shadow-lg shadow-teal-600/25 hover:bg-teal-700 hover:shadow-xl disabled:opacity-60 active:scale-[0.98] transition-all cursor-pointer"
          >
            {loading === mode ? (
              <Loader2Icon className="w-4 h-4 animate-spin" />
            ) : mode === "login" ? (
              <LogInIcon className="w-4 h-4" />
            ) : (
              <UserPlusIcon className="w-4 h-4" />
            )}
            <span>{mode === "login" ? "Login" : "Create Account"}</span>
          </button>
        </form>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" />
          <span>or continue with</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading !== null}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-border bg-card text-foreground font-bold text-sm hover:bg-muted disabled:opacity-60 active:scale-[0.98] transition-all cursor-pointer"
        >
          {loading === "google" ? (
            <Loader2Icon className="w-4 h-4 animate-spin" />
          ) : (
            <GoogleIcon />
          )}
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  )
}
