"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {
  Plus,
  X,
  ChevronDown,
  AlertCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  saved?: number;
}

interface Transaction {
  type: "income" | "expense";
  category: string;
  amount: number;
}

export default function BudgetPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [budgetLimit, setBudgetLimit] = useState("");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  useEffect(() => {
    loadData();

    const handleUpdate = () => loadData();
    window.addEventListener("transactionsUpdated", handleUpdate);
    window.addEventListener("categoriesUpdated", handleUpdate);

    return () => {
      window.removeEventListener("transactionsUpdated", handleUpdate);
      window.removeEventListener("categoriesUpdated", handleUpdate);
    };
  }, []);

  const loadData = () => {
    // Load categories
    const savedCategories = localStorage.getItem("savingsCategories");
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }

    // Load budgets
    const savedBudgets = localStorage.getItem("budgets");
    if (savedBudgets) {
      const parsedBudgets = JSON.parse(savedBudgets);

      // Calculate spent amount from transactions
      const transactions: Transaction[] = JSON.parse(
        localStorage.getItem("transactions") || "[]",
      );

      const updatedBudgets = parsedBudgets.map((budget: Budget) => {
        const spent = transactions
          .filter((t) => t.type === "expense" && t.category === budget.category)
          .reduce((sum, t) => sum + t.amount, 0);
        return { ...budget, spent };
      });

      setBudgets(updatedBudgets);
    }
  };

  const handleAddBudget = () => {
    if (!selectedCategory || !budgetLimit) {
      alert("Please fill in all fields");
      return;
    }

    const limit = parseFloat(budgetLimit);
    if (isNaN(limit) || limit <= 0) {
      alert("Please enter a valid budget limit");
      return;
    }

    // Check if budget already exists for this category
    if (budgets.some((b) => b.category === selectedCategory)) {
      alert("Budget already exists for this category!");
      return;
    }

    const newBudget: Budget = {
      id: Date.now().toString(),
      category: selectedCategory,
      limit,
      spent: 0,
    };

    const updatedBudgets = [...budgets, newBudget];
    setBudgets(updatedBudgets);
    localStorage.setItem("budgets", JSON.stringify(updatedBudgets));

    setSelectedCategory("");
    setBudgetLimit("");
    setIsModalOpen(false);
  };

  const handleDeleteBudget = (budgetId: string) => {
    if (confirm("Are you sure you want to delete this budget?")) {
      const updatedBudgets = budgets.filter((b) => b.id !== budgetId);
      setBudgets(updatedBudgets);
      localStorage.setItem("budgets", JSON.stringify(updatedBudgets));
    }
  };

  const getCategoryDetails = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getAvailableCategories = () => {
    return categories.filter(
      (cat) => !budgets.some((b) => b.category === cat.id),
    );
  };

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const remaining = totalBudget - totalSpent;

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
              <h1 className="text-3xl font-bold">Budget</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-white/90 text-black rounded-xl transition-all"
              >
                <Plus size={20} />
                Set Budget
              </button>
            </div>
            <p className="text-gray-400">
              Track your spending against your budget
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5">
              <p className="text-sm text-gray-400 mb-2">Total Budget</p>
              <p className="text-3xl font-bold">
                {formatCurrency(totalBudget)}
              </p>
            </div>
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5">
              <p className="text-sm text-gray-400 mb-2">Total Spent</p>
              <p className="text-3xl font-bold text-red-400">
                {formatCurrency(totalSpent)}
              </p>
            </div>
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5">
              <p className="text-sm text-gray-400 mb-2">Remaining</p>
              <p
                className={`text-3xl font-bold ${remaining < 0 ? "text-red-400" : "text-green-400"}`}
              >
                {formatCurrency(remaining)}
              </p>
            </div>
          </div>

          {/* Budgets List */}
          {budgets.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <Plus size={32} className="text-white/40" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No budgets set</h3>
              <p className="text-gray-400 mb-6">
                Start by setting a budget for a category
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-white hover:bg-white/90 text-black rounded-xl transition-all"
              >
                Set Your First Budget
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {budgets.map((budget) => {
                const category = getCategoryDetails(budget.category);
                const percentage = (budget.spent / budget.limit) * 100;
                const isOverBudget = budget.spent > budget.limit;

                return (
                  <div
                    key={budget.id}
                    className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl">
                          {category?.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold">{category?.name}</h3>
                          <p className="text-sm text-gray-400">
                            {formatCurrency(budget.spent)} /{" "}
                            {formatCurrency(budget.limit)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteBudget(budget.id)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Delete
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-2">
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            isOverBudget ? "bg-red-500" : "bg-white"
                          }`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span
                        className={
                          isOverBudget ? "text-red-400" : "text-gray-400"
                        }
                      >
                        {percentage.toFixed(0)}% used
                      </span>
                      {isOverBudget && (
                        <span className="flex items-center gap-1 text-red-400">
                          <AlertCircle size={14} />
                          Over budget by{" "}
                          {formatCurrency(budget.spent - budget.limit)}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Add Budget Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-2xl p-6 w-full max-w-md border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Set Budget</h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedCategory("");
                  setBudgetLimit("");
                }}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Category Selection */}
              <div>
                <label className="block text-sm text-white/80 mb-2">
                  Category
                </label>
                {getAvailableCategories().length === 0 ? (
                  <div className="p-4 bg-white/5 rounded-xl text-center">
                    <p className="text-sm text-white/60">
                      All categories have budgets set!
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
                        {getAvailableCategories().map((category) => (
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

              {/* Budget Limit */}
              <div>
                <label className="block text-sm text-white/80 mb-2">
                  Budget Limit
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                    ₦
                  </span>
                  <input
                    type="number"
                    value={budgetLimit}
                    onChange={(e) => setBudgetLimit(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pl-8 py-3 focus:outline-none focus:border-white/20 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedCategory("");
                  setBudgetLimit("");
                }}
                className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBudget}
                disabled={!selectedCategory || !budgetLimit}
                className="flex-1 py-3 px-4 bg-white hover:bg-white/90 text-black disabled:bg-white/5 disabled:text-white/40 rounded-xl transition-colors font-medium"
              >
                Set Budget
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
