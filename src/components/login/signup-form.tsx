"use client";
import { useRouter } from "next/navigation";
import { signUp } from "@/app/login/action";
import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";
import { useHandleForm } from "@/hooks/use-handle-form";
import { FormMessage } from "@/components/ui/form-message";
import GradientButton from "../ui/primitives/gradient-button";
import { useToast } from "../providers/toast-provider";

export default function SignUpForm() {
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
      const result = await signUp(formData);

      if (result?.error) {
        setErrors(typeof result.error === "string" ? { general: [result.error] } : result.error);
        showToast(result.error, "error");
      } else {
        setSuccess(true);
        showToast("Account created successfully", "success");
      }
    } catch (error) {
      setErrors({ general: ["Unexpected error"] });
      showToast("Unexpected error", "error");
    } finally {
      reset();
    }
  };

  return (
    <>
      <h1 className="z-10 text-center text-2xl font-medium text-amber-50">Create an Account</h1>
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
            placeholder="Choose a username"
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
            placeholder="Choose a password"
            aria-describedby="password-error"
            aria-invalid={!!errors.password}
            autoComplete="new-password"
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
          <span className="text-amber-50">{isSubmitting ? "Creating account..." : "Sign Up"}</span>
        </GradientButton>
      </form>
    </>
  );
}
