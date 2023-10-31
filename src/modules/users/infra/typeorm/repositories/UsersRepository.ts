import {Repository} from "typeorm";
import User from "../entities/Users";
import AppDataSource from "../../../../../shared/infra/typeorm/config"
import IUsersRepository from "../../../repositories/IUsersRepository";
import {IRequestCreateUser} from "../../http/dto/IUsers";

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(User);
    }

    public async list(): Promise<User[]> {
        const users = await this.ormRepository.createQueryBuilder("users")
            .select(["users.id", "users.name", "users.email", "users.created_at", "users.updated_at"])
            .getMany();
        return users;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: {email}
        }) || undefined;

        return user;
    }

    public async create(user: IRequestCreateUser): Promise<User> {
        const newUser = this.ormRepository.create(user);

        await this.ormRepository.save(newUser);

        return newUser;
    }
}

export default UsersRepository;