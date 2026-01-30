"use client";

import { ChevronDown } from "lucide-react";

const transactions = [
  {
    id: 1,
    name: "Netflix",
    amount: 12.99,
    card: "**** 6152",
    status: "Complete",
    date: "25 June, 2025",
  },
  {
    id: 2,
    name: "Google Ads",
    amount: 310.5,
    card: "**** 6152",
    status: "Complete",
    date: "24 June, 2025",
  },
  {
    id: 3,
    name: "Uber",
    amount: 18.25,
    card: "**** 7014",
    status: "Cancelled",
    date: "23 June, 2025",
  },
  {
    id: 4,
    name: "Amazon",
    amount: 760.5,
    card: "**** 6152",
    status: "Complete",
    date: "23 June, 2025",
  },
  {
    id: 5,
    name: "eBay",
    amount: 22.5,
    card: "**** 7014",
    status: "Cancelled",
    date: "22 June, 2025",
  },
];

export default function TransactionsTable() {
  return (
    <div className="lg:col-span-2 bg-[#1a1a1a] rounded-3xl p-6 border border-white/5 hover:border-white/10 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Transactions</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm transition-colors">
          <span>All cards</span>
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                Name
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                Amount
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                Card
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                Status
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className={`
                  border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer
                  ${index === transactions.length - 1 ? "border-b-0" : ""}
                `}
              >
                <td className="py-4 px-4">
                  <span className="text-sm font-medium">
                    {transaction.name}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm font-medium">
                    ${transaction.amount}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-gray-400">
                    {transaction.card}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`
                      inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                      ${
                        transaction.status === "Complete"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-red-500/20 text-red-400"
                      }
                    `}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-sm text-gray-400">
                    {transaction.date}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
