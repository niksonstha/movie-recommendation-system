import axios from "axios";
export const registerUser = async (
  fullname,
  username,
  email,
  password,
  cpassword
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_PATH}/user/createUser`,
      {
        fullname,
        username,
        email,
        password,
        cpassword,
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_PATH}/user/loginUser`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
