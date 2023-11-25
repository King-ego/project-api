import {Router} from "express";
import SessionController from "../controllers/SessionController";
import {z} from "zod";
import {validateRequest} from "zod-express-middleware";

const sessionRouter = Router();
const sessionController = new SessionController()

sessionRouter.post("/",
    validateRequest({
        body: z.object({
            email: z.string().email(),
            password: z.string().min(4)
        })
    }),
    sessionController.create
)

export default sessionRouter;