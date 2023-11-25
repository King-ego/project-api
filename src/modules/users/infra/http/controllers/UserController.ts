import {Request, Response} from "express";
import {container} from "tsyringe";
import ListUsersService from "../../../services/ListUsersService";

import {IRequestCreateUser} from "../dto/IUsers"
import CreateUserService from "../../../services/CreateUserService";
import {IUpdateParams, IUpdateBody} from "../dto/IUpdateUsers";
import UpdateUserService from "../../../services/UpdateUserService";

export default class UserController {
    public async index(_: Request, resp: Response): Promise<Response> {
        const data = container.resolve(ListUsersService)
        const users = await data.execute();
        return resp.send(users)
    }

    public async create(req: Request<{}, {}, IRequestCreateUser, {}>, resp: Response): Promise<Response> {
        const {name, password, email, confirm_password} = req.body;
        const data = container.resolve(CreateUserService);

        const user = await data.execute({name, password, email, confirm_password})

        const userWithoutPassword = {...user, password: undefined};

        return resp.send(userWithoutPassword);
    }

    public async update(req: Request<IUpdateParams,{},IUpdateBody>, resp:Response): Promise<Response>{
        const {body,params} = req
        const updateUser = {...params, ...body};

        const dataUpdate = container.resolve(UpdateUserService);

        const userUpdate = await dataUpdate.execute(updateUser);

        return resp.send({...userUpdate, password: undefined});
    }
}