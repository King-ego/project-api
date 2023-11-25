import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import Images from "../../../../upload/infra/typeorm/entities/Images";


@Entity("products")
class Products {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar")
    name: string;

    @Column("int")
    amount: number;

    @Column("float")
    price: number;

    @Column("float")
    discount: number;

    @OneToMany(()=> Images, images=> images.product)
    images: Images[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default Products