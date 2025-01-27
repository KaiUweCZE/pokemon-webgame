"use client";
import { useRouter } from "next/navigation";
import { signUp } from "./action";
import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";
import { useHandleForm } from "@/hooks/use-handle-form";
import { FormMessage } from "@/components/ui/form-message";
import { Toast } from "@/components/ui/toast";

export default function SignUpForm() {
  const router = useRouter();
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
      } /*else {
        router.push("/dashboard");
      }*/
      setSuccess(true);
    } catch (error) {
      setErrors({ general: ["Unexpected error"] });
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
            required
            label="Password"
            placeholder="Choose a password"
            aria-describedby="password-error"
            aria-invalid={!!errors.password}
            autoComplete="new-password"
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
          <span className="text-amber-50">{isSubmitting ? "Creating account..." : "Sign Up"}</span>
        </Button>{" "}
        <FormMessage id="form-errors" message={errors?.general} className="mt-4" />
      </form>
      {success && (
        <Toast
          message="Account created successfully"
          variant="success"
          isVisible={success}
          onClose={() => setSuccess(false)}
        />
      )}
    </>
  );
}
