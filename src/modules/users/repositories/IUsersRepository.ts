import User from "../infra/typeorm/entities/Users";
import {IRequestCreateUser} from "../infra/http/dto/IUsers";

export default interface IUsersRepository {
    list(): Promise<User[]>
    findByEmail(email: string): Promise<User | undefined>;
    create(user: IRequestCreateUser): Promise<User>;
}