export type TokenPayload = {
  id: number;
  username: string;
};

export type Token = {
  token: string;
};

export type LoginBody = {
  username: string;
  password: string;
};
