import { sign, verify } from "jsonwebtoken";

const SECRETKEY = "my_secret";
export const generateNewTokenPass = (payload: object) => {
  return sign(payload, SECRETKEY);
};

export const verifyTokenPass = (token: string, p1?: { expiresIn: string }) => {
  return verify(token, SECRETKEY);
};
