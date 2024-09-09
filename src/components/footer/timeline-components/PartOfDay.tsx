interface PartOfDayProps {
  partOfDay: number;
}

const PartOfDay = ({ partOfDay }: PartOfDayProps) => {
  return (
    <div className="box-step">
      <div className={partOfDay >= 1 ? "step pass" : "step"}></div>
      <div className={partOfDay >= 2 ? "step pass" : "step"}></div>
      <div className={partOfDay === 3 ? "step pass" : "step"}></div>
    </div>
  );
};

export default PartOfDay;
