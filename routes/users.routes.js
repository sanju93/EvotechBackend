import express from "express";
import passport from "passport";
import Users from "../controller/users.controller.js";
let UsersController = new Users();
let user = express.Router();

user.post("/login", UsersController.login);
user.post("/register", UsersController.signup);
user.post(
  "/createSurvey",
  passport.authenticate("jwt", { session: false }),
  UsersController.createSurvey
);
user.get(
  "/getForms",
  passport.authenticate("jwt", { session: false }),
  UsersController.getForms
);

export { user };
