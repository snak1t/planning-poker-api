import {MigrationInterface, QueryRunner} from "typeorm";

export class addUseEmail1545253422255 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `game` ADD `user` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `game` DROP COLUMN `user`");
    }

}
