import User from "../infra/typeorm/entities/Users";
import {IRequestCreateUserWithoutPassword} from "../infra/http/dto/IUsers";
import {IUpdateUsers} from "../infra/http/dto/IUpdateUsers";
import IFilterUsers from "../infra/http/dto/IFilterUsers";

export default interface IUsersRepository {
    list(): Promise<User[]>
    findByFilter(filter: IFilterUsers): Promise<User | undefined>;
    create(user: IRequestCreateUserWithoutPassword): Promise<User>;
    updateById(updateUser: IUpdateUsers): Promise<void>;
}