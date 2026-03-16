import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "@/utils/toast";

export default function SocialLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/app/home");
    } catch (err: any) {
      console.error("Google sign-in error:", err);
      toast.error(
        "Sign in failed",
        err.message || "Failed to sign in with Google.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Divider */}
      <div className="flex items-center gap-4 my-8">
        <div className="h-px bg-surface-200 dark:bg-surface-900 flex-1"></div>
        <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          or continue with
        </span>
        <div className="h-px bg-surface-200 dark:bg-surface-900 flex-1"></div>
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="flex items-center justify-center gap-3 h-14 rounded-xl border-2 border-surface-100 dark:border-surface-800 hover:bg-surface-50 dark:hover:bg-surface-900/50 transition-colors disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            ></path>
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            ></path>
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            ></path>
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            ></path>
          </svg>
          <span className="font-bold text-slate-700 dark:text-slate-300">
            Google
          </span>
        </button>
        <button
          className="flex items-center justify-center gap-3 h-14 rounded-xl border-2 border-surface-100 dark:border-surface-800 hover:bg-surface-50 dark:hover:bg-surface-900/50 transition-colors opacity-50 cursor-not-allowed"
          disabled
        >
          <svg
            className="w-5 h-5 fill-surface-900 dark:fill-white"
            viewBox="0 0 24 24"
          >
            <path d="M17.05 20.28c-.96.95-2.04 1.44-3.23 1.44-1.24 0-2.32-.47-3.23-1.42-.92-.95-1.38-2.06-1.38-3.34 0-1.28.46-2.39 1.38-3.34.91-.95 1.99-1.42 3.23-1.42 1.25 0 2.33.47 3.23 1.42.92.95 1.38 2.06 1.38 3.34 0 1.28-.46-2.39-1.38 3.34zm-1.88-14.86c0 .87-.33 1.62-.99 2.25-.66.63-1.45.95-2.37.95s-1.71-.32-2.37-.95c-.66-.63-.99-1.38-.99-2.25s.33-1.62.99-2.25c.66-.63 1.45-.95 2.37-.95s1.71.32 2.37.95c.66.63.99 1.38.99 2.25z"></path>
            <path d="M12.06 10.19c-3.13 0-5.74 2.5-5.74 5.58 0 3.08 2.61 5.58 5.74 5.58 3.13 0 5.74-2.5 5.74-5.58 0-3.08-2.61-5.58-5.74-5.58zm0 9.16c-2.03 0-3.68-1.61-3.68-3.58 0-1.97 1.65-3.58 3.68-3.58 2.03 0 3.68 1.61 3.68 3.58 0 1.97-1.65 3.58-3.68 3.58z"></path>
          </svg>
          <span className="font-bold text-slate-700 dark:text-slate-300">
            Apple
          </span>
        </button>
      </div>
    </>
  );
}
