import Image from 'next/image';
import Link from 'next/link';

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
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white">
                  <path d="M2 2L8 8M8 8V3M8 8H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 18L12 12M12 12V17M12 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 2H2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xl font-semibold">Trackflow</span>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#resources" className="text-sm text-gray-400 hover:text-white transition-colors">
                Resources
              </Link>
              <Link href="#support" className="text-sm text-gray-400 hover:text-white transition-colors">
                Support
              </Link>
              <Link href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">
                Pricing
              </Link>
            </div>

            {/* CTA Button */}
            <button className="bg-[#7c6aef] hover:bg-[#6b59de] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95">
              Start Tracking Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Floating Avatar - Top Left */}
          <div className="absolute left-8 top-40 w-20 h-20 rounded-full overflow-hidden border-2 border-white/10 animate-float-slow hidden lg:block">
            <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500"></div>
          </div>

          {/* Floating Avatar - Top Right */}
          <div className="absolute right-20 top-32 w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 animate-float-delay hidden lg:block">
            <div className="w-full h-full bg-gradient-to-br from-pink-400 to-red-500"></div>
          </div>

          {/* Floating Avatar - Bottom Right */}
          <div className="absolute right-32 bottom-40 w-20 h-20 rounded-full overflow-hidden border-2 border-white/10 animate-float hidden lg:block">
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
          </div>

          {/* Floating Avatar - Bottom Left */}
          <div className="absolute left-20 bottom-20 w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 animate-float-slow hidden lg:block">
            <div className="w-full h-full bg-gradient-to-br from-green-400 to-teal-500"></div>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-[#0a0a0a]"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-[#0a0a0a]"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-400 border-2 border-[#0a0a0a]"></div>
            </div>
            <span className="text-sm text-gray-400">Trusted by 30,000+ people</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-6 leading-tight animate-fade-in-up">
            <span className="block">Master Your Money.</span>
            <span className="block">Wherever Life Takes You.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-400 text-center mb-10 max-w-3xl mx-auto animate-fade-in-up-delay">
            Track spending, forecast your future, and unlock financial freedom with insights that matter.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 animate-fade-in-up-delay-2">
            <button className="bg-[#7c6aef] hover:bg-[#6b59de] text-white px-8 py-3.5 rounded-full text-base font-medium transition-all hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/20">
              Download
            </button>
            <button className="border border-white/20 hover:border-white/40 text-white px-8 py-3.5 rounded-full text-base font-medium transition-all hover:scale-105 active:scale-95">
              See How It Works
            </button>
          </div>

          {/* Platform Info */}
          <p className="text-sm text-gray-500 text-center animate-fade-in-up-delay-3">
            Available on iOS & Android. Free to use.
          </p>
        </div>
      </section>

      {/* Phone Mockups Section */}
      <section className="relative pb-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="relative flex items-end justify-center gap-4 lg:gap-8">
            {/* Left Phone - Accounts */}
            <div className="relative w-[280px] lg:w-[320px] animate-slide-in-left">
              <div className="relative">
                {/* Phone Frame */}
                <div className="relative bg-[#1a1a1a] rounded-[3rem] p-3 shadow-2xl border border-white/5">
                  <div className="bg-[#0f0f0f] rounded-[2.5rem] overflow-hidden">
                    {/* Status Bar */}
                    <div className="flex items-center justify-between px-6 py-3 text-white text-xs">
                      <span>09:41</span>
                      <div className="flex items-center gap-1">
                        <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
                          <path d="M0 2C0 0.895431 0.895431 0 2 0H15C16.1046 0 17 0.895431 17 2V10C17 11.1046 16.1046 12 15 12H2C0.895431 12 0 11.1046 0 10V2Z"/>
                        </svg>
                        <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
                          <path d="M0 2C0 0.895431 0.895431 0 2 0H15C16.1046 0 17 0.895431 17 2V10C17 11.1046 16.1046 12 15 12H2C0.895431 12 0 11.1046 0 10V2Z"/>
                        </svg>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-6">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Accounts</h2>
                        <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2">
                            <path d="M7 1V13M1 7H13"/>
                          </svg>
                        </button>
                      </div>

                      {/* Bank Cards */}
                      <div className="space-y-4 mb-6">
                        {/* Purple Card */}
                        <div className="bg-gradient-to-br from-[#9b8aff] to-[#7c6aef] rounded-2xl p-5 shadow-lg">
                          <div className="flex items-start justify-between mb-8">
                            <div>
                              <p className="text-xs text-white/80 mb-1">VISA</p>
                              <p className="text-sm text-white/80">XYZ BANK</p>
                            </div>
                            <div className="text-2xl">💳</div>
                          </div>
                          <p className="text-3xl font-bold mb-2">₹69,000</p>
                          <p className="text-sm text-white/80 mb-1">Peter Nioh</p>
                          <p className="text-xs text-white/60">•••• •••• •••• 0089</p>
                        </div>

                        {/* Dark Card */}
                        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5">
                          <div className="flex items-start justify-between mb-8">
                            <div>
                              <p className="text-xs text-white/60 mb-1">Mastercard</p>
                              <p className="text-sm text-white/80">XYZ BANK</p>
                            </div>
                            <div className="flex gap-1">
                              <div className="w-6 h-6 rounded-full bg-red-500/80"></div>
                              <div className="w-6 h-6 rounded-full bg-orange-500/80 -ml-3"></div>
                            </div>
                          </div>
                          <p className="text-3xl font-bold mb-2">₹22,000</p>
                          <p className="text-sm text-white/80 mb-1">Alex Hawk</p>
                          <p className="text-xs text-white/60">•••• •••• •••• 0445</p>
                        </div>
                      </div>

                      {/* Recent Transactions */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold text-white/80">Recent Transactions</h3>
                          <button className="text-xs text-purple-400">View all</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Phone - Dashboard */}
            <div className="relative w-[280px] lg:w-[320px] animate-slide-in-up z-10">
              <div className="relative">
                {/* Phone Frame */}
                <div className="relative bg-[#1a1a1a] rounded-[3rem] p-3 shadow-2xl border border-white/5">
                  <div className="bg-[#0f0f0f] rounded-[2.5rem] overflow-hidden">
                    {/* Status Bar */}
                    <div className="flex items-center justify-between px-6 py-3 text-white text-xs">
                      <span>09:41</span>
                      <div className="flex items-center gap-1">
                        <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
                          <path d="M0 2C0 0.895431 0.895431 0 2 0H15C16.1046 0 17 0.895431 17 2V10C17 11.1046 16.1046 12 15 12H2C0.895431 12 0 11.1046 0 10V2Z"/>
                        </svg>
                        <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
                          <path d="M0 2C0 0.895431 0.895431 0 2 0H15C16.1046 0 17 0.895431 17 2V10C17 11.1046 16.1046 12 15 12H2C0.895431 12 0 11.1046 0 10V2Z"/>
                        </svg>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-6">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Trackflow</h2>
                        <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
                            <circle cx="7" cy="3" r="1.5"/>
                            <circle cx="7" cy="7" r="1.5"/>
                            <circle cx="7" cy="11" r="1.5"/>
                          </svg>
                        </button>
                      </div>

                      {/* Greeting */}
                      <p className="text-base mb-6">Hi, Alex! 👋</p>

                      {/* Spending Card */}
                      <div className="bg-gradient-to-br from-[#9b8aff] to-[#7c6aef] rounded-2xl p-5 mb-6 shadow-lg">
                        <p className="text-sm text-white/80 mb-2">This Month's Spending</p>
                        <p className="text-4xl font-bold mb-3">₹18,000</p>
                        <div className="mb-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                              <div className="h-full w-[80%] bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></div>
                            </div>
                          </div>
                          <p className="text-xs text-white/80">80% of ₹22,000 Budget Used</p>
                        </div>
                        <button className="text-xs text-white/90 underline">View Full Report</button>
                      </div>

                      {/* Essentials Section */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="text-base font-semibold">Essentials</h3>
                            <p className="text-xs text-white/60">Your daily finance check-in</p>
                          </div>
                          <button className="text-xs text-purple-400">View all</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Phone - Statistics */}
            <div className="relative w-[280px] lg:w-[320px] animate-slide-in-right">
              <div className="relative">
                {/* Phone Frame */}
                <div className="relative bg-[#1a1a1a] rounded-[3rem] p-3 shadow-2xl border border-white/5">
                  <div className="bg-[#0f0f0f] rounded-[2.5rem] overflow-hidden">
                    {/* Status Bar */}
                    <div className="flex items-center justify-between px-6 py-3 text-white text-xs">
                      <span>09:41</span>
                      <div className="flex items-center gap-1">
                        <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
                          <path d="M0 2C0 0.895431 0.895431 0 2 0H15C16.1046 0 17 0.895431 17 2V10C17 11.1046 16.1046 12 15 12H2C0.895431 12 0 11.1046 0 10V2Z"/>
                        </svg>
                        <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
                          <path d="M0 2C0 0.895431 0.895431 0 2 0H15C16.1046 0 17 0.895431 17 2V10C17 11.1046 16.1046 12 15 12H2C0.895431 12 0 11.1046 0 10V2Z"/>
                        </svg>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-6">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Statistics</h2>
                        <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
                            <circle cx="7" cy="3" r="1.5"/>
                            <circle cx="7" cy="7" r="1.5"/>
                            <circle cx="7" cy="11" r="1.5"/>
                          </svg>
                        </button>
                      </div>

                      {/* Time Period Filters */}
                      <div className="flex gap-2 mb-6 flex-wrap">
                        <button className="px-3 py-1.5 rounded-full bg-[#7c6aef] text-xs font-medium">Day</button>
                        <button className="px-3 py-1.5 rounded-full bg-white/5 text-xs font-medium hover:bg-white/10 transition-colors">Week</button>
                        <button className="px-3 py-1.5 rounded-full bg-white/5 text-xs font-medium hover:bg-white/10 transition-colors">Month</button>
                        <button className="px-3 py-1.5 rounded-full bg-white/5 text-xs font-medium hover:bg-white/10 transition-colors">Year</button>
                      </div>

                      {/* Date Range */}
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-white/80">08 Apr - 14 Apr</p>
                        <button className="px-3 py-1.5 rounded-lg bg-white/5 text-xs font-medium flex items-center gap-1">
                          Spending
                          <svg width="10" height="6" viewBox="0 0 10 6" fill="white">
                            <path d="M1 1L5 5L9 1"/>
                          </svg>
                        </button>
                      </div>

                      {/* Bar Chart */}
                      <div className="h-48 flex items-end justify-between gap-3 mb-4">
                        <div className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full bg-white/5 rounded-t-lg" style={{height: '60%'}}></div>
                          <span className="text-xs text-white/60">M</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full bg-white/5 rounded-t-lg" style={{height: '40%'}}></div>
                          <span className="text-xs text-white/60">T</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full bg-white/5 rounded-t-lg" style={{height: '45%'}}></div>
                          <span className="text-xs text-white/60">W</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full bg-white rounded-t-lg" style={{height: '80%'}}></div>
                          <span className="text-xs text-white">T</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full bg-white/5 rounded-t-lg" style={{height: '75%'}}></div>
                          <span className="text-xs text-white/60">F</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full bg-white/5 rounded-t-lg" style={{height: '50%'}}></div>
                          <span className="text-xs text-white/60">S</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full bg-white/5 rounded-t-lg" style={{height: '20%'}}></div>
                          <span className="text-xs text-white/60">S</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
