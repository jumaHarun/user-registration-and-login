import API from "./axios";

type UserData = {
  email: string;
  password: string;
};

export const registerUser = async (userData: UserData) => {
  try {
    const response = await API.post("/auth/register", userData);
    return response.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    }
    throw err;
  }
};

export const loginUser = async (userData: UserData) => {
  try {
    const response = await API.post("/auth/login", userData);
    return response.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    }
    throw err;
  }
};
