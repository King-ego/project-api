import {Request, Response} from "express";
import {container} from "tsyringe";
import ListUsersService from "../../../services/ListUsersService";

import {IRequestCreateUser} from "../dto/IUsers"
import CreateUserService from "../../../services/CreateUserService";

export default class UserController {
    public async index(_: Request, resp: Response): Promise<Response> {
        const data = container.resolve(ListUsersService)
        const users = await data.execute();
        return resp.send(users)
    }

    public async create(req: Request<{}, {}, IRequestCreateUser, {}>, resp: Response): Promise<Response> {
        const {name, password, email} = req.body;
        const data = container.resolve(CreateUserService);

        const user = await data.execute({name, password, email})

        return resp.send(user)
    }
}