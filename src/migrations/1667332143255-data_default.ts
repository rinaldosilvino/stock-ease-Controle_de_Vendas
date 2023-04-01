import { MigrationInterface, QueryRunner } from 'typeorm';

export class dataDefault1667332143255 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO employees(name,password,is_adm) VALUES ('admin','1234',true)`
    );
    await queryRunner.query(
      `INSERT INTO customers(cpf,name) VALUES ('00000','Cliente Padrão' )`
    );
    await queryRunner.query(
      `INSERT INTO payments(type) VALUES ('Dinheiro'),('Cartão de crédito')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
