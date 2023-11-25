import {inject, injectable} from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";
import {IUpdateUsers} from "../infra/http/dto/IUpdateUsers";
import Users from "../infra/typeorm/entities/Users";
import AppError from "../../../shared/erros/AppError";

@injectable()
class UpdateUserService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {
    }

    public async execute(updateUser: IUpdateUsers): Promise<Users> {
        const {user_id, ...rest} = updateUser;
        const user = await this.usersRepository.findByFilter({id: user_id});
        if (!user) throw new AppError("User not Found", 404);
        await this.usersRepository.updateById(updateUser);
        return {
            ...user,
            ...rest,
        }
    }

}

export default UpdateUserService;