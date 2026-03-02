"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/types";
import { ProfileFormData, profileSchema } from "@/lib/schemas/user";
import { updateUser } from "@/lib/actions/user";
import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  user: User;
  editing: boolean;
  setEditing: (v: boolean) => void;
}

export const PersonalInformation: React.FC<Props> = ({ user, editing, setEditing }) => {
  const router = useRouter();

  const [state, formAction, isPending] = React.useActionState(updateUser, null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio ?? "",
    },
  });

  React.useEffect(() => {
    if (state?.status === "success") {
      setEditing(false);
      router.push("/profile");
    }
  }, [state, router, setEditing]);

  const onSubmit = async (data: ProfileFormData) => {
    React.startTransition(() => {
      formAction(data);
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-manrope font-bold text-[#171717] text-[20px]">Personal Information</h3>

        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="px-5 py-2 border-2 border-[#1C9876] text-[#1C9876] font-manrope font-bold text-[14px] rounded-full hover:bg-[#1C9876] hover:text-white transition-all"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setEditing(false);
                reset();
              }}
              className="px-4 py-2 text-[14px] text-[#595959] border border-gray-200 rounded-full hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isPending}
              className="px-5 py-2 bg-[#1C9876] text-white font-manrope font-bold text-[14px] rounded-full hover:bg-[#167a60] disabled:opacity-70 flex items-center gap-2"
            >
              {isPending && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* First + Last Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* First Name */}
        <div>
          <label className="block font-inter font-medium text-[#171717] text-[14px] mb-2">First Name</label>

          {editing ? (
            <>
              <input
                type="text"
                placeholder="John"
                {...register("firstName")}
                className={`w-full h-11 px-4 rounded-xl border font-inter text-[14px] focus:outline-none focus:border-[#1C9876] focus:ring-2 focus:ring-[#1C9876]/20 transition-all ${
                  errors.firstName ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.firstName && <p className="text-red-500 text-[12px] mt-1">{errors.firstName.message}</p>}
            </>
          ) : (
            <p className="text-[#595959] text-[14px] py-3 border-b border-gray-100 min-h-12">{user.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block font-inter font-medium text-[#171717] text-[14px] mb-2">Last Name</label>

          {editing ? (
            <>
              <input
                type="text"
                placeholder="Doe"
                {...register("lastName")}
                className={`w-full h-11 px-4 rounded-xl border font-inter text-[14px] focus:outline-none focus:border-[#1C9876] focus:ring-2 focus:ring-[#1C9876]/20 transition-all ${
                  errors.lastName ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.lastName && <p className="text-red-500 text-[12px] mt-1">{errors.lastName.message}</p>}
            </>
          ) : (
            <p className="text-[#595959] text-[14px] py-3 border-b border-gray-100 min-h-12">{user.lastName}</p>
          )}
        </div>
      </div>

      {/* Bio */}
      <div className="mt-5">
        <label className="block font-inter font-medium text-[#171717] text-[14px] mb-2">Bio</label>

        {editing ? (
          <>
            <textarea
              {...register("bio")}
              rows={4}
              placeholder="Tell us about yourself… (max 500 chars)"
              maxLength={500}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 font-inter text-[14px] focus:outline-none focus:border-[#1C9876] focus:ring-2 focus:ring-[#1C9876]/20 resize-none transition-all"
            />
            {errors.bio && <p className="text-red-500 text-[12px] mt-1">{errors.bio.message}</p>}
          </>
        ) : (
          <p className="text-[#595959] text-[14px] leading-relaxed min-h-14">
            {user?.bio || <span className="italic text-gray-400">No bio added yet.</span>}
          </p>
        )}
      </div>
    </div>
  );
};
