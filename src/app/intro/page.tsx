"use client";

import { Button } from "@/components/ui/primitives/button";
import { useRouter } from "next/navigation";
import { updateChapter } from "@/utils/actions/update-chapter";
import { Toast } from "@/components/ui/toast";
import { useState } from "react";

export default function IntroPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleStartJourney = async () => {
    try {
      await updateChapter(1);
      router.push("/");
    } catch (err) {
      setError("Failed to start journey. Please try again.");
    }
  };

  return (
    <div className="blur-on no-nav">
      <main className="max-width mx-auto grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="w-full max-w-lg space-y-8 p-4">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold text-amber-200">Welcome, Trainer!</h1>
            <p className="text-primary-text">
              Your journey in the world of Pokémon begins here. Are you ready to become a Pokémon
              Master?
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-secondary-background rounded-lg p-6">
              <h2 className="mb-4 text-xl font-semibold text-amber-200">Getting Started</h2>
              <ul className="text-primary-text space-y-3">
                <li>• Choose your first Pokémon</li>
                <li>• Learn about battles</li>
                <li>• Explore the world</li>
                <li>• Build your team</li>
              </ul>
            </div>

            <Button
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={handleStartJourney}
            >
              <span className="text-amber-50">Start Your Journey</span>
            </Button>
          </div>
        </div>
      </main>

      {error && (
        <Toast
          message={error}
          variant="error"
          isVisible={!!error}
          onClose={() => setError(null)}
        />
      )}
    </div>
  );
}
