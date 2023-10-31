import {injectable, inject} from "tsyringe";
import IImageRepository from "../repositories/IImageRepository";
/*import Images from "../infra/typeorm/entities/Images";
import AppError from "../../../shared/erros/AppError";*/

@injectable()
class CreateImageService {
    constructor(
        @inject("ImagesRepository")
        private imagesRepository: IImageRepository,
    ) {
    }

    public async execute():Promise<string> {
        return "ok";
    }
}

export default CreateImageService;