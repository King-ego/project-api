import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class CreateRalationImagesToProduct1700918862646 implements MigrationInterface {
    name = 'CreateRalationImagesToProduct1700918862646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            "images",
            new TableForeignKey({
                name: "AssignedImages",
                columnNames: ["product_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "products",
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("images", "AssignedImages")
    }

}
