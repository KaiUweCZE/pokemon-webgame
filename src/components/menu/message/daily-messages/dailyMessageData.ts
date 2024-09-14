import { npcQuestsData } from "@/data/npc/npc-quests/npcQuestsData";
import { MessageType } from "@/types/message";

// convert npcQuestMessage to dailyMessageData to inform the user on a specific day that he can accept a quest
const npcQuestMessage = npcQuestsData.map((quest) => {
  return {
    from: quest.from,
    time: quest.startDay,
    text: `Hey man! could you come to me? ${quest.description}`,
    type: MessageType.QUEST,
  };
});

export const dailyMessageData = [
  {
    from: "prof. Bloom",
    time: 18,
    text: `Hi there, I sent you a starter pack for your journey, 
    it's a few pokeballs and coins, so enjoy.`,
    type: MessageType.DEFAULT,
  },
  ...npcQuestMessage,
];
