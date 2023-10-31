import {Router} from "express";

import UserController from "../controllers/UserController";
import auth from "../middleware/auth";

const userController = new UserController();
const usersRoutes = Router()


usersRoutes.get("/", auth, userController.index)
usersRoutes.post("/", userController.create)

export default usersRoutes;