// components/TransactionsTable.tsx
"use client";

import { useState, useEffect } from "react";
import { Plus, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
  timestamp: number;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
      const allTransactions = JSON.parse(savedTransactions);
      // Get only the first 5 transactions
      setTransactions(allTransactions.slice(0, 5));
    }

    const savedCategories = localStorage.getItem("savingsCategories");
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getCategoryDetails = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId);
  };

  return (
    <div className="lg:col-span-2 bg-[#1a1a1a] rounded-3xl p-6 border border-white/5 hover:border-white/10 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Recent Transactions</h2>
        <Link
          href="/transactions"
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm transition-colors group"
        >
          <span>View All</span>
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      {/* Table or Empty State */}
      {transactions.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
            <Plus size={24} className="text-white/40" />
          </div>
          <p className="text-gray-400 mb-4">No transactions yet</p>
          <Link
            href="/transactions"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl text-sm transition-all"
          >
            <Plus size={16} />
            Add Transaction
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Description
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Category
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Type
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Amount
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => {
                const category = getCategoryDetails(transaction.category);
                return (
                  <tr
                    key={transaction.id}
                    className={`
                      border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer
                      ${index === transactions.length - 1 ? "border-b-0" : ""}
                    `}
                  >
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium">
                        {transaction.description}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{category?.icon}</span>
                        <span className="text-sm text-gray-400">
                          {category?.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`
                          inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                          ${
                            transaction.type === "income"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }
                        `}
                      >
                        {transaction.type === "income" ? (
                          <TrendingUp size={12} />
                        ) : (
                          <TrendingDown size={12} />
                        )}
                        {transaction.type === "income" ? "Income" : "Expense"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`text-sm font-medium ${
                          transaction.type === "income"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-sm text-gray-400">
                        {formatDate(transaction.date)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
