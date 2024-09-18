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
  accesToken: string;
  refreshToken: string;
};
