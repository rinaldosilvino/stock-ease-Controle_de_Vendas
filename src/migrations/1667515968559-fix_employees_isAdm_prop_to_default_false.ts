import { MigrationInterface, QueryRunner } from "typeorm";

export class fixEmployeesIsAdmPropToDefaultTrue1667515968559 implements MigrationInterface {
    name = 'fixEmployeesIsAdmPropToDefaultTrue1667515968559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ALTER COLUMN "is_adm" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ALTER COLUMN "is_adm" DROP DEFAULT`);
    }

}
