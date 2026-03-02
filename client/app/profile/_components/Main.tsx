"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileTab } from "./profile/ProfileTab";
import { SecurityTab } from "./security/SecurityTab";
import { User } from "@/types";

interface Props {
  user: User;
  editing: boolean;
  setEditing: (v: boolean) => void;
  editingEmail: boolean;
  setEditingEmail: (v: boolean) => void;
  activeTab: "profile" | "security";
  setActiveTab: (v: "profile" | "security") => void;
}

export const Main: React.FC<Props> = ({
  user,
  editing,
  setEditing,
  editingEmail,
  setEditingEmail,
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="lg:col-span-3">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "profile" | "security")} className="w-full">
        <TabsList className="w-full">
          {(["profile", "security"] as const).map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              <span className="capitalize">{tab}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="profile">
          <ProfileTab
            user={user}
            editing={editing}
            setEditing={setEditing}
            editingEmail={editingEmail}
            setEditingEmail={setEditingEmail}
          />
        </TabsContent>

        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
