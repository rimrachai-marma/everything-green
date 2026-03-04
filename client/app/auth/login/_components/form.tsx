"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/lib/schemas/auth";
import { loginAction } from "@/lib/actions/auth";

export const Form: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect");

  const [showPwd, setShowPwd] = React.useState(false);

  const [state, formAction, isPending] = React.useActionState(loginAction, null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  React.useEffect(() => {
    if (state?.status === "success") router.push(redirectTo ?? "/");
  }, [state, router, redirectTo]);

  const onSubmit = (data: LoginFormData) => {
    React.startTransition(() => {
      formAction(data);
    });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Email */}
      <div>
        <label className="block font-inter font-medium text-[14px] text-[#171717] mb-2">Email</label>
        <input
          type="email"
          placeholder="you@company.com"
          {...register("email")}
          className="w-full h-12 px-4 rounded-xl border border-gray-200 font-inter text-[14px] focus:outline-none focus:border-[#1C9876] focus:ring-2 focus:ring-[#1C9876]/20 transition-all"
        />
        {errors.email && <p className="text-red-500 text-[12px] mt-1">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div>
        <label className="block font-inter font-medium text-[14px] text-[#171717] mb-2">Password</label>
        <div className="relative">
          <input
            type={showPwd ? "text" : "password"}
            placeholder="••••••••"
            {...register("password")}
            className="w-full h-12 px-4 pr-12 rounded-xl border border-gray-200 font-inter text-[14px] focus:outline-none focus:border-[#1C9876] focus:ring-2 focus:ring-[#1C9876]/20 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPwd(!showPwd)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-[12px] mt-1">{errors.password.message}</p>}
      </div>

      {/* Remember me + Forgot password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" {...register("rememberMe")} className="w-4 h-4 rounded accent-[#1C9876]" />
          <span className="font-inter text-[14px] text-[#171717]">Remember for 30 days</span>
        </label>
        <Link href="#" className="font-inter font-medium text-[14px] text-[#1C9876] hover:underline">
          Forgot password?
        </Link>
      </div>

      {/* Server error */}
      {state?.status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-[13px] p-3 rounded-xl">{state.message}</div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full h-12 bg-[#1C9876] hover:bg-[#167a60] text-white font-manrope font-bold text-[15px] rounded-full transition-all disabled:opacity-70 flex items-center justify-center gap-2"
      >
        {isPending && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
        Sign in
      </button>

      {/* Google sign-in */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 h-12 border border-gray-200 rounded-full font-inter font-medium text-[15px] text-[#171717] hover:bg-gray-50 transition-colors"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span>Sign in With Google</span>
      </button>

      <p className="text-center font-inter text-[14px] text-[#595959]">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="text-[#1C9876] font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
};
