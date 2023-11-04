import {injectable, inject} from "tsyringe";
import IImageRepository from "../repositories/IImageRepository";
import Images from "../infra/typeorm/entities/Images";

@injectable()
class  ListImagesServices {
    constructor(
        @inject("ImagesRepository")
        private imagesRepository: IImageRepository,
    ) {
    }

    public async execute():Promise<Images[]> {
        return  await this.imagesRepository.list();
    }
}

export default ListImagesServices;