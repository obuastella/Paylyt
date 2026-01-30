"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  Users,
  RefreshCw,
  UserCircle,
  MessageCircle,
  Settings,
  Menu,
  X,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: CreditCard, label: "Cards", href: "/cards" },
  { icon: Users, label: "Contacts", href: "/contacts" },
  { icon: RefreshCw, label: "Transactions", href: "/transactions" },
  { icon: UserCircle, label: "Profile", href: "/profile" },
  { icon: MessageCircle, label: "Messages", href: "/messages" },
];

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-50
          bg-[#0f0f0f] border-r border-white/5
          transition-all duration-300 ease-in-out
          ${collapsed ? "-translate-x-full lg:translate-x-0 lg:w-20" : "translate-x-0 w-64"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Toggle */}
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            {!collapsed && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C57CF9] flex items-center justify-center">
                  <span className="text-lg font-bold">P</span>
                </div>
                <span className="font-semibold text-lg">Paylyt</span>
              </div>
            )}

            <button
              onClick={onToggle}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              {collapsed ? <Menu size={20} /> : <X size={20} />}
            </button>
          </div>

          {/* User Profile */}
          <div
            className={`p-6 border-b border-white/5 ${collapsed ? "flex justify-center" : ""}`}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 overflow-hidden">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0f0f0f]" />
              </div>

              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">Aliya Garrison</p>
                  <p className="text-xs text-gray-400 truncate">
                    aliya@email.com
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-200
                    ${collapsed ? "justify-center" : ""}
                    ${
                      isActive
                        ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  <Icon
                    size={20}
                    className={isActive ? "text-purple-400" : ""}
                  />
                  {!collapsed && (
                    <span className="font-medium text-sm">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Settings */}
          <div className="p-4 border-t border-white/5">
            <Link
              href="/settings"
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl
                text-gray-400 hover:text-white hover:bg-white/5
                transition-colors
                ${collapsed ? "justify-center" : ""}
              `}
            >
              <Settings size={20} />
              {!collapsed && (
                <span className="font-medium text-sm">Settings</span>
              )}
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
