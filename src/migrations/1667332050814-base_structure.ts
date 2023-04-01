import { MigrationInterface, QueryRunner } from 'typeorm';

export class baseStructure1667332050814 implements MigrationInterface {
  name = 'baseStructure1667332050814';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "employees" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "is_adm" boolean NOT NULL, CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" numeric(5,2) NOT NULL, "inventory" integer NOT NULL, "is_active" boolean NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "order_has_products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "count" integer NOT NULL, "order_id" integer, "product_id" integer, CONSTRAINT "PK_8dcab0f68c29419f6f8fe645cd9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "payments" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "total" numeric(10,2) NOT NULL, "customer_id" character varying, "payment_id" integer, "employee_id" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "customers" ("cpf" character varying NOT NULL, "name" character varying(45) NOT NULL, CONSTRAINT "PK_413de651cfd9c576b99cec83fd3" PRIMARY KEY ("cpf"))`
    );
    await queryRunner.query(
      `ALTER TABLE "order_has_products" ADD CONSTRAINT "FK_d380ec391f23af64dd557ce48f9" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "order_has_products" ADD CONSTRAINT "FK_21d05e4c48cbd1829780911bed2" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9" FOREIGN KEY ("customer_id") REFERENCES "customers"("cpf") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_5b3e94bd2aedc184f9ad8c10439" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_f8a7411077c731327ca6e0b93b6" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_f8a7411077c731327ca6e0b93b6"`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_5b3e94bd2aedc184f9ad8c10439"`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9"`
    );
    await queryRunner.query(
      `ALTER TABLE "order_has_products" DROP CONSTRAINT "FK_21d05e4c48cbd1829780911bed2"`
    );
    await queryRunner.query(
      `ALTER TABLE "order_has_products" DROP CONSTRAINT "FK_d380ec391f23af64dd557ce48f9"`
    );
    await queryRunner.query(`DROP TABLE "customers"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "payments"`);
    await queryRunner.query(`DROP TABLE "order_has_products"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "employees"`);
  }
}
