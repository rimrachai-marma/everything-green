import React from "react";
import { Password } from "./Password";
import { DangerZone } from "./DangerZone";

export const SecurityTab: React.FC = () => {
  return (
    <div className="mt-0 space-y-6">
      <Password />
      <DangerZone />
    </div>
  );
};
