"use client";

import { Search, Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-[#0f0f0f] border-b border-white/5 px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Page Title */}
        <h1 className="text-2xl lg:text-3xl font-bold">Dashboard</h1>

        {/* Search & Notifications */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search"
              className="bg-[#1a1a1a] text-white pl-12 pr-4 py-2.5 rounded-full w-64 lg:w-80 text-sm
                       border border-white/5 focus:border-purple-500/50 focus:outline-none
                       transition-colors placeholder:text-gray-500"
            />
          </div>

          {/* Mobile Search Button */}
          <button className="md:hidden p-2.5 hover:bg-white/5 rounded-full transition-colors">
            <Search size={20} />
          </button>

          {/* Notification Bell */}
          <button className="relative p-2.5 hover:bg-white/5 rounded-full transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
}
