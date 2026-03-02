"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Main } from "./Main";
import { ProfileUIProvider } from "@/lib/context/Profileuicontext";
import { User } from "@/types";

interface Props {
  user: User;
}

export default function ProfileClient({ user }: Props) {
  const [editing, setEditing] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");

  return (
    <ProfileUIProvider value={{ setEditing, setEditingEmail, setActiveTab }}>
      <div className="min-h-screen flex flex-col bg-[#F0F2F1]">
        {/* Banner */}
        <div className="bg-linear-to-r from-[#1C9876] to-[#5CD6BA] h-44 relative overflow-hidden" />

        <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 pb-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Sidebar user={user} />
            <Main
              user={user}
              editing={editing}
              setEditing={setEditing}
              editingEmail={editingEmail}
              setEditingEmail={setEditingEmail}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
        </main>
      </div>
    </ProfileUIProvider>
  );
}
