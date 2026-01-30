import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="text-white"
                >
                  <path
                    d="M2 2L8 8M8 8V3M8 8H3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 18L12 12M12 12V17M12 12H17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 2H2V8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-xl font-semibold">Paylyt</span>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="#features"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Features
              </Link>
              <Link
                href="#resources"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Resources
              </Link>
              <Link
                href="#support"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Support
              </Link>
              <Link
                href="#pricing"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Pricing
              </Link>
            </div>

            {/* CTA Button */}
            <Link
              href="/login"
              className="bg-[#7c6aef] hover:bg-[#6b59de] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95"
            >
              Start Tracking Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Floating Avatar - Top Left */}
          <div className="absolute left-8 top-40 w-20 h-20 rounded-full overflow-hidden border-2 border-white/10 animate-float-slow hidden lg:block">
            <div className="w-full h-full bg-gradient-to-br bg-[#1a1a1a] border border-white/5 hover:border-white/10"></div>
          </div>

          {/* Floating Avatar - Top Right */}
          <div className="absolute right-20 top-32 w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 animate-float-delay hidden lg:block">
            <div className="w-full h-full bg-[#1a1a1a] border border-white/5 hover:border-white/10"></div>
          </div>

          {/* Floating Avatar - Bottom Right */}
          <div className="absolute right-32 bottom-40 w-20 h-20 rounded-full overflow-hidden border-2 border-white/10 animate-float hidden lg:block">
            <div className="w-full h-full bg-[#1a1a1a] border border-white/5 hover:border-white/10"></div>
          </div>

          {/* Floating Avatar - Bottom Left */}
          <div className="absolute left-20 bottom-20 w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 animate-float-slow hidden lg:block">
            <div className="w-full h-full bg-[#1a1a1a] border border-white/5 hover:border-white/10"></div>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-[#0a0a0a]"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-[#0a0a0a]"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-400 border-2 border-[#0a0a0a]"></div>
            </div>
            <span className="text-sm text-gray-400">
              Trusted by 30,000+ people
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-6 leading-tight animate-fade-in-up">
            <span className="block">Master Your Money.</span>
            <span className="block">Wherever Life Takes You.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-400 text-center mb-10 max-w-3xl mx-auto animate-fade-in-up-delay">
            Track spending, forecast your future, and unlock financial freedom
            with insights that matter.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 animate-fade-in-up-delay-2">
            <Link
              href="/login"
              className="bg-[#7c6aef] hover:bg-[#6b59de] text-white px-8 py-3.5 rounded-full text-base font-medium transition-all hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/20"
            >
              Get Started
            </Link>
            <button className="border border-white/20 hover:border-white/40 text-white px-8 py-3.5 rounded-full text-base font-medium transition-all hover:scale-105 active:scale-95">
              See How It Works
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
