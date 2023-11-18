import IImageRepository from "../../../repositories/IImageRepository";
import {Repository} from "typeorm";
import Images from "../entities/Images";
import AppDataSource from "../../../../../shared/infra/typeorm/config";
import images from "../entities/Images";

class ImageRepository implements IImageRepository {
    private ormRepository: Repository<Images>

    constructor() {
        this.ormRepository = AppDataSource.getRepository(Images);
    }
    public async createImage(name: string): Promise<Images> {
        const image = this.ormRepository.create({url: name})
        await this.ormRepository.save(image);

        return image
    }

    public async list(): Promise<Images[]> {
        return await this.ormRepository.find();
    }
    public async ImageByUrl(filename: string):Promise<Images | null>{
         const image = await this.ormRepository.findOne({
            where: {
                filename: filename
            }
        });
        return image;
    }
}

export default ImageRepository;