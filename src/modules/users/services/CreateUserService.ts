import {injectable, inject} from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";
import {IRequestCreateUser} from "../infra/http/dto/IUsers";
import User from "../infra/typeorm/entities/Users";
import AppError from "../../../shared/erros/AppError";

@injectable()
class CreateUserService {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) {
    }

    public async execute({email,password,name}:IRequestCreateUser):Promise<User> {
        const user = await this.userRepository.create({email, password, name})
        if(!user) throw new AppError("Error create user", 402)
        return user;
    }
}

export default CreateUserService