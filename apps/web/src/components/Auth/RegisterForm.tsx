import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import BlendedImage from "@/components/ui/BlendedImage";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";

const registerformSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  terms: z
    .boolean()
    .refine((val) => val === true, "You must accept the terms and conditions"),
});

type RegisterFormValues = z.infer<typeof registerformSchema>;

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerformSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setAuthError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      await updateProfile(userCredential.user, {
        displayName: data.name,
      });
      // Note: Initial Firestore user document creation can be added here or via a Cloud Function
      navigate("/app/home");
    } catch (err: any) {
      console.error("Registration error:", err);
      if (err.code === "auth/email-already-in-use") {
        setAuthError("Email is already in use.");
      } else {
        setAuthError(
          err.message || "Failed to create account. Please try again.",
        );
      }
    }
  };

  return (
    <>
      {/* Illustration Section */}
      <div className="relative w-full overflow-hidden mb-6 flex items-center justify-center">
        <BlendedImage
          className="h-36 aspect-square rounded-full"
          src="/images/register.jpg"
        />
      </div>

      <h1 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight mb-6 text-center">
        Join the Habit Squad
      </h1>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {authError && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm font-medium">
            {authError}
          </div>
        )}

        <div className="flex flex-col">
          <label className="text-slate-700 dark:text-slate-300 text-sm font-medium pb-1 ml-1">
            Full Name
          </label>
          <div className="relative">
            <input
              {...register("name")}
              className={cn(
                "input-field",
                errors.name
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-surface-200 dark:border-surface-800 focus:ring-accent focus:border-transparent",
              )}
              placeholder="Alex Cooper"
              type="text"
            />
          </div>
          {errors.name && (
            <p className="text-sm text-red-500 ml-1 mt-1 font-medium">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-slate-700 dark:text-slate-300 text-sm font-medium pb-1 ml-1">
            Email
          </label>
          <div className="relative">
            <input
              {...register("email")}
              className={cn(
                "input-field",
                errors.email
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-surface-200 dark:border-surface-800 focus:ring-accent focus:border-transparent",
              )}
              placeholder="alex@habit.com"
              type="email"
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500 ml-1 mt-1 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-slate-700 dark:text-slate-300 text-sm font-medium pb-1 ml-1">
            Password
          </label>
          <div className="relative flex items-center">
            <input
              {...register("password")}
              className={cn(
                "input-field pr-12",
                errors.password
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-surface-200 dark:border-surface-800 focus:ring-accent focus:border-transparent",
              )}
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
            />
            <button
              type="button"
              className="absolute right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500 ml-1 mt-1 font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Checkbox */}
        <div className="flex flex-col">
          <div className="flex items-start gap-3 py-2 px-1">
            <input
              {...register("terms")}
              className={`mt-1 h-5 w-5 shrink-0 rounded-md text-accent focus:ring-accent ${
                errors.terms
                  ? "border-red-500 focus:ring-red-500"
                  : "border-surface-300"
              }`}
              id="terms"
              type="checkbox"
            />
            <label
              className="text-sm text-slate-600 dark:text-slate-400 leading-tight"
              htmlFor="terms"
            >
              I agree to the{" "}
              <Link className="text-accent font-medium hover:underline" to="#">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link className="text-accent font-medium hover:underline" to="#">
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.terms && (
            <p className="text-sm text-red-500 ml-1 font-medium">
              {errors.terms.message}
            </p>
          )}
        </div>

        {/* Primary CTA */}
        <button
          disabled={isSubmitting}
          className="w-full btn-primary"
          type="submit"
        >
          {isSubmitting ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <SocialLogin />

      {/* Footer Link */}
      <div className="text-center mt-8 pb-4">
        <p className="text-slate-600 dark:text-slate-400">
          Already have an account?
          <Link
            className="text-accent font-bold hover:underline ml-1"
            to="/auth/login"
          >
            Log In
          </Link>
        </p>
      </div>
    </>
  );
}
