import { cn } from "@/utils/cn";
import { Button } from "../ui/primitives/button";
import PartsOfDay from "./parts-of-day";
import { Calendar, Loader2 } from "lucide-react";
import { useModal } from "../providers/modal-provider";
import { useCurrentUser } from "@/hooks/use-current-user";
import { GradientBackground } from "../ui/primitives/gradient-background";
import GradientButton from "../ui/primitives/gradient-button";
import { useDay } from "@/hooks/use-day";
import LoadingDots from "../ui/loading/loading-dots";

interface AboutDayProps {
  isOpen: boolean;
  isClosing: boolean;
}

const AboutDay = ({ isOpen, isClosing }: AboutDayProps) => {
  const { showModal, hideModal } = useModal();
  const { data: user, isLoading, error } = useCurrentUser();
  const { nextDay, isUpdating } = useDay();

  const handleNextDay = () => {
    nextDay();
    hideModal();
  };

  const handleModal = () => {
    showModal({
      title: "Do you want to go to the next day?",
      isLoading: isUpdating,
      children: (
        <Button
          withRipple
          //size="icon"
          disabled={isUpdating}
          onClick={handleNextDay}
          className="flex gap-2 place-self-center"
        >
          <span className="z-10 text-amber-100">Next Day</span>
        </Button>
      ),
    });
  };

  return (
    <div
      className={cn(
        "about-day primary-shadow absolute mb-2 w-semi rounded-md border border-accent/60 bg-primary-dark/80 p-4 backdrop-blur-md",
        isOpen ? "visible opacity-100" : "invisible opacity-0",
        isClosing && "deactive"
      )}
    >
      <div className="grid gap-2">
        <div className="text-md flex items-center gap-2 text-amber-100">
          <Calendar className="h-4 w-4" />
          <span>{`Current day: ${user?.day}`}</span>
        </div>
        <PartsOfDay currentPartOfDay={user?.partOfDay ?? 0} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <GradientButton
          onClick={handleModal}
          gradientVariant="accent"
          className="border border-accent/30 bg-accent/20"
        >
          <span className="text-amber-100">Next Day</span>
        </GradientButton>
      </div>
      <GradientBackground variant="light" direction="bottom-left" />
    </div>
  );
};

export default AboutDay;
