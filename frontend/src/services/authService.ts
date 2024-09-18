import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../types/auth";
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
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    }
    throw err;
  }
};

export const loginUser = async (
  userData: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response = await API.post<LoginResponse>("/auth/login", userData);
    return response.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    }
    throw err;
  }
};
