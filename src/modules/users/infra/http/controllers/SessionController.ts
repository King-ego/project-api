import {Request, Response} from "express";
import {container} from "tsyringe";
import AuthenticateUserService from "../../../services/AuthenticateUserService";

interface IAuthenticated {
    email: string;
    password: string;
}

export default class SessionController {
    public async create(req: Request<{}, {}, IAuthenticated, {}>, resp: Response):Promise<Response> {
        const {password, email} = req.body;
        const data = container.resolve(AuthenticateUserService);
        const autheticated = await data.execute({email, password});
        return resp.send(autheticated);
    }
}