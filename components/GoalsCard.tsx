"use client";

import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";

interface Goal {
  id: string;
  name: string;
  current: number;
  target: number;
  icon: string;
}

export default function GoalsCard() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("💰");

  const icons = ["💻", "✈️", "💰", "🏠", "🚗", "📱", "🎓", "💍", "🏖️", "🎮"];

  useEffect(() => {
    const savedGoals = localStorage.getItem("goals");
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }

    const handleUpdate = () => {
      const savedGoals = localStorage.getItem("goals");
      if (savedGoals) {
        setGoals(JSON.parse(savedGoals));
      }
    };

    window.addEventListener("goalsUpdated", handleUpdate);
    return () => window.removeEventListener("goalsUpdated", handleUpdate);
  }, []);

  const handleAddGoal = () => {
    if (!goalName || !targetAmount) {
      alert("Please fill in all fields");
      return;
    }

    const target = parseFloat(targetAmount);
    if (isNaN(target) || target <= 0) {
      alert("Please enter a valid target amount");
      return;
    }

    const newGoal: Goal = {
      id: Date.now().toString(),
      name: goalName,
      current: 0,
      target,
      icon: selectedIcon,
    };

    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    window.dispatchEvent(new Event("goalsUpdated"));

    setGoalName("");
    setTargetAmount("");
    setSelectedIcon("💰");
    setIsModalOpen(false);
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Saving goals</h2>
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

        {goals.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400 text-sm mb-4">No savings goals yet</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-sm text-white/80 hover:text-white"
            >
              Create your first goal
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {goals.map((goal) => {
              const progress = (goal.current / goal.target) * 100;
              return (
                <div
                  key={goal.id}
                  className="bg-[#0f0f0f] rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl flex-shrink-0">
                      {goal.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-sm mb-1">
                            {goal.name}
                          </h3>
                          <p className="text-xs text-gray-400">
                            {formatCurrency(goal.current)}/
                            {formatCurrency(goal.target)}
                          </p>
                        </div>
                        <span className="text-xs text-gray-400">
                          {progress.toFixed(0)}%
                        </span>
                      </div>

                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Goal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-2xl p-6 w-full max-w-md border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">New Saving Goal</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/80 mb-2">
                  Goal Name
                </label>
                <input
                  type="text"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  placeholder="e.g., New Laptop"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/20 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-white/80 mb-2">
                  Target Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                    ₦
                  </span>
                  <input
                    type="number"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pl-8 py-3 focus:outline-none focus:border-white/20 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/80 mb-2">Icon</label>
                <div className="grid grid-cols-5 gap-2">
                  {icons.map((icon) => (
                    <button
                      key={icon}
                      onClick={() => setSelectedIcon(icon)}
                      className={`p-3 rounded-xl text-2xl transition-all ${
                        selectedIcon === icon
                          ? "bg-white/20 border-2 border-white"
                          : "bg-white/5 border-2 border-transparent hover:bg-white/10"
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddGoal}
                disabled={!goalName || !targetAmount}
                className="flex-1 py-3 px-4 bg-white hover:bg-white/90 text-black disabled:bg-white/5 disabled:text-white/40 rounded-xl transition-colors font-medium"
              >
                Create Goal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
