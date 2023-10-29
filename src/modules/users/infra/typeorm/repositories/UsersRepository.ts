import {Repository} from "typeorm";
import User from "../entities/Users";
import AppDataSource from "../../../../../shared/infra/typeorm/config"
import IUsersRepository from "../../../repositories/IUsersRepository";

class UsersRepository implements IUsersRepository{
    private ormRepository: Repository<User>;
    constructor() {
        this.ormRepository = AppDataSource.getRepository(User);
    }

    async list(): Promise<User[]> {
        const users = await this.ormRepository.find();
        return users;
    }
}

export default UsersRepository;