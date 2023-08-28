-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_sport_id_fkey";

-- DropForeignKey
ALTER TABLE "Event_chat_on_user" DROP CONSTRAINT "Event_chat_on_user_event_id_fkey";

-- DropForeignKey
ALTER TABLE "Event_chat_on_user" DROP CONSTRAINT "Event_chat_on_user_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Event_on_user" DROP CONSTRAINT "Event_on_user_event_id_fkey";

-- DropForeignKey
ALTER TABLE "Event_on_user" DROP CONSTRAINT "Event_on_user_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Sport_on_image" DROP CONSTRAINT "Sport_on_image_image_id_fkey";

-- DropForeignKey
ALTER TABLE "Sport_on_image" DROP CONSTRAINT "Sport_on_image_sport_id_fkey";

-- DropForeignKey
ALTER TABLE "User_on_friend" DROP CONSTRAINT "User_on_friend_asked_id_fkey";

-- DropForeignKey
ALTER TABLE "User_on_friend" DROP CONSTRAINT "User_on_friend_asker_id_fkey";

-- DropForeignKey
ALTER TABLE "User_on_sport" DROP CONSTRAINT "User_on_sport_sport_id_fkey";

-- DropForeignKey
ALTER TABLE "User_on_sport" DROP CONSTRAINT "User_on_sport_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "Sport"("name") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Event_on_user" ADD CONSTRAINT "Event_on_user_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event_on_user" ADD CONSTRAINT "Event_on_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_on_friend" ADD CONSTRAINT "User_on_friend_asked_id_fkey" FOREIGN KEY ("asked_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_on_friend" ADD CONSTRAINT "User_on_friend_asker_id_fkey" FOREIGN KEY ("asker_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_on_sport" ADD CONSTRAINT "User_on_sport_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_on_sport" ADD CONSTRAINT "User_on_sport_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "Sport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sport_on_image" ADD CONSTRAINT "Sport_on_image_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "Sport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sport_on_image" ADD CONSTRAINT "Sport_on_image_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event_chat_on_user" ADD CONSTRAINT "Event_chat_on_user_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event_chat_on_user" ADD CONSTRAINT "Event_chat_on_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
