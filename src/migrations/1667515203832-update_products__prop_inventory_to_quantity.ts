import { MigrationInterface, QueryRunner } from "typeorm";

export class updateProducts_propInventoryToQuantity1667515203832 implements MigrationInterface {
    name = 'updateProducts_propInventoryToQuantity1667515203832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "inventory" TO "quantity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "quantity" TO "inventory"`);
    }

}
