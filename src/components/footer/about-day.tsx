import { cn } from "@/utils/cn";
import { Button } from "../ui/primitives/button";
import PartsOfDay from "./parts-of-day";
import { Calendar } from "lucide-react";
import { useModal } from "../providers/modal-provider";
import { useCurrentUser } from "@/hooks/use-current-user";
import { GradientBackground } from "../ui/primitives/gradient-background";
import GradientButton from "../ui/primitives/gradient-button";

interface AboutDayProps {
  isOpen: boolean;
  isClosing: boolean;
}

const AboutDay = ({ isOpen, isClosing }: AboutDayProps) => {
  const { showModal, hideModal } = useModal();
  const { data: user, isLoading, error } = useCurrentUser();

  const handleModal = () => {
    showModal({
      title: "Do you want to go to the next day?",

      children: (
        <Button withRipple rippleColor="bg-slate-950">
          <span
            className="z-10 text-amber-100"
            onClick={() => console.log("About user: ", user?.day, user?.partOfDay)}
          >
            Next Day
          </span>
        </Button>
      ),
    });
  };

  return (
    <div
      className={cn(
        "about-day primary-shadow absolute mb-2 w-semi rounded-md border-2 border-border-secondary bg-secondary p-4",
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
        <GradientButton onClick={handleModal} gradientVariant="accent">
          <span className="text-amber-100">Next Day</span>
        </GradientButton>
      </div>
      <GradientBackground variant="light" direction="bottom-left" />
    </div>
  );
};

export default AboutDay;
