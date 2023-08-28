/*
  Warnings:

  - The primary key for the `User_on_sport` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "User_on_sport" DROP CONSTRAINT "User_on_sport_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_on_sport_pkey" PRIMARY KEY ("id");


