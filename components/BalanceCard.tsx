"use client";

import { Plus, ArrowRight, X, Edit2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function BalanceCard() {
  const [balance, setBalance] = useState(30000);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editAmount, setEditAmount] = useState("");

  // Load balance from localStorage
  const loadBalance = () => {
    const savedBalance = localStorage.getItem("balance");
    if (savedBalance) {
      setBalance(parseFloat(savedBalance));
    } else {
      localStorage.setItem("balance", "30000");
      setBalance(30000);
    }
  };

  useEffect(() => {
    loadBalance();

    // Listen for custom event
    const handleBalanceUpdate = () => {
      loadBalance();
    };

    window.addEventListener("balanceUpdated", handleBalanceUpdate);

    // Also check on visibility change (when tab becomes visible)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadBalance();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Poll every 500ms to catch updates
    const interval = setInterval(loadBalance, 500);

    return () => {
      window.removeEventListener("balanceUpdated", handleBalanceUpdate);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(interval);
    };
  }, []);

  const handleTopUp = () => {
    const amount = parseFloat(topUpAmount);
    if (!isNaN(amount) && amount > 0) {
      const newBalance = balance + amount;
      setBalance(newBalance);
      localStorage.setItem("balance", newBalance.toString());
      window.dispatchEvent(new Event("balanceUpdated"));
      setTopUpAmount("");
      setIsModalOpen(false);
    }
  };

  const handleEdit = () => {
    const amount = parseFloat(editAmount);
    if (!isNaN(amount) && amount >= 0) {
      setBalance(amount);
      localStorage.setItem("balance", amount.toString());
      window.dispatchEvent(new Event("balanceUpdated"));
      setEditAmount("");
      setIsEditing(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <div className="bg-[#1a1a1a] rounded-3xl p-6 border border-white/5 hover:border-white/10 transition-all">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Balance</h2>
          <div className="flex items-center gap-4">
            <h2>Top up</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors group"
            >
              <Plus
                size={20}
                className="group-hover:rotate-90 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* Total Balance */}
        <div className="mb-8 flex items-center gap-3">
          <p className="text-5xl font-bold tracking-tight mb-1">
            {formatCurrency(balance)}
          </p>
          <button
            onClick={() => {
              setEditAmount(balance.toString());
              setIsEditing(true);
            }}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <Edit2 size={14} />
          </button>
        </div>

        {/* Savings Motivation Card */}
        <div className="relative group cursor-pointer">
          <div className="relative rounded-2xl p-6 overflow-hidden bg-white/5 border border-white/10">
            {/* Card Content */}
            <div className="relative">
              {/* Quote */}
              <div className="mb-6">
                <p className="text-lg font-medium text-white/95 leading-relaxed mb-2">
                  "A penny saved is a penny earned"
                </p>
                <p className="text-sm text-white/70">— Benjamin Franklin</p>
              </div>

              {/* Action */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/80">
                  Start your savings journey
                </p>
                <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors group">
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Up Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-2xl p-6 w-full max-w-md border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Top Up Balance</h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setTopUpAmount("");
                }}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mb-6 p-4 bg-white/5 rounded-xl">
              <p className="text-sm text-white/60 mb-1">Current Balance</p>
              <p className="text-2xl font-bold">{formatCurrency(balance)}</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-white/80 mb-2">
                Top Up Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                  ₦
                </span>
                <input
                  type="number"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pl-8 py-3 focus:outline-none focus:border-white/20 transition-colors"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleTopUp();
                  }}
                />
              </div>
              {topUpAmount && !isNaN(parseFloat(topUpAmount)) && (
                <p className="text-sm text-white/60 mt-2">
                  New balance:{" "}
                  {formatCurrency(balance + parseFloat(topUpAmount))}
                </p>
              )}
            </div>

            <div className="mb-6">
              <p className="text-sm text-white/60 mb-3">Quick amounts</p>
              <div className="grid grid-cols-3 gap-2">
                {[5000, 10000, 20000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setTopUpAmount(amount.toString())}
                    className="py-2 px-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm"
                  >
                    ₦{amount.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setTopUpAmount("");
                }}
                className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleTopUp}
                disabled={!topUpAmount || parseFloat(topUpAmount) <= 0}
                className="flex-1 py-3 px-4 bg-white hover:bg-white/90 text-black disabled:bg-white/5 disabled:text-white/40 rounded-xl transition-colors font-medium"
              >
                Add Funds
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Balance Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-2xl p-6 w-full max-w-md border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Edit Balance</h3>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditAmount("");
                }}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <p className="text-sm text-yellow-200/80">
                ⚠️ You're editing the total balance directly. This will override
                the current value.
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-white/80 mb-2">
                New Balance
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                  ₦
                </span>
                <input
                  type="number"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pl-8 py-3 focus:outline-none focus:border-white/20 transition-colors"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleEdit();
                  }}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditAmount("");
                }}
                className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                disabled={
                  !editAmount ||
                  parseFloat(editAmount) < 0 ||
                  isNaN(parseFloat(editAmount))
                }
                className="flex-1 py-3 px-4 bg-white hover:bg-white/90 text-black disabled:bg-white/5 disabled:text-white/40 rounded-xl transition-colors font-medium"
              >
                Update Balance
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
