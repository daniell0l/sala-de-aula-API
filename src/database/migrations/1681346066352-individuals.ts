import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class individuals1681346066352 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'individuals',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'cpf',
                  type: 'varchar',
                },
                {
                  name: 'name',
                  type: 'varchar',
                },
                {
                  name: 'birth_date',
                  type: 'timestamp',
                },
                {
                  name: 'gender',
                  type: 'int',
                },
                {
                  name: 'user_id',
                  type: 'int',
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
              foreignKeys: [
                {
                  name: 'FKUserId',
                  referencedTableName: 'users',
                  referencedColumnNames: ['id'],
                  columnNames: ['user_id'],
                  onDelete: 'SET NULL',
                  onUpdate: 'SET NULL',
                },
              ],
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('individuals');
    }
}
