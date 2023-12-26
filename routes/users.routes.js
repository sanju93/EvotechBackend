import express from 'express';
import passport from 'passport';
import Users from '../controller/users.controller.js';
let UsersController  = new Users(); 
let user = express.Router();

user.get('/login',passport.authenticate('jwt',{session : false}),UsersController.login);
user.post('/register',UsersController.signup);

export {user};