import IImageRepository from "../../../repositories/IImageRepository";
import {Repository} from "typeorm";
import Images from "../entities/Images";
import AppDataSource from "../../../../../shared/infra/typeorm/config";

class ImageRepository implements IImageRepository {
    private ormRepository: Repository<Images>

    constructor() {
        this.ormRepository = AppDataSource.getRepository(Images);
    }
    public async createImage(): Promise<void> {
    }
}

export default ImageRepository;