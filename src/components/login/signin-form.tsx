"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";
import { useHandleForm } from "@/hooks/use-handle-form";
import { FormMessage } from "@/components/ui/form-message";
import { queryClient } from "@/lib/providers";
import { getCurrentUser } from "@/utils/actions/get-current-user";
import GradientButton from "../ui/primitives/gradient-button";
import { useToast } from "../providers/toast-provider";

export default function SignInForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const { errors, isSubmitting, setErrors, startSubmission, reset, success, setSuccess } =
    useHandleForm();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startSubmission();
    setErrors({});
    try {
      const formData = new FormData(event.currentTarget);

      const result = await signIn("credentials", {
        name: formData.get("name") as string,
        password: formData.get("password") as string,
        redirect: false,
      });

      if (result?.error) {
        setErrors({ general: ["Invalid username or password"] });
        showToast("Invalid credentials", "error");
      } else {
        setSuccess(true);
        showToast("Signed in successfully", "success");

        const event = new Event("visibilitychange");
        document.dispatchEvent(event);

        queryClient.removeQueries();

        // Get user data and check chapter
        const userData = await getCurrentUser();
        if (userData?.chapter === 0) {
          window.location.href = `/intro`;
        } else {
          window.location.href = `/`;
        }
      }
    } catch (error) {
      setErrors({ general: ["Unexpected error occurred"] });
    } finally {
      reset();
    }
  };

  return (
    <>
      <h1 className="z-10 text-center text-2xl font-medium text-amber-50">Welcome Back</h1>
      <form onSubmit={handleSubmit} className="w-full space-y-4" noValidate>
        <div className="space-y-2">
          <Input
            id="username"
            type="text"
            name="name"
            variant="primary"
            shadow
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
            variant="primary"
            shadow
            required
            label="Password"
            placeholder="Enter your password"
            aria-describedby="password-error"
            aria-invalid={!!errors.password}
            autoComplete="current-password"
          />
          <FormMessage id="password-error" message={errors?.password} className="px-1" />
        </div>
        <GradientButton
          type="submit"
          buttonVariant="basic"
          gradientVariant="pink"
          intensity="low"
          direction="radial"
          size="default"
          shadow
          className="w-full bg-element hover:bg-element/60"
          disabled={isSubmitting}
        >
          <span className="text-amber-50">{isSubmitting ? "Signing in..." : "Sign In"}</span>
        </GradientButton>
      </form>
    </>
  );
}
