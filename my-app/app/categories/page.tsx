"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Plus, Trash2, X, ChevronDown } from "lucide-react";

// Predefined category options with icons
const CATEGORY_OPTIONS = [
  {
    id: "groceries",
    name: "Groceries",
    icon: "🛒",
  },
  {
    id: "salary",
    name: "Salary",
    icon: "💰",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: "🎮",
  },
  {
    id: "transport",
    name: "Transport",
    icon: "🚗",
  },
  {
    id: "bills",
    name: "Bills",
    icon: "📄",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: "🏥",
  },
  {
    id: "education",
    name: "Education",
    icon: "📚",
  },
  {
    id: "shopping",
    name: "Shopping",
    icon: "🛍️",
  },
  {
    id: "dining",
    name: "Dining",
    icon: "🍽️",
  },
  {
    id: "travel",
    name: "Travel",
    icon: "✈️",
  },
  {
    id: "fitness",
    name: "Fitness",
    icon: "💪",
  },
  {
    id: "subscriptions",
    name: "Subscriptions",
    icon: "📱",
  },
];

// Default categories
const DEFAULT_CATEGORIES = [
  CATEGORY_OPTIONS[0], // Groceries
  CATEGORY_OPTIONS[1], // Salary
  CATEGORY_OPTIONS[2], // Entertainment
  CATEGORY_OPTIONS[3], // Transport
  CATEGORY_OPTIONS[4], // Bills
];

interface Category {
  id: string;
  name: string;
  icon: string;
  saved?: number;
}

export default function CardsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Load categories from localStorage on mount
  useEffect(() => {
    const loadCategories = () => {
      const savedCategories = localStorage.getItem("savingsCategories");
      if (savedCategories) {
        setCategories(JSON.parse(savedCategories));
      } else {
        // Set default categories
        setCategories(DEFAULT_CATEGORIES);
        localStorage.setItem(
          "savingsCategories",
          JSON.stringify(DEFAULT_CATEGORIES),
        );
      }
    };

    loadCategories();

    const handleCategoriesUpdate = () => {
      loadCategories();
    };

    window.addEventListener("categoriesUpdated", handleCategoriesUpdate);

    return () => {
      window.removeEventListener("categoriesUpdated", handleCategoriesUpdate);
    };
  }, []);

  // Save categories to localStorage whenever they change
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem("savingsCategories", JSON.stringify(categories));
    }
  }, [categories]);

  const handleAddCategory = () => {
    if (!selectedCategory) return;

    const categoryToAdd = CATEGORY_OPTIONS.find(
      (cat) => cat.id === selectedCategory,
    );
    if (!categoryToAdd) return;

    // Check if category already exists
    if (categories.some((cat) => cat.id === categoryToAdd.id)) {
      alert("This category already exists!");
      return;
    }

    setCategories([...categories, { ...categoryToAdd, saved: 0 }]);
    setSelectedCategory("");
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    window.dispatchEvent(new Event("categoriesUpdated"));
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((cat) => cat.id !== categoryId));
      window.dispatchEvent(new Event("categoriesUpdated"));
    }
  };

  // Get available categories (not already added)
  const availableCategories = CATEGORY_OPTIONS.filter(
    (option) => !categories.some((cat) => cat.id === option.id),
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
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
              <h1 className="text-3xl font-bold">Savings Categories</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-white/90 text-black rounded-xl transition-all"
              >
                <Plus size={20} />
                Add Category
              </button>
            </div>
            <p className="text-gray-400">
              Organize your savings into different categories
            </p>
          </div>

          {/* Categories Grid */}
          {categories.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <Plus size={32} className="text-white/40" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No categories yet</h3>
              <p className="text-gray-400 mb-6">
                Start by adding your first savings category
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-white hover:bg-white/90 text-black rounded-xl transition-all"
              >
                Add Your First Category
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category) => {
                const saved = category.saved || 0;
                const goal = 100000;
                const progress = Math.min((saved / goal) * 100, 100);

                return (
                  <div
                    key={category.id}
                    className="group relative bg-[#1a1a1a] rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all"
                  >
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 size={14} className="text-red-400" />
                    </button>

                    {/* Category Icon */}
                    <div className="w-16 h-16 mb-4 rounded-2xl bg-white/5 flex items-center justify-center text-3xl">
                      {category.icon}
                    </div>

                    {/* Category Name */}
                    <h3 className="text-xl font-semibold mb-2">
                      {category.name}
                    </h3>

                    {/* Stats */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Saved</span>
                        <span className="font-medium">
                          {formatCurrency(saved)}
                        </span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{progress.toFixed(0)}% of goal</span>
                        <span>₦{goal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Add Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-2xl p-6 w-full max-w-md border border-white/10">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Add Category</h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedCategory("");
                  setIsDropdownOpen(false);
                }}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Category Selection */}
            <div className="mb-6">
              <label className="block text-sm text-white/80 mb-2">
                Select Category
              </label>

              {availableCategories.length === 0 ? (
                <div className="p-4 bg-white/5 rounded-xl text-center">
                  <p className="text-sm text-white/60">
                    All available categories have been added!
                  </p>
                </div>
              ) : (
                <div className="relative">
                  {/* Dropdown Button */}
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
                  >
                    {selectedCategory ? (
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {
                            CATEGORY_OPTIONS.find(
                              (cat) => cat.id === selectedCategory,
                            )?.icon
                          }
                        </span>
                        <span>
                          {
                            CATEGORY_OPTIONS.find(
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
                      className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-[#2a2a2a] border border-white/10 rounded-xl overflow-hidden shadow-xl z-10 max-h-64 overflow-y-auto">
                      {availableCategories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
                        >
                          <span className="text-2xl">{category.icon}</span>
                          <span>{category.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Preview */}
            {selectedCategory && (
              <div className="mb-6">
                <p className="text-sm text-white/60 mb-3">Preview</p>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl">
                      {
                        CATEGORY_OPTIONS.find(
                          (cat) => cat.id === selectedCategory,
                        )?.icon
                      }
                    </div>
                    <div>
                      <h4 className="font-semibold">
                        {
                          CATEGORY_OPTIONS.find(
                            (cat) => cat.id === selectedCategory,
                          )?.name
                        }
                      </h4>
                      <p className="text-sm text-white/60">Saved: ₦0</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedCategory("");
                  setIsDropdownOpen(false);
                }}
                className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                disabled={!selectedCategory || availableCategories.length === 0}
                className="flex-1 py-3 px-4 bg-white hover:bg-white/90 text-black disabled:bg-white/5 disabled:text-white/40 rounded-xl transition-all font-medium"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
