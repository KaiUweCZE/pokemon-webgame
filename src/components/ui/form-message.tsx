// components/ui/form-message.tsx
import { cn } from "@/utils/cn"; // Předpokládám, že máte utility třídy

type FormMessageProps = {
  id: string;
  message?: string | string[];
  className?: string;
};

export function FormMessage({ id, message, className }: FormMessageProps) {
  if (!message) return null;

  const messages = Array.isArray(message) ? message : [message];

  return (
    <div
      id={id}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      className={cn("flex items-start gap-2 text-sm text-red-600 dark:text-red-400", className)}
    >
      <svg
        aria-hidden="true"
        className="mt-0.5 h-4 w-4 shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
      <div className="space-y-1">
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
}
