"use client";

import { Check, LogOut, Mail, Pencil } from "lucide-react";
import Image from "next/image";
import { useProfileUI } from "@/lib/context/Profileuicontext";
import { User } from "@/types";
import React from "react";
import { logout } from "@/lib/actions/auth";

interface Props {
  user: User;
}

export const Sidebar: React.FC<Props> = ({ user }) => {
  const { setEditing, setEditingEmail, setActiveTab } = useProfileUI();
  const [isLoading, startTransition] = React.useTransition();

  const displayName = user ? `${user.firstName} ${user.lastName}`.trim() || user.email : "";
  const initials = user
    ? ((user.firstName?.[0] || "") + (user.lastName?.[0] || "")).toUpperCase() || user.email[0].toUpperCase()
    : "";
  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "";

  return (
    <aside className="lg:col-span-1">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center mb-4">
        <div className="relative inline-block mb-4">
          {user.avatarUrl ? (
            <div className="relative size-24">
              <Image
                src={user.avatarUrl}
                alt={displayName}
                fill
                className="size-full rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-[#5CD6BA] to-[#1C9876] flex items-center justify-center border-4 border-white shadow-md">
              <span className="font-manrope font-bold text-white text-[30px]">{initials}</span>
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#1C9876] rounded-full border-2 border-white flex items-center justify-center">
            <Check className="text-white size-3" />
          </div>
        </div>
        <h2 className="font-manrope font-bold text-[#171717] text-[18px] mb-1">{displayName}</h2>
        <p className="text-[#595959] text-[13px] mb-1">{user.email}</p>
        {joinDate && (
          <div className="flex items-center justify-center gap-1 text-[#595959] text-[12px] mt-3">
            <span>🌿</span>
            <span>Member since {joinDate}</span>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
        <p className="text-[11px] font-inter font-semibold text-[#595959] uppercase tracking-wider mb-3">Account</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1C9876]" />
          <span className="font-inter text-[13px] text-[#171717] truncate">{user.email}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <p className="text-[11px] font-inter font-semibold text-[#595959] uppercase tracking-wider mb-3">
          Quick Actions
        </p>
        <button
          onClick={() => {
            setActiveTab("profile");
            setEditing(true);
          }}
          className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#DEEDEA] text-[14px] text-[#171717] transition-colors flex items-center gap-2 mb-1"
        >
          <Pencil size={16} /> Edit Profile
        </button>
        <button
          onClick={() => {
            setActiveTab("profile");
            setEditingEmail(true);
            setTimeout(
              () => document.getElementById("email-change-section")?.scrollIntoView({ behavior: "smooth" }),
              100,
            );
          }}
          className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#DEEDEA] text-[14px] text-[#171717] transition-colors flex items-center gap-2 mb-1"
        >
          <Mail size={16} /> Change Email
        </button>
        <button
          onClick={() => {
            startTransition(() => {
              logout();
            });
          }}
          className="w-full text-left py-2 px-3 rounded-lg hover:bg-red-50 text-[14px] text-red-500 transition-colors flex items-center gap-2 mt-1"
        >
          <LogOut size={16} /> <span>{isLoading ? "Loging out..." : "Log out"}</span>
        </button>
      </div>
    </aside>
  );
};
