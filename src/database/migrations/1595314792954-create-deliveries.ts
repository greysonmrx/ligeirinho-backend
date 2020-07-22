import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

class createDeliveries1595314792954 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: 'deliveries',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'product',
            type: 'varchar',
          },
          {
            name: 'recipient_id',
            type: 'uuid',
          },
          {
            name: 'deliveryman_id',
            type: 'uuid',
          },
          {
            name: 'signature_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'canceled_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'start_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'end_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('deliveries', [
      new TableForeignKey({
        columnNames: ['recipient_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'recipients',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['deliveryman_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'deliverymen',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['signature_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'files',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('deliveries');
  }
}

export default createDeliveries1595314792954;
