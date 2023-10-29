import User from "../infra/typeorm/entities/Users";

export default interface IUsersRepository {
    list(): Promise<User[]>
}