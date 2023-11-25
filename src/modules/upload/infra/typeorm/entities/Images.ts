import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    JoinColumn, ManyToOne
} from "typeorm";

import Products from "../../../../products/infra/typeorm/entities/Products";

@Entity("images")
class Images {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar")
    filename: string;

    @Column("uuid")
    product_id: string;

    @ManyToOne(()=>Products, products => products.images)
    @JoinColumn({name: "product_id"})
    product: Images;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default Images;
