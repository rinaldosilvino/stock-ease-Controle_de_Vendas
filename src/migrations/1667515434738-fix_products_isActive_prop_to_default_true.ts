import { MigrationInterface, QueryRunner } from "typeorm";

export class fixProductsIsActivePropToDefaultTrue1667515434738 implements MigrationInterface {
    name = 'fixProductsIsActivePropToDefaultTrue1667515434738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "is_active" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "is_active" DROP DEFAULT`);
    }

}
