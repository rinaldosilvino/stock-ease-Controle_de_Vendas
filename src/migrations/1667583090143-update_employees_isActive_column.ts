import { MigrationInterface, QueryRunner } from "typeorm";

export class updateEmployeesIsActiveColumn1667583090143 implements MigrationInterface {
    name = 'updateEmployeesIsActiveColumn1667583090143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "is_active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "is_active"`);
    }

}
