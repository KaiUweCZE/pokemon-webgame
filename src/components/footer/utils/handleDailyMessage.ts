import { createMessage } from "@/components/menu/message/action";
import { dailyMessageData } from "@/components/menu/message/daily-messages/dailyMessageData";
import { changeDailyMessage } from "@/utils/changeDailyMessages";
import { MessageType } from "@/types/message";

export const handleDailyMessage = async (
  day: number,
  dailyMessage: number,
  userId: string
) => {
  const data = dailyMessageData;
  const filteredData = data.find((d) => d.time <= day && d.time > dailyMessage);
  console.log("this is filtred: ", day, filteredData?.from, dailyMessage);

  if (filteredData) {
    try {
      const newMessage = await createMessage(userId, filteredData);
      const updated = await changeDailyMessage(userId, day);

      if (newMessage && updated) {
        const editedMessage = {
          id: newMessage.id,
          from: newMessage?.from,
          text: newMessage?.text,
          time: newMessage.time,
          type: newMessage.type as MessageType,
          viewed: false,
        };
        return {
          updated: updated,
          newMessage: editedMessage,
        };
      }
    } catch (error) {
      console.error("an error occured: ", error);
      throw error;
    }
  }
  return {
    updated: null,
    newMessage: null,
  };
};
