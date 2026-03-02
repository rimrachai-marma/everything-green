"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { User } from "@/types";
import { Mail } from "lucide-react";
import { EmailFormData, emailSchema } from "@/lib/schemas/user";
import { updateEmail } from "@/lib/actions/user";
import { useRouter } from "next/navigation";

interface Props {
  user: User;
  editingEmail: boolean;
  setEditingEmail: (v: boolean) => void;
}

export const Email: React.FC<Props> = ({ user, editingEmail, setEditingEmail }) => {
  const router = useRouter();

  const [emailSent, setEmailSent] = useState(false);

  const [state, formAction, isPending] = React.useActionState(updateEmail, null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { newEmail: "" },
  });

  console.log(state);

  React.useEffect(() => {
    if (state?.status === "success") {
      setEmailSent(true);
      reset();
      router.push("/profile");
    }
  }, [state, router, setEmailSent, reset]);

  const onSubmit = async (data: EmailFormData) => {
    React.startTransition(() => {
      formAction(data);
    });
  };

  const handleCancel = () => {
    setEditingEmail(false);
    setEmailSent(false);
    reset();
  };

  return (
    <div id="email-change-section" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#DEEDEA] flex items-center justify-center text-[18px]">
            <Mail className="text-primary" />
          </div>
          <h3 className="font-manrope font-bold text-[#171717] text-[18px]">Email</h3>
        </div>
        {!editingEmail && !emailSent && (
          <button
            onClick={() => setEditingEmail(true)}
            className="px-5 py-2 border-2 border-[#1C9876] text-[#1C9876] font-manrope font-bold text-[14px] rounded-full hover:bg-[#1C9876] hover:text-white transition-all"
          >
            Change Email
          </button>
        )}
      </div>

      <p className="font-medium text-[#171717] text-[13px] ml-12 mb-5">{user.email}</p>

      {emailSent && (
        <div className="ml-12 bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
          <span className="text-[20px] mt-0.5">📬</span>
          <div>
            <p className="font-manrope font-bold text-green-700 text-[14px]">Verification email sent!</p>
            <p className="text-green-600 text-[13px] mt-1">
              We sent a confirmation link to your new email. Click the link to complete the change.
              <span className="text-orange-300">(Not inplimented, now direct change)</span>
            </p>
            <button
              onClick={handleCancel}
              className="mt-3 text-[13px] text-[#1C9876] underline underline-offset-2 hover:text-[#167a60]"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {editingEmail && !emailSent && (
        <form onSubmit={handleSubmit(onSubmit)} className="ml-12 space-y-4 max-w-md" noValidate>
          <div className="border-t border-dashed border-gray-200 mb-2" />
          <div>
            <label className="block font-inter font-medium text-[14px] text-[#171717] mb-2">New Email Address</label>
            <input
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              {...register("newEmail")}
              className={`w-full h-11 px-4 rounded-xl border border-gray-200 font-inter text-[14px] focus:outline-none focus:border-[#1C9876] focus:ring-2 focus:ring-[#1C9876]/20 transition-all ${errors.newEmail ? "border-red-400" : ""}`}
            />
            {errors.newEmail && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 mt-2">
                <span className="text-red-400 text-[16px]">⚠️</span>
                <p className="text-red-600 text-[13px]">{errors.newEmail.message}</p>
              </div>
            )}
          </div>

          <p className="text-[12px] text-[#9CA3AF] leading-relaxed">
            A verification link will be sent to your new email address. Your email will only update after you click that
            link.
          </p>

          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2.5 bg-[#1C9876] text-white font-manrope font-bold text-[14px] rounded-full hover:bg-[#167a60] disabled:opacity-70 flex items-center gap-2 transition-colors"
            >
              {isPending ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending…
                </>
              ) : (
                "Send Verification"
              )}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-[14px] text-[#595959] border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
