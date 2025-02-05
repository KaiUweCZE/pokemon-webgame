import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "@/components/ui/primitives/button";
import { useLocationStore } from "@/store/location-store";

export const PokecenterDialog = () => {
  const { data: user } = useCurrentUser();
  const { closeDialog, setActionInProgress } = useLocationStore();

  const handleHeal = async () => {
    try {
      setActionInProgress(true);
      // TODO: Implementace léčení
      closeDialog();
    } catch (error) {
      console.error("Healing failed:", error);
    } finally {
      setActionInProgress(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-amber-100">
        <p>Welcome to the Pokémon Center!</p>
        <p className="mt-2">Would you like to heal your Pokémon?</p>
      </div>
      <div className="grid gap-3">
        <Button onClick={handleHeal} variant="basic" className="w-full">
          Heal Pokémon
        </Button>
        <Button onClick={closeDialog} variant="basic" className="w-full">
          Leave
        </Button>
      </div>
    </div>
  );
};
