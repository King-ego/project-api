import {injectable, inject} from "tsyringe";
import {sign} from "jsonwebtoken";

import IUsersRepository from "../repositories/IUsersRepository";
import User from "../infra/typeorm/entities/Users";
import IHashProvider from "../providers/models/IHashProvider";
import auth from "../../../config/auth";
import AppError from "../../../shared/erros/AppError";


interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User,
    token: string;
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("HashProvider")
        private hashProvider: IHashProvider
    ) {
    }

    public async execute({email, password}: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByFilter({email});
        if (!user) throw new AppError("Incorrect email/password combination.", 401)

        const matchPassword = await this.hashProvider.compareHash(password, user.password);

        if (!matchPassword) {
            throw new AppError("Incorrect email/password combination.", 401);
        }

        const {secret, expiresIn} = auth.jwt

        const token = sign(
            {
                role: "ADM"
            },
            secret,
            {
                subject: user.id,
                expiresIn
            });


        return {user, token};
    }
}

export default AuthenticateUserService;
