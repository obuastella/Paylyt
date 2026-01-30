"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {
  Plus,
  X,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Calendar,
} from "lucide-react";

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
  saved?: number;
}

export default function TransactionsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  // Form states
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("income");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  // Load transactions and categories from localStorage
  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }

    const savedCategories = localStorage.getItem("savingsCategories");
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  const handleAddTransaction = () => {
    if (!description || !amount || !selectedCategory) {
      alert("Please fill in all fields");
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    // Create new transaction
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      description,
      amount: numAmount,
      type,
      category: selectedCategory,
      date,
      timestamp: new Date(date).getTime(),
    };

    // Update transactions
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

    // Update category saved amount
    const categoryIndex = categories.findIndex(
      (cat) => cat.id === selectedCategory,
    );
    if (categoryIndex !== -1) {
      const updatedCategories = [...categories];
      const currentSaved = updatedCategories[categoryIndex].saved || 0;

      if (type === "income") {
        updatedCategories[categoryIndex].saved = currentSaved + numAmount;
      } else {
        updatedCategories[categoryIndex].saved = Math.max(
          0,
          currentSaved - numAmount,
        );
      }

      setCategories(updatedCategories);
      localStorage.setItem(
        "savingsCategories",
        JSON.stringify(updatedCategories),
      );

      // Dispatch custom event for categories update
      window.dispatchEvent(new Event("categoriesUpdated"));
    }

    // Update balance
    const savedBalance = localStorage.getItem("balance");
    const currentBalance = savedBalance ? parseFloat(savedBalance) : 30000;

    const newBalance =
      type === "expense"
        ? currentBalance - numAmount
        : currentBalance + numAmount;

    localStorage.setItem("balance", newBalance.toString());

    // Dispatch custom event for balance update
    window.dispatchEvent(new Event("balanceUpdated"));
    window.dispatchEvent(new Event("transactionsUpdated"));

    // Reset form
    setDescription("");
    setAmount("");
    setType("income");
    setSelectedCategory("");
    setDate(new Date().toISOString().split("T")[0]);
    setIsModalOpen(false);
  };

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
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold">Transactions</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl transition-all"
              >
                <Plus size={20} />
                Add Transaction
              </button>
            </div>
            <p className="text-gray-400">Track your income and expenses</p>
          </div>

          {/* Transactions List */}
          {transactions.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <Plus size={32} className="text-white/40" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                No transactions yet
              </h3>
              <p className="text-gray-400 mb-6">
                Start tracking your income and expenses
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl transition-all"
              >
                Add Your First Transaction
              </button>
            </div>
          ) : (
            <div className="bg-[#1a1a1a] rounded-2xl border border-white/5">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                        Description
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                        Category
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                        Type
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                        Amount
                      </th>
                      <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">
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
                            border-b border-white/5 hover:bg-white/5 transition-colors
                            ${index === transactions.length - 1 ? "border-b-0" : ""}
                          `}
                        >
                          <td className="py-4 px-6">
                            <span className="text-sm font-medium">
                              {transaction.description}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{category?.icon}</span>
                              <span className="text-sm text-gray-400">
                                {category?.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`
                                inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium
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
                              {transaction.type === "income"
                                ? "Income"
                                : "Expense"}
                            </span>
                          </td>
                          <td className="py-4 px-6">
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
                          <td className="py-4 px-6 text-right">
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
            </div>
          )}
        </main>
      </div>

      {/* Add Transaction Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-2xl p-6 w-full max-w-md border border-white/10">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Add Transaction</h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setDescription("");
                  setAmount("");
                  setType("income");
                  setSelectedCategory("");
                  setDate(new Date().toISOString().split("T")[0]);
                }}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {/* Description */}
              <div>
                <label className="block text-sm text-white/80 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., Grocery shopping"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/20 transition-colors"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm text-white/80 mb-2">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                    ₦
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pl-8 py-3 focus:outline-none focus:border-white/20 transition-colors"
                  />
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm text-white/80 mb-2">Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setType("income")}
                    className={`py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
                      type === "income"
                        ? "bg-green-500/20 border-2 border-green-500/50 text-green-400"
                        : "bg-white/5 border-2 border-transparent hover:bg-white/10"
                    }`}
                  >
                    <TrendingUp size={16} />
                    Income
                  </button>
                  <button
                    onClick={() => setType("expense")}
                    className={`py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
                      type === "expense"
                        ? "bg-red-500/20 border-2 border-red-500/50 text-red-400"
                        : "bg-white/5 border-2 border-transparent hover:bg-white/10"
                    }`}
                  >
                    <TrendingDown size={16} />
                    Expense
                  </button>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm text-white/80 mb-2">
                  Category
                </label>
                {categories.length === 0 ? (
                  <div className="p-4 bg-white/5 rounded-xl text-center">
                    <p className="text-sm text-white/60">
                      No categories available. Create one first!
                    </p>
                  </div>
                ) : (
                  <div className="relative">
                    <button
                      onClick={() =>
                        setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                      }
                      className="w-full flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
                    >
                      {selectedCategory ? (
                        <div className="flex items-center gap-3">
                          <span className="text-xl">
                            {
                              categories.find(
                                (cat) => cat.id === selectedCategory,
                              )?.icon
                            }
                          </span>
                          <span>
                            {
                              categories.find(
                                (cat) => cat.id === selectedCategory,
                              )?.name
                            }
                          </span>
                        </div>
                      ) : (
                        <span className="text-white/40">
                          Choose a category...
                        </span>
                      )}
                      <ChevronDown
                        size={20}
                        className={`transition-transform ${isCategoryDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {isCategoryDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-[#2a2a2a] border border-white/10 rounded-xl overflow-hidden shadow-xl z-10 max-h-48 overflow-y-auto">
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => {
                              setSelectedCategory(category.id);
                              setIsCategoryDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
                          >
                            <span className="text-xl">{category.icon}</span>
                            <span>{category.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm text-white/80 mb-2">Date</label>
                <div className="relative">
                  <Calendar
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                  />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pl-11 py-3 focus:outline-none focus:border-white/20 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setDescription("");
                  setAmount("");
                  setType("income");
                  setSelectedCategory("");
                  setDate(new Date().toISOString().split("T")[0]);
                }}
                className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTransaction}
                disabled={!description || !amount || !selectedCategory}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-white/5 disabled:to-white/5 disabled:text-white/40 rounded-xl transition-all font-medium"
              >
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
