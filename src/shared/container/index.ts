import { container } from "tsyringe";

import IUsersRepository from "../../modules/users/repositories/IUsersRepository";
import UsersRepository from "../../modules/users/infra/typeorm/repositories/UsersRepository";

import IImageRepository from "../../modules/upload/repositories/IImageRepository";
import ImageRepository from "../../modules/upload/infra/typeorm/repositories/ImageRepository";

import IS3Storage from "../../ultils/IS3Storage";
import S3Storage from "../../ultils/S3Storage";

import "../../modules/users/providers"

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository,
);

container.registerSingleton<IImageRepository>(
    "ImagesRepository",
    ImageRepository,
);

container.registerSingleton<IS3Storage>(
    "S3Storage",
    S3Storage,
);