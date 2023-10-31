import {Router} from "express";
import UsersRoutes from "../../../../modules/users/infra/http/routes/users.routes";
import SessionRouter from "../../../../modules/users/infra/http/routes/session.routes";
import UploadRoutes from "../../../../modules/upload/infra/http/routes/upload.routes";

const routes = Router()

routes.use("/users", UsersRoutes)
routes.use("/session", SessionRouter)
routes.use("/upload", UploadRoutes)

export default routes;