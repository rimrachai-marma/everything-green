export * from "./user";

export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data?: T | null;
}

export type ActionState<T = null> =
  | {
      status: "success";
      message: string;
      data?: T | null;
    }
  | {
      status: "error";
      message: string;
      errors?: Record<string, string[]> | null;
    };
