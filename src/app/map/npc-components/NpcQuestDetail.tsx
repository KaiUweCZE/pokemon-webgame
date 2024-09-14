import { Quest } from "@/types/quest";

interface QuestDetailProps {
  quest: Quest;
}

const NpcQuestDetail = ({ quest }: QuestDetailProps) => {
  return (
    <div className="quest-detail">
      <p className="description">{quest.description}</p>
      <div className="quest-info">
        <p>Duration: {quest.duration} days</p>
        {quest.location && (
          <p>
            <strong>Location:</strong> {quest.location}
          </p>
        )}

        <div className="objectives">
          <span>To do:</span>
          <ul>
            {quest.objectives.map((objective, index) => (
              <li
                key={index}
                className={objective.completed ? "completed" : ""}
              >
                {objective.type === "eliminatePokemon" ? "eliminate" : ""}:
                {` ${objective.target}
               (${objective.requiredAmount})`}
              </li>
            ))}
          </ul>
        </div>
        <div className="rewards">
          <span>Rewards:</span>
          <ul>
            {quest.rewards.map((reward, index) => (
              <li key={index}>
                {reward.count}x {reward.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NpcQuestDetail;
