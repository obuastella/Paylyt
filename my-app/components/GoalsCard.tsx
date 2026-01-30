"use client";

import { Plus, MoreVertical } from "lucide-react";

const goals = [
  {
    id: 1,
    name: "Macbook",
    current: 320,
    target: 1600,
    progress: 30,
    image: "💻",
    color: "from-blue-400 to-cyan-400",
  },
  {
    id: 2,
    name: "Travel",
    current: 2000,
    target: 2500,
    progress: 70,
    image: "✈️",
    color: "from-orange-400 to-pink-400",
  },
  {
    id: 3,
    name: "Emergency fund",
    current: 1000,
    target: 5000,
    progress: 20,
    image: "💰",
    color: "from-green-400 to-teal-400",
  },
];

export default function GoalsCard() {
  return (
    <div className="bg-[#1a1a1a] rounded-3xl p-6 border border-white/5 hover:border-white/10 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">My goals</h2>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors group">
            <Plus
              size={20}
              className="group-hover:rotate-90 transition-transform"
            />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="bg-[#0f0f0f] rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              {/* Goal Image */}
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${goal.color} flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform`}
              >
                {goal.image}
              </div>

              {/* Goal Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{goal.name}</h3>
                    <p className="text-xs text-gray-400">
                      ${goal.current.toLocaleString()}/$
                      {goal.target.toLocaleString()}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">
                    Progress: {goal.progress}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${goal.color} rounded-full transition-all duration-500`}
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
