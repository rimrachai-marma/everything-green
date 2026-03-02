export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  bio?: string | null;
  avatarUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type Token = {
  token: string;
  tokenType: "Bearer";
};
export type UserWithToken = User & {
  accessToken: Token;
};
