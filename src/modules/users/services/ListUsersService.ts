import {injectable, inject} from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";
import Users from "../infra/typeorm/entities/Users";
import AppError from "../../../shared/erros/AppError";

@injectable()
class ListUsersService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {
    }

    public async execute():Promise<Users[]> {
        const users = await this.usersRepository.list();
        if(!users.length) throw new AppError("Users not found");
        return users;
    }
}

export default ListUsersService;