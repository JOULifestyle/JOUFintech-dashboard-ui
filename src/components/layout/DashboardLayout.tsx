import type { ReactNode } from "react";
import CommandPalette from "../CommandPalette";
import ProfileDropdown from "../ProfileDropdown";
import NotificationDropdown from "../NotificationDropdown";
import { useAuthStore } from "../../stores/authStore";

type Props = { children: ReactNode };

export default function DashboardLayout({ children }: Props) {
  const { user } = useAuthStore();

  return (
    <>
      {/* Command Palette */}
      <CommandPalette />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="flex h-screen flex-col">
          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Nav */}
            <header className="flex justify-between items-center p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-4">
                {/* Profile Dropdown */}
                <ProfileDropdown />
                {/* 'J' Logo */}
                <div className="w-8 h-8 bg-linear-to-br from-joublue to-joupurple rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">J</span>
                </div>
              </div>

              {/* Welcome message in the middle */}
              <div className="flex-1 text-center">
                {user && (
                  <h1 className="text-lg font-medium text-gray-900 dark:text-white">
                    Hi, {user.displayName?.split(' ')[0] || user.email?.split('@')[0] || 'User'}! 👋
                  </h1>
                )}
              </div>

              <div className="flex items-center gap-4">
                {/* Notification Dropdown */}
                <NotificationDropdown />
              </div>
            </header>

            {/* Page Content */}
            <main className="flex-1 p-6 overflow-auto">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
