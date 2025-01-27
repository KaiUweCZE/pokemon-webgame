"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";
import { useHandleForm } from "@/hooks/use-handle-form";
import { FormMessage } from "@/components/ui/form-message";
import { Toast } from "@/components/ui/toast";
import { queryClient } from "@/lib/providers";

export default function SignInForm() {
  const router = useRouter();
  const { errors, isSubmitting, setErrors, startSubmission, reset, success, setSuccess } =
    useHandleForm();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startSubmission();
    setErrors({});
    try {
      const formData = new FormData(event.currentTarget);

      console.log("Form data:", {
        name: formData.get("name"),
        password: formData.get("password"),
      });

      const result = await signIn("credentials", {
        name: formData.get("name") as string,
        password: formData.get("password") as string,
        redirect: false,
      });

      if (result?.error) {
        setErrors({ general: ["Invalid username or password"] });
      } else {
        setSuccess(true);
        const event = new Event("visibilitychange");
        document.dispatchEvent(event);

        queryClient.removeQueries();
        //queryClient.invalidateQueries({ queryKey: ["current-user"] });
        window.location.href = `/`;
      }
    } catch (error) {
      setErrors({ general: ["Unexpected error occurred"] });
    } finally {
      reset();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full space-y-4" noValidate>
        <div className="space-y-2">
          <Input
            id="username"
            type="text"
            name="name"
            required
            label="Username"
            placeholder="Enter your username"
            aria-describedby="username-error"
            aria-invalid={!!errors.name}
            autoComplete="username"
          />
          <FormMessage id="username-error" message={errors?.name} className="px-1" />
        </div>
        <div className="space-y-2">
          <Input
            id="password"
            type="password"
            name="password"
            required
            label="Password"
            placeholder="Enter your password"
            aria-describedby="password-error"
            aria-invalid={!!errors.password}
            autoComplete="current-password"
          />
          <FormMessage id="password-error" message={errors?.password} className="px-1" />
        </div>
        <Button
          type="submit"
          variant="secondary"
          size="default"
          className="w-full"
          disabled={isSubmitting}
        >
          <span className="text-amber-50">{isSubmitting ? "Signing in..." : "Sign In"}</span>
        </Button>
        <FormMessage id="form-errors" message={errors?.general} className="mt-4" />
      </form>
      {success && (
        <Toast
          message="Login successful! Redirecting..."
          variant="success"
          isVisible={success}
          onClose={() => setSuccess(false)}
        />
      )}
    </>
  );
}
