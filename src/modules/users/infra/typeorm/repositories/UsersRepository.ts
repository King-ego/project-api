import {ILike, Repository} from "typeorm";
import User from "../entities/Users";
import AppDataSource from "../../../../../shared/infra/typeorm/config"
import IUsersRepository from "../../../repositories/IUsersRepository";
import {IRequestCreateUserWithoutPassword} from "../../http/dto/IUsers";
import {IUpdateUsers} from "../../http/dto/IUpdateUsers";
import {removeNullOrUndefinedKeys} from "../../../../../ultils/formater";
import IFilterUsers from "../../http/dto/IFilterUsers";

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

    public async findByFilter({email,name,id}:IFilterUsers): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: removeNullOrUndefinedKeys({
                ...(email && {email}),
                ...(name && {name: ILike(`%${name}%`)}),
                ...(id && {id})
            })
        }) || undefined;

        return user;
    }

    public async create(user: IRequestCreateUserWithoutPassword): Promise<User> {
        const newUser = this.ormRepository.create(user);

        await this.ormRepository.save(newUser);

        return newUser;
    }

    public async updateById({user_id, ...rest}: IUpdateUsers): Promise<void> {
        await this.ormRepository.update(user_id, rest);
    }
}

export default UsersRepository;