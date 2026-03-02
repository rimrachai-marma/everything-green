"use client";

import { createContext, useContext } from "react";

interface ProfileUIContextValue {
  setEditing: (v: boolean) => void;
  setEditingEmail: (v: boolean) => void;
  setActiveTab: (v: "profile" | "security") => void;
}

const ProfileUIContext = createContext<ProfileUIContextValue | null>(null);

export const useProfileUI = () => {
  const ctx = useContext(ProfileUIContext);
  if (!ctx) throw new Error("useProfileUI must be used within ProfileUIProvider");
  return ctx;
};

export const ProfileUIProvider = ProfileUIContext.Provider;
