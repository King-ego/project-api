import {Router} from "express";
import {z} from "zod"
import {validateRequest} from "zod-express-middleware"

import UserController from "../controllers/UserController";
import auth from "../middleware/auth";

const userController = new UserController();
const usersRoutes = Router()


usersRoutes.get("/", auth, userController.index)
usersRoutes.post("/",
    validateRequest({
        body: z.object({
            name: z.string(),
            password: z.string(),
            email: z.string(),
            confirm_password: z.string(),
        }),
    }),
    userController.create
)
usersRoutes.patch("/:user_id",
    validateRequest({
        params: z.object({
            user_id: z.string().uuid(),
        }),
        body: z.object({
            name: z.string().optional(),
        })
    }),
    userController.update
)

export default usersRoutes;