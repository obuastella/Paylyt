'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Settings as SettingsIcon } from 'lucide-react';

export default function SettingsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
              <SettingsIcon size={48} />
            </div>
            <h1 className="text-4xl font-bold mb-4">Settings</h1>
            <p className="text-gray-400 text-lg">Configure your application preferences</p>
          </div>
        </main>
      </div>
    </div>
  );
}
