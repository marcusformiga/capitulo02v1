import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateSpecificationsCars1630669829920
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "specifications_cars",
        columns: [
          {
            name: "cars_id",
            type: "uuid",
          },
          {
            name: "specifications_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp with time zone",
            default: "now()",
          },
        ],
      })
    );
    await queryRunner.createForeignKey(
      "specifications_cars",
      new TableForeignKey({
        name: "FkSpecificationsCars",
        referencedColumnNames: ["id"],
        referencedTableName: "specifications",
        columnNames: ["specifications_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    ),
      await queryRunner.createForeignKey(
        "specifications_cars",
        new TableForeignKey({
          name: "FkCarsSpecifications",
          referencedColumnNames: ["id"],
          referencedTableName: "cars",
          columnNames: ["cars_id"],
          onDelete: "SET NULL",
          onUpdate: "SET NULL",
        })
      );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "specifications_cars",
      "FKCarsSpecifications"
    );
    await queryRunner.dropForeignKey(
      "specifications_cars",
      "FkSpecificationsCars"
    );
    await queryRunner.dropTable("specifications_cars");
  }
}
