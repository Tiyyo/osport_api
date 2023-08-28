/*
  Warnings:

  - You are about to drop the column `event_date` on the `Event` table. All the data in the column will be lost.
  - Added the required column `date` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rater_id` to the `User_on_sport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "event_date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'open';

-- AlterTable
ALTER TABLE "User_on_sport" ADD COLUMN     "rater_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "User_on_sport" ADD CONSTRAINT "User_on_sport_rater_id_fkey" FOREIGN KEY ("rater_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
