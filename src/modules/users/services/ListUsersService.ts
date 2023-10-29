import {injectable, inject} from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";
import Users from "../infra/typeorm/entities/Users";

@injectable()
class ListUsersService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {
    }

    public async execute():Promise<Users[]> {
        const users = await this.usersRepository.list();
        return users;
    }
}

export default ListUsersService;