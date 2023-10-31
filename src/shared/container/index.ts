import { container } from "tsyringe";

import IUsersRepository from "../../modules/users/repositories/IUsersRepository";
import UsersRepository from "../../modules/users/infra/typeorm/repositories/UsersRepository";

import IImageRepository from "../../modules/upload/repositories/IImageRepository";
import ImageRepository from "../../modules/upload/infra/typeorm/repositories/ImageRepository";

import "../../modules/users/providers"

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository,
);

container.registerSingleton<ImageRepository>(
    "ImagesRepository",
    ImageRepository,
);