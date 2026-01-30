"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";

const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

const chartData = [
  { month: "J", income: 2800, expense: 2600 },
  { month: "F", income: 3200, expense: 2900 },
  { month: "M", income: 2900, expense: 3100 },
  { month: "A", income: 3500, expense: 2800 },
  { month: "M", income: 3100, expense: 3300 },
  { month: "J", income: 3800, expense: 3000 },
  { month: "J", income: 3400, expense: 3600 },
  { month: "A", income: 4200, expense: 3900 },
  { month: "S", income: 3600, expense: 3400 },
  { month: "O", income: 4000, expense: 3800 },
  { month: "N", income: 4500, expense: 4100 },
  { month: "D", income: 4800, expense: 4400 },
];

export default function ActivityChart() {
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);
  const maxValue = 5000;

  const hoveredData = hoveredMonth
    ? chartData.find((d) => d.month === hoveredMonth)
    : chartData[7]; // Default to August

  return (
    <div className="bg-[#1a1a1a] rounded-3xl p-6 border border-white/5 hover:border-white/10 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">My activity</h2>
        <button className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm transition-colors">
          <Calendar size={16} />
          <span>2026</span>
        </button>
      </div>

      {/* Chart */}
      <div className="relative mb-4">
        {/* Hover Info Card */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/10 z-10">
          <p className="text-xs text-gray-400 mb-2">August 2024</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-sm">
                Income:{" "}
                <span className="font-semibold">
                  ₦{hoveredData?.income.toLocaleString()}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-sm">
                Expenses:{" "}
                <span className="font-semibold">
                  ₦{hoveredData?.expense.toLocaleString()}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Y-axis labels */}
        <div className="flex items-end gap-3 mb-3 mt-20">
          {chartData.map((data, index) => {
            const incomeHeight = (data.income / maxValue) * 100;
            const expenseHeight = (data.expense / maxValue) * 100;
            const isHovered = hoveredMonth === data.month;

            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center gap-2"
                onMouseEnter={() => setHoveredMonth(data.month)}
                onMouseLeave={() => setHoveredMonth(null)}
              >
                {/* Bars Container */}
                <div className="w-full flex gap-1 items-end h-32">
                  {/* Income Bar */}
                  <div
                    className={`flex-1 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg transition-all ${
                      isHovered ? "opacity-100" : "opacity-60"
                    }`}
                    style={{ height: `${incomeHeight}%` }}
                  />
                  {/* Expense Bar */}
                  <div
                    className={`flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all ${
                      isHovered ? "opacity-100" : "opacity-60"
                    }`}
                    style={{ height: `${expenseHeight}%` }}
                  />
                </div>
                {/* Month Label */}
                <span
                  className={`text-xs ${isHovered ? "text-white font-semibold" : "text-gray-500"}`}
                >
                  {data.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 pt-4 border-t border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500" />
          <span className="text-sm text-gray-400">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-400" />
          <span className="text-sm text-gray-400">Expense</span>
        </div>
      </div>
    </div>
  );
}
