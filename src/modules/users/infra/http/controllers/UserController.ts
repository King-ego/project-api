import { Request, Response } from "express";
import { container } from "tsyringe";
import ListUsersService from "../../../services/ListUsersService";

export default class UserController {
    public async index(_: Request, resp: Response):Promise<Response> {
        const data = container.resolve(ListUsersService)
        const users = await data.execute();
        const usersWithoutPassword = users.map((user)=> {
            const { password, ...userWithoutEmail } = user;
            return userWithoutEmail;
        })
        return resp.send(usersWithoutPassword)
    }
}