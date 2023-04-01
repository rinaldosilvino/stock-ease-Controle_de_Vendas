import { MigrationInterface, QueryRunner } from "typeorm";

export class removePaymentsTable1667915556370 implements MigrationInterface {
    name = 'removePaymentsTable1667915556370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_5b3e94bd2aedc184f9ad8c10439"`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "payment_id" TO "payment"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "payment"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "payment" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "payment"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "payment" integer`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "payment" TO "payment_id"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_5b3e94bd2aedc184f9ad8c10439" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
