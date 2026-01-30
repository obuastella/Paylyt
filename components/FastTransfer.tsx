"use client";

import { useState } from "react";
import { MoreVertical, Search, ChevronDown } from "lucide-react";

const contacts = [
  { id: 1, name: "Sarah", color: "from-pink-400 to-red-400" },
  { id: 2, name: "John", color: "from-orange-400 to-yellow-400" },
  { id: 3, name: "Mike", color: "from-green-400 to-teal-400" },
  { id: 4, name: "Emma", color: "from-blue-400 to-cyan-400" },
  { id: 5, name: "Alex", color: "from-purple-400 to-pink-400" },
];

export default function FastTransfer() {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [amount, setAmount] = useState("1,500.00");

  return (
    <div className="bg-[#1a1a1a] rounded-3xl p-6 border border-white/5 hover:border-white/10 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Fast transfer</h2>
        <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Contact Selection */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <button className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
            <Search size={20} />
          </button>

          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`
                  w-12 h-12 rounded-full bg-gradient-to-br ${contact.color} 
                  flex-shrink-0 flex items-center justify-center font-semibold text-sm
                  transition-all hover:scale-110
                  ${selectedContact.id === contact.id ? "ring-4 ring-purple-500/50 scale-110" : "opacity-60"}
                `}
              >
                {contact.name[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Transfer Form */}
      <div className="space-y-4">
        {/* From */}
        <div className="bg-[#0f0f0f] rounded-2xl p-4 border border-white/5">
          <label className="text-xs text-gray-400 block mb-2">From</label>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Visa **** 7609</span>
            <ChevronDown size={18} className="text-gray-400" />
          </div>
        </div>

        {/* To */}
        <div className="bg-[#0f0f0f] rounded-2xl p-4 border border-white/5">
          <label className="text-xs text-gray-400 block mb-2">To</label>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">2203 8760 1276 9965</span>
          </div>
        </div>

        {/* Amount */}
        <div className="bg-[#0f0f0f] rounded-2xl p-4 border border-white/5">
          <label className="text-xs text-gray-400 block mb-2">Amount</label>
          <input
            type="text"
            value={`$${amount}`}
            onChange={(e) => setAmount(e.target.value.replace("$", ""))}
            className="w-full bg-transparent text-lg font-semibold outline-none"
          />
        </div>
      </div>

      {/* Transfer Button */}
      <button
        className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 
                       text-white font-semibold py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]
                       shadow-lg shadow-purple-500/25"
      >
        Transfer
      </button>
    </div>
  );
}
