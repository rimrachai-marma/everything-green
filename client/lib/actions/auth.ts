"use server";

import { cookies } from "next/headers";

import { MutationState, User, UserWithToken } from "@/types";
import { LoginFormData, PasswordFormData, RegisterFormData } from "../schemas/auth";
import { serverEnv } from "@/data/env";
import { redirect } from "next/navigation";

const API_BASE_URL = serverEnv.API_BASE_URL;
const TOKEN_COOKIE_NAME = serverEnv.TOKEN_COOKIE_NAME || "access_token";

export async function signupAction(
  _: MutationState<UserWithToken> | null,
  formData: RegisterFormData,
): Promise<MutationState<UserWithToken> | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();

    if (response.ok && result.status == "success") {
      const cookieStore = await cookies();

      cookieStore.set(TOKEN_COOKIE_NAME, result.data.accessToken.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
      });
    }

    return result;
  } catch {
    return {
      status: "error",
      message: "An unexpected error occurred",
    };
  }
}

export async function loginAction(
  _: MutationState<UserWithToken> | null,
  formData: LoginFormData,
): Promise<MutationState<UserWithToken> | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();

    if (response.ok && result.status == "success") {
      const cookieStore = await cookies();

      cookieStore.set(TOKEN_COOKIE_NAME, result.data.accessToken.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
      });
    }

    return result;
  } catch {
    return {
      status: "error",
      message: "An unexpected error occurred",
    };
  }
}

export async function logout() {
  const token = await getAuthToken();
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    clearAuthCookie();
  }

  redirect("/auth/login");
}

export async function changePassword(
  state: MutationState | null,
  data: PasswordFormData,
): Promise<MutationState | null> {
  const token = await getAuthToken();
  try {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    return await response.json();
  } catch {
    return {
      status: "error",
      message: "An unexpected error occurred",
    };
  }
}

export async function validateUser(token: string): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json())?.data ?? null;
  } catch (error) {
    console.error("Auth validation failed: ", error);
    return null;
  }
}

export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_COOKIE_NAME)?.value;
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE_NAME);
}
