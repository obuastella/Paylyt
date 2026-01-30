import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6 py-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-500/20 blur-[90px]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/15 blur-[110px]"></div>
      </div>

      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#111111]/80 backdrop-blur-xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Back to home
          </Link>
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
            <span className="text-sm font-semibold">TF</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
        <p className="text-gray-400 mb-8">
          Log in to continue tracking your spending and goals.
        </p>

        <form className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm text-gray-300" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              className="w-full rounded-xl bg-[#0f0f0f] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/60"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl bg-[#0f0f0f] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/60"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-400">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-white/20 bg-transparent"
              />
              Remember me
            </label>
            <button
              type="button"
              className="text-purple-300 hover:text-purple-200 transition-colors"
            >
              Forgot password?
            </button>
          </div>
          <Link href="/dashboard" className="mt-6 block">
            <button
              type="submit"
              className="w-full bg-[#7c6aef] hover:bg-[#6b59de] text-white py-3 rounded-xl text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Log In
            </button>
          </Link>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            className="text-purple-300 hover:text-purple-200 transition-colors"
          >
            Create one
          </button>
        </div>
      </div>
    </div>
  );
}
