import { instance } from "../axios/axios";

export const registerUser = async (
  fullname,
  username,
  email,
  password,
  cpassword
) => {
  try {
    const response = await instance.post("/user/createUser", {
      fullname,
      username,
      email,
      password,
      cpassword,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const loginUser = async (email, password) => {
  try {
    const response = await instance.post(
      `/user/loginUser`,
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
export const changePassword = async (id, oldPassword, newPassword) => {
  console.log(id, oldPassword, newPassword);
  try {
    const response = await instance.patch(`/user/changePassword?id=${id}`, {
      oldPassword,
      newPassword,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
