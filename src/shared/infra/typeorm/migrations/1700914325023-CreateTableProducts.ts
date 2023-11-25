import {
    MigrationInterface,
    QueryRunner,
    Table,
} from "typeorm";

export class CreateTableProducts1700914325023 implements MigrationInterface {
    name = 'CreateTableProducts1700914325023'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "products",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    default: "uuid_generate_v4()",
                    isNullable: false,
                    isUnique: true,
                    isPrimary: true,
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "amount",
                    type: "int",
                    isNullable: true,
                },
                {
                    name: "price",
                    type: "float",
                    isNullable: true
                },
                {
                    name: "discount",
                    type: "float",
                    isNullable: true,
                },
                {
                    name: "created_at",
                    type: "timestamp"
                },
                {
                    name: "updated_at",
                    type: "timestamp"
                }
            ]
        }))
        /*await queryRunner.createForeignKey(
            "images",
            new TableForeignKey({
                name: "AssignedImages",
                columnNames: ["product_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "products",
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
            }),
        );*/
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        /*await queryRunner.dropForeignKey("images", "AssignedImages");
        */await queryRunner.dropTable("products");
    }

}
