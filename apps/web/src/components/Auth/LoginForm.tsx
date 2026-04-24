import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { Eye, EyeOff, LogIn, Mail, Lock, Loader2 } from "lucide-react";
import BlendedImage from "../ui/BlendedImage";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";

const loginformSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormValues = z.infer<typeof loginformSchema>;

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginformSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      
      const searchParams = new URLSearchParams(location.search);
      const redirectUrl = searchParams.get("redirect") || "/app/home";
      navigate(redirectUrl);
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.code === "auth/invalid-credential") {
        setAuthError("Invalid email or password.");
      } else {
        setAuthError(
          err.message || "Failed to log in. Please check your credentials.",
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
          src="/images/login.png"
        />
      </div>

      <h1 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight mb-6 text-center">
        Welcome Back
      </h1>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {authError && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm font-medium">
            {authError}
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
            Email
          </label>
          <div className="relative flex items-center">
            <Mail
              className={`absolute left-4 w-5 h-5 pointer-events-none transition-colors ${
                errors.email ? "text-red-500" : "text-slate-400"
              }`}
            />
            <input
              {...register("email")}
              className={cn(
                "input-field pl-12",
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-transparent focus:border-accent",
              )}
              placeholder="hello@example.com"
              type="email"
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500 ml-1 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center ml-1">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Password
            </label>
            <Link
              className="text-xs font-bold text-accent hover:underline"
              to="/auth/reset-password"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative flex items-center">
            <Lock
              className={`absolute left-4 w-5 h-5 pointer-events-none transition-colors ${
                errors.password ? "text-red-500" : "text-slate-400"
              }`}
            />
            <input
              {...register("password")}
              className={cn(
                "input-field px-12",
                errors.password
                  ? "border-red-500 focus:border-red-500"
                  : "border-transparent focus:border-accent",
              )}
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
            />
            <button
              className="absolute right-4 text-slate-400 hover:text-accent transition-colors"
              type="button"
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
            <p className="text-sm text-red-500 ml-1 font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full btn-primary flex items-center justify-center gap-2"
          type="submit"
        >
          {isSubmitting ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              Log In
              <LogIn className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      <SocialLogin />
      {/* Footer Link */}
      <div className="text-center mt-8 pb-4">
        <p className="text-slate-600 dark:text-slate-400">
          New here?
          <Link
            className="text-accent font-bold hover:underline ml-1"
            to="/auth/register"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}
