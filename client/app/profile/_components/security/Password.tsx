"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordFormData, passwordSchema } from "@/lib/schemas/auth";
import { changePassword } from "@/lib/actions/auth";
import React from "react";

export const Password: React.FC = () => {
  const [state, formAction, isPending] = React.useActionState(changePassword, null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  React.useEffect(() => {
    if (state?.status === "success") {
      reset();
    }
  }, [state, reset]);

  const onSubmit = async (data: PasswordFormData) => {
    React.startTransition(() => {
      formAction(data);
    });
  };

  console.log(state);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="font-manrope font-bold text-[#171717] text-[20px] mb-6">Change Password</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-md" noValidate>
        {(
          [
            { label: "Current Password", key: "currentPassword" },
            { label: "New Password", key: "newPassword" },
            { label: "Confirm New Password", key: "confirmPassword" },
          ] as const
        ).map(({ label, key }) => (
          <div key={key}>
            <label className="block font-inter font-medium text-[14px] text-[#171717] mb-2">{label}</label>
            <input
              type="password"
              {...register(key)}
              className={`w-full h-11 px-4 rounded-xl border border-gray-200 font-inter text-[14px] focus:outline-none focus:border-[#1C9876] focus:ring-2 focus:ring-[#1C9876]/20 transition-all ${errors[key] ? "border-red-400" : ""}`}
            />
            {errors[key] && <p className="text-red-500 text-[12px] mt-1">{errors[key]?.message}</p>}
          </div>
        ))}
        <p className="text-[12px] text-[#595959]">
          Requirements: 8–16 chars, uppercase & lowercase, number & special character.
        </p>
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 bg-[#1C9876] text-white font-manrope font-bold text-[14px] rounded-full hover:bg-[#167a60] disabled:opacity-70 flex items-center gap-2"
        >
          {isPending && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          Update Password
        </button>
      </form>
    </div>
  );
};
