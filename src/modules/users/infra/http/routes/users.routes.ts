import {Router} from "express";

import UserController from "../controllers/UserController";

const userController = new UserController();
const usersRoutes = Router()


usersRoutes.get("/", userController.index)

export default usersRoutes;