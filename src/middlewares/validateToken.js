import jwt from "jsonwebtoken";
import { SECRET_KEY_TOKEN } from "../config.js";

export const authRequired = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.redirect("/login");

  jwt.verify(token, SECRET_KEY_TOKEN, (err, user) => {
    if (err) return res.status(400).send(err);

    req.user = user;
  });

  next();
};

export const redirectAuthenticated = (req, res, next) => {
  const token = req.cookies.token;

  if (token) return res.redirect("/profile");

  next();
};
