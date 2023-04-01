import { MigrationInterface, QueryRunner } from "typeorm";

export class paymentNullableFalse1667915714192 implements MigrationInterface {
    name = 'paymentNullableFalse1667915714192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "payment" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "payment" DROP NOT NULL`);
    }

}
