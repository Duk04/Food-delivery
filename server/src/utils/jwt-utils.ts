import { sign, verify } from "jsonwebtoken";

const SECRETKEY = "my_secret";
export const generateNewToken = (payload: object) => {
  return sign(payload, SECRETKEY);
};

export const verifyToken = (token: string, p1?: { expiresIn: "1h" }) => {
  return verify(token, SECRETKEY);
};
