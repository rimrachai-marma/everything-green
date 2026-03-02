"use server";

import { ActionState, ApiResponse, User } from "@/types";
import { serverEnv } from "@/data/env";
import { getAuthToken } from "./auth";
import { EmailFormData, ProfileFormData } from "../schemas/user";

const API_BASE_URL = serverEnv.API_BASE_URL;

export async function getProfile(): Promise<ApiResponse<User> | null> {
  const token = await getAuthToken();
  try {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch {
    return null;
  }
}

export async function updateUser(
  state: ActionState<User> | null,
  data: ProfileFormData,
): Promise<ActionState<User> | null> {
  const token = await getAuthToken();
  try {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
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

export async function updateEmail(
  state: ActionState<User> | null,
  data: EmailFormData,
): Promise<ActionState<User> | null> {
  const token = await getAuthToken();
  try {
    const response = await fetch(`${API_BASE_URL}/user/email-update`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ email: data.newEmail }),
    });

    return await response.json();
  } catch {
    return {
      status: "error",
      message: "An unexpected error occurred",
    };
  }
}

export async function deleteProfile(state: ActionState | null): Promise<ActionState | null> {
  const token = await getAuthToken();
  try {
    const response = await fetch(`${API_BASE_URL}/user/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch {
    return {
      status: "error",
      message: "An unexpected error occurred",
    };
  }
}
