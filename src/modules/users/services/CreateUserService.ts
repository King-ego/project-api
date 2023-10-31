import {injectable, inject} from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";
import {IRequestCreateUser} from "../infra/http/dto/IUsers";
import User from "../infra/typeorm/entities/Users";
import AppError from "../../../shared/erros/AppError";
import IHashProvider from "../providers/models/IHashProvider";

@injectable()
class CreateUserService {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository,
        @inject("HashProvider")
        private hashProvider: IHashProvider
    ) {
    }

    public async execute({email,password,name}:IRequestCreateUser):Promise<User> {
        const hashPassword = await this.hashProvider.generateHash(password);
        const user = await this.userRepository.create({email, password: hashPassword, name})
        if(!user) throw new AppError("Error create user", 402)
        return user;
    }
}

export default CreateUserService