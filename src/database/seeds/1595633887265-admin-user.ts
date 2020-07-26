import { MigrationInterface, QueryRunner } from 'typeorm';
import { hash } from 'bcryptjs';

class adminUser1595633887265 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder()
      .insert()
      .into('users')
      .values({
        name: 'Admin Ligeirinho',
        email: 'admin@ligeirinho.com',
        password: await hash('123456', 8),
      })
      .execute();
  }

  public async down(_queryRunner: QueryRunner): Promise<void> { }
}

export default adminUser1595633887265;
