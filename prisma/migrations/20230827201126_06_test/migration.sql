/*
  Warnings:

  - Changed the type of `sport_id` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_sport_id_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "sport_id",
ADD COLUMN     "sport_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "Sport"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
