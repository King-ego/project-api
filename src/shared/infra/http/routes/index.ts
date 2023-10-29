import {Router} from "express";
import UsersRoutes from "../../../../modules/users/infra/http/routes/users.routes";

const routes = Router()

routes.use("/users", UsersRoutes)

export default routes;