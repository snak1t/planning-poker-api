import {MigrationInterface, QueryRunner} from "typeorm";

export class addStoryFields1545285089527 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `story` ADD `score` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `story` DROP COLUMN `score`");
    }

}
