import { MigrationInterface, QueryRunner } from "typeorm";

export class addOnDeleteConstraints1667413261835 implements MigrationInterface {
    name = 'addOnDeleteConstraints1667413261835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_has_products" DROP CONSTRAINT "FK_d380ec391f23af64dd557ce48f9"`);
        await queryRunner.query(`ALTER TABLE "order_has_products" ADD CONSTRAINT "FK_d380ec391f23af64dd557ce48f9" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_has_products" DROP CONSTRAINT "FK_d380ec391f23af64dd557ce48f9"`);
        await queryRunner.query(`ALTER TABLE "order_has_products" ADD CONSTRAINT "FK_d380ec391f23af64dd557ce48f9" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
