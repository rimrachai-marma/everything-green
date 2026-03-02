export type LoginData = { email: string; password: string };

export type Token = {
  token: string;
  tokenType: "Bearer";
};
