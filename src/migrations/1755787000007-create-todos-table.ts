import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTodosTable1755787000007 implements MigrationInterface {
    name = 'CreateTodosTable1755787000007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."todos_status_enum" AS ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED')`);
        await queryRunner.query(`CREATE TABLE "todos" ("id" SERIAL NOT NULL, "title" character varying(120) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "status" "public"."todos_status_enum" NOT NULL DEFAULT 'PENDING', "inProgressAt" TIMESTAMP WITH TIME ZONE, "completedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_ca8cafd59ca6faaf67995344225" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c427d5928f463be5c8965e0d68" ON "todos" ("title") `);
        await queryRunner.query(`CREATE INDEX "IDX_afc9fcd003e6b52101302a8b7e" ON "todos" ("status") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_afc9fcd003e6b52101302a8b7e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c427d5928f463be5c8965e0d68"`);
        await queryRunner.query(`DROP TABLE "todos"`);
        await queryRunner.query(`DROP TYPE "public"."todos_status_enum"`);
    }

}
