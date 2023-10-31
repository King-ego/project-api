import {Router} from "express";

import UserController from "../controllers/UserController";

const userController = new UserController();
const usersRoutes = Router()


usersRoutes.get("/", userController.index)
usersRoutes.post("/", userController.create)

export default usersRoutes;