import { MigrationInterface, QueryRunner } from "typeorm";

export class addDefaultOption1667513505331 implements MigrationInterface {
    name = 'addDefaultOption1667513505331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "is_active" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "is_active" DROP DEFAULT`);
    }

}
