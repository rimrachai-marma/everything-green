"use client";

import { PersonalInformation } from "./PersonalInformation";
import { Email } from "./Email";
import { User } from "@/types";

interface Props {
  user: User;
  editing: boolean;
  setEditing: (v: boolean) => void;
  editingEmail: boolean;
  setEditingEmail: (v: boolean) => void;
}

export const ProfileTab: React.FC<Props> = ({ user, editing, setEditing, editingEmail, setEditingEmail }) => {
  return (
    <div className="mt-0 space-y-6">
      <PersonalInformation user={user} editing={editing} setEditing={setEditing} />
      <Email user={user} editingEmail={editingEmail} setEditingEmail={setEditingEmail} />
    </div>
  );
};
