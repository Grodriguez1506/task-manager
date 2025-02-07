import jwt from "jsonwebtoken";
import { SECRET_KEY_TOKEN } from "../config.js";

export const createAccesToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      SECRET_KEY_TOKEN,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};
