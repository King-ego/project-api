import {Router} from "express";
import UsersRoutes from "../../../../modules/users/infra/http/routes/users.routes";
import SessionRouter from "../../../../modules/users/infra/http/routes/session.routes";

const routes = Router()

routes.use("/users", UsersRoutes)
routes.use("/session", SessionRouter)

export default routes;