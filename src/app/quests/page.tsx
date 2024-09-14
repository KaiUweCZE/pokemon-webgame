"use client";
import {
  rewardQuestAtom,
  useLoadQuests,
} from "@/components/menu/message/store/questStore";
import { useSession } from "next-auth/react";
import "./quest-style.css";
import { mapData } from "../map/mapData";
import { useState } from "react";
import QuestError from "./QuestError";
import { addItems } from "@/utils/quests/addItems";
import { Item } from "@/types/item";
import { rewardedQuest } from "@/utils/quests/rewardedQuest";
import { useAtom } from "jotai";

const QuestPage = () => {
  const { data: session, update } = useSession();
  const [error, setError] = useState("");
  const [, rewardQuest] = useAtom(rewardQuestAtom);
  const {
    quests,
    loading,
    error: errorLoading,
  } = useLoadQuests(session?.user.id ?? "");
  if (!session) return <h2>Data is missing</h2>;
  const { user } = session;

  if (loading) return <div>Loading quests...</div>;
  if (errorLoading)
    return <div>Error loading quests: {errorLoading.message}</div>;

  const handleGetReward = async (
    questFrom: string,
    questRewards: Item[],
    questId: string
  ) => {
    const npcs = mapData.find((e) => e.name === user.location)?.npcs;
    const isNpcHere = npcs?.includes(questFrom);

    console.log(`There are ${npcs} is ${questFrom} amonh them? ${isNpcHere}`);
    if (!isNpcHere) {
      setError(
        `You are in wrong location ${questFrom} is waiting for you in different place.`
      );
    }
    const newItems = await addItems(questRewards, user.id);
    const updatedQuest = await rewardedQuest(questId);

    if (newItems && updatedQuest) {
      rewardQuest(questId);
      await update({
        ...session,
        user: {
          ...session.user,
          items: newItems,
        },
      });

      console.log("items added: ", newItems);
    }
  };

  const handleObjectiveLabel = (e: string) => {
    switch (e) {
      case "eliminatePokemon":
        return "eliminate";
      case "catchPokemon":
        return "catch";
      default:
        return "What?";
    }
  };

  return (
    <div className="container-quests">
      <h2 className="headline-quests">Quests</h2>
      {quests.length === 0 ? (
        <p>No quests available.</p>
      ) : (
        <ul className="list-quests">
          {quests.map((quest) => (
            <li
              key={quest.id}
              className={quest.rewarded ? "quest rewarded" : "quest"}
            >
              <h3 className="quest-name">{quest.name}</h3>
              <p className="quest-description">{quest.description}</p>
              <p className="quest-from">From: {quest.from}</p>
              {quest.location && (
                <p className="quest-location">Location: {quest.location}</p>
              )}
              <p className="quest-status">
                Status: {quest.completed ? "Completed" : "In Progress"}
              </p>

              <h4 className="quest-objectives">Objectives:</h4>
              <ul className="list-objectives">
                {quest.objectives.map((objective, index) => (
                  <li key={index} className="objective">
                    {` ${handleObjectiveLabel(objective.type)}: ${
                      objective.target
                    }
                    ${objective.currentAmount}/${objective.requiredAmount}`}
                    {objective.completed && " ✔"}
                  </li>
                ))}
              </ul>
              {quest.completed && (
                <>
                  {!quest.rewarded && (
                    <button
                      className="button-primary"
                      onClick={() =>
                        handleGetReward(quest.from, quest.rewards, quest.id)
                      }
                      disabled={quest.rewarded}
                    >
                      get reward
                    </button>
                  )}
                </>
              )}
              {error !== "" && <QuestError error={error} setError={setError} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestPage;
