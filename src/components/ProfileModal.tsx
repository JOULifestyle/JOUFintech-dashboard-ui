import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../stores/authStore";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user, updateProfile } = useAuthStore();
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || ''
  });

  // Update form data when user changes or modal opens
  useEffect(() => {
    if (isOpen && user) {
      setFormData({
        name: user.displayName || '',
        email: user.email || ''
      });
    }
  }, [isOpen, user]);

  const handleSave = () => {
    if (formData.name !== user?.displayName || formData.email !== user?.email) {
      updateProfile({
        displayName: formData.name,
        email: formData.email
      });
      console.log('Profile updated:', formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-lg flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-gray-100 dark:border-gray-700"
      >
        {/* Header with gradient background */}
        <div className="bg-linear-to-r from-joublue to-joupurple rounded-xl p-6 -m-8 mb-6 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">Profile Information</h3>
                <p className="text-joublue-100 text-sm">Update your personal details</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Profile Avatar */}
        <div className="flex justify-center -mt-8 mb-6">
          <div className="w-20 h-20 bg-linear-to-r from-joublue to-joupurple rounded-full flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg">
            {(user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U').toUpperCase()}
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
            <div className="relative">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-joublue focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-600"
                placeholder="Enter your full name"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-joublue focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-600"
                placeholder="Enter your email"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 bg-linear-to-r from-joublue to-joupurple text-white rounded-xl hover:from-joublue/90 hover:to-joupurple/90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
}
