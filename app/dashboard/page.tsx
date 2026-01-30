"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import BalanceCard from "@/components/BalanceCard";
import ActivityChart from "@/components/ActivityChart";
import FastTransfer from "@/components/FastTransfer";
import GoalsCard from "@/components/GoalsCard";
import TransactionsTable from "@/components/TransactionsTable";

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto">
            {/* Top Row - Balance, Activity, Fast Transfer */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <BalanceCard />
              <ActivityChart />
            </div>

            {/* Bottom Row - Goals and Transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <GoalsCard />
              <TransactionsTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
