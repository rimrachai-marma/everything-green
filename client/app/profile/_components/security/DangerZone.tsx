"use client";

import { useState } from "react";

export const DangerZone: React.FC = () => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteAccount = async () => {
    alert("Sorry, Not Implimented!");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
      <h3 className="font-manrope font-bold text-red-600 text-[18px] mb-2">Danger Zone</h3>
      <p className="text-[#595959] text-[14px] mb-4">Deleting your account is permanent and cannot be undone.</p>
      {!showDeleteConfirm ? (
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="px-5 py-2.5 bg-red-50 text-red-500 border border-red-200 rounded-full font-inter font-medium text-[14px] hover:bg-red-100 transition-colors"
        >
          Delete Account
        </button>
      ) : (
        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
          <p className="text-red-600 font-medium text-[14px] mb-3">Are you absolutely sure? This cannot be undone.</p>
          <div className="flex gap-3">
            <button
              onClick={handleDeleteAccount}
              className="px-4 py-2 bg-red-500 text-white rounded-full text-[14px] font-medium hover:bg-red-600 transition-colors"
            >
              Yes, delete permanently
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-4 py-2 border border-gray-200 text-[#595959] rounded-full text-[14px] hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
