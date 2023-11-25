import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableImages1698783328230 implements MigrationInterface {
    name = 'CreateTableImages1698783328230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "images",
            columns: [
                {
                    name: "id",
                    type:"uuid",
                    generationStrategy:"uuid",
                    isUnique: true,
                    default: "uuid_generate_v4()",
                    isPrimary: true
                },
                {
                    name: "filename",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "product_id",
                    type: "uuid",
                    isNullable: false,
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()",
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("images")
    }

}
