export type RegisterRequest = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  message: string;
  user: RegisterRequest;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  accessToken: string;
  refreshToken: string;
};

export type RefreshRequest = {
  refreshToken: string;
};

export type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};
