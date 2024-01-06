import express, {Router} from "express";
import * as userController from "../controllers/userController";

const route: Router = express.Router();

// get all users
route.get('/all', userController.getAllUsers);
//save users
route.post('/save', userController.saveUser);

//check email password
route.post('/auth', userController.userAuth);

export default route;