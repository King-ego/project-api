import {Router} from "express";

import UserController from "../controllers/UserController";
import auth from "../middleware/auth";

const userController = new UserController();
const usersRoutes = Router()


usersRoutes.get("/", auth, userController.index)
usersRoutes.post("/", userController.create)
usersRoutes.patch("/:user_id", userController.update)

export default usersRoutes;