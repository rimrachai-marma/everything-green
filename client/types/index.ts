export * from "./user";
export interface Pagination {
  page: number;
  pages: number;
  perPage: number;
  total: number;
}

export interface Meta {
  timestamp: string;
  pagination?: Pagination;
}

export type QueryState<T> =
  | {
      status: "success";
      message: string;
      data: T;
      meta?: Meta;
    }
  | {
      status: "error";
      message: string;
    };

export type MutationState<T = null> =
  | {
      status: "success";
      message: string;
      data?: T;
    }
  | {
      status: "error";
      message: string;
      errors?: Record<string, string[]>;
    };
