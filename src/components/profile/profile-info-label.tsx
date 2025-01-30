const ProfileInfoLabel = ({ label, data }: { label: string; data: string }) => {
  return (
    <div className="flex gap-2">
      <span className="text-amber-100">{label}:</span>
      <p className="text-amber-50">{data}</p>
    </div>
  );
};

export default ProfileInfoLabel;
