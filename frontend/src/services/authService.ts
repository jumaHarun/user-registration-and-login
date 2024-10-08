import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../types";
import API from "./axios";

export const registerUser = async (
  userData: RegisterRequest
): Promise<RegisterResponse> => {
  try {
    const response = await API.post<RegisterResponse>(
      "/auth/register",
      userData
    );
    return response.data;
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};

export const loginUser = async (
  userData: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response = await API.post<LoginResponse>("/auth/login", userData);

    // Manage Tokens
    const { accessToken, refreshToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return response.data;
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};
