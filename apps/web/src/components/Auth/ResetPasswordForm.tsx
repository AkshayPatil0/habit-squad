import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { Mail, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import BlendedImage from "../ui/BlendedImage";

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err: any) {
      console.error("Password reset error:", err);
      setError(err.message || "Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Illustration Section */}
      <div className="relative w-full overflow-hidden mb-6 flex items-center justify-center">
        <BlendedImage
          className="h-36 aspect-square rounded-full"
          src="/images/forgot-password.png"
        />
      </div>
      <h1 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight mb-2 text-center mt-4">
        Reset Password
      </h1>
      <p className="text-slate-600 dark:text-slate-400 text-center mb-6 text-sm">
        Enter your email address and we'll send you a link to reset your
        password.
      </p>

      {success ? (
        <div className="flex flex-col items-center justify-center space-y-4 py-6">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-500 rounded-full flex items-center justify-center mb-2">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <p className="text-center font-medium text-slate-800 dark:text-slate-200">
            Reset Link Sent!
          </p>
          <p className="text-center text-sm text-slate-600 dark:text-slate-400 max-w-xs">
            We've sent an email to <span className="font-bold">{email}</span>{" "}
            with instructions to reset your password.
          </p>
          <div className="w-full pt-4">
            <Link
              to="/auth/login"
              className="w-full h-14 bg-background-light dark:bg-surface-900 border-2 border-surface-200 dark:border-surface-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl active:scale-[0.98] transition-all flex items-center justify-center"
            >
              Return to Login
            </Link>
          </div>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 text-slate-400 w-5 h-5 pointer-events-none" />
              <input
                required
                className="w-full pl-12 pr-4 h-14 bg-background-light dark:bg-surface-900 border-2 border-transparent focus:border-accent focus:ring-0 rounded-xl transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none"
                placeholder="hello@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full h-14 mt-4 bg-gradient-brand text-white font-bold rounded-xl shadow-lg shadow-accent/30 hover:shadow-accent/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
            type="submit"
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                Send Reset Link
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      )}

      {!success && (
        <div className="text-center mt-8 pb-4">
          <p className="text-slate-600 dark:text-slate-400">
            Remember your password?
            <Link
              className="text-accent font-bold hover:underline ml-1"
              to="/auth/login"
            >
              Log In
            </Link>
          </p>
        </div>
      )}
    </>
  );
}
