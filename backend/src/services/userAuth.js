import jwt from "jsonwebtoken";
const secretKey = "nikson@#$%!shrestha@$&!*";

export const setUser = (user) => {
  const { _id, email, fullname, username } = user;
  return jwt.sign({ _id, email, fullname, username }, secretKey, {
    expiresIn: "1h",
  });
};
export const getUser = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    console.log(error);
  }
};
