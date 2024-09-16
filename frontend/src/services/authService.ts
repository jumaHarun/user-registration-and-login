import API from "./axios";

export const registerUser = async (userData: {
  email: string;
  password: string;
}) => {
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
