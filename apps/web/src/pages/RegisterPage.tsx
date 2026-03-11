import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Coffee, Eye } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function RegisterPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // mock successful registration
    setAuth({ _id: '1', name: 'Alex Cooper', email: 'alex@example.com', avatar: '', xp: 0, coins: 0, groups: [] }, 'mock_jwt_token_for_mvp');
    navigate('/app/home');
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-primary/10 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] -z-10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-80 h-80 bg-primary/5 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] -z-10 blur-3xl pointer-events-none"></div>

      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-primary/10 z-10">
        
        {/* Top App Bar Style Header */}
        <div className="flex items-center bg-white dark:bg-slate-900 p-6 pb-2 justify-between">
          <button onClick={() => navigate(-1)} className="text-primary flex h-10 w-10 shrink-0 items-center justify-center bg-primary/10 rounded-full cursor-pointer hover:bg-primary/20 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight flex-1 ml-4">Sign Up</h2>
        </div>

        <div className="p-6 pt-2">
          {/* Illustration Section */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-dashed border-primary/20 flex items-center justify-center">
            <div className="text-center z-10">
              <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-2 flex items-center justify-center text-white shadow-lg shadow-primary/30">
                <Coffee className="w-10 h-10" />
              </div>
              <p className="text-primary font-bold text-sm">Welcome to the Squad!</p>
            </div>
            {/* Abstract Image Tag */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-cover bg-center" style={{ backgroundImage: "url('/images/register.png')" }}></div>
          </div>

          <h1 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight mb-6">Join the Habit Squad</h1>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-slate-700 dark:text-slate-300 text-sm font-medium pb-1 ml-1">Full Name</label>
              <div className="relative">
                <input required className="w-full rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 h-14 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm outline-none" placeholder="Alex Cooper" type="text" />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-slate-700 dark:text-slate-300 text-sm font-medium pb-1 ml-1">Email</label>
              <div className="relative">
                <input required className="w-full rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 h-14 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm outline-none" placeholder="alex@habit.com" type="email" />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-slate-700 dark:text-slate-300 text-sm font-medium pb-1 ml-1">Password</label>
              <div className="relative flex items-center">
                <input required className="w-full rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 h-14 pl-4 pr-12 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm outline-none" placeholder="••••••••" type="password" />
                <button type="button" className="absolute right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-3 py-2 px-1">
              <input required className="mt-1 h-5 w-5 shrink-0 rounded-md border-slate-300 text-primary focus:ring-primary" id="terms" type="checkbox" />
              <label className="text-sm text-slate-600 dark:text-slate-400 leading-tight" htmlFor="terms">
                I agree to the <Link className="text-primary font-medium hover:underline" to="#">Terms of Service</Link> and <Link className="text-primary font-medium hover:underline" to="#">Privacy Policy</Link>
              </label>
            </div>

            {/* Primary CTA */}
            <button className="w-full h-14 rounded-xl bg-gradient-to-r from-primary to-[#7c7cf8] text-white font-bold text-lg shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all" type="submit">
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">or sign up with</span>
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 h-14 rounded-xl border-2 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              <span className="font-bold text-slate-700 dark:text-slate-300">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 h-14 rounded-xl border-2 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <svg className="w-5 h-5 fill-slate-900 dark:fill-white" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.96.95-2.04 1.44-3.23 1.44-1.24 0-2.32-.47-3.23-1.42-.92-.95-1.38-2.06-1.38-3.34 0-1.28.46-2.39 1.38-3.34.91-.95 1.99-1.42 3.23-1.42 1.25 0 2.33.47 3.23 1.42.92.95 1.38 2.06 1.38 3.34 0 1.28-.46 2.39-1.38 3.34zm-1.88-14.86c0 .87-.33 1.62-.99 2.25-.66.63-1.45.95-2.37.95s-1.71-.32-2.37-.95c-.66-.63-.99-1.38-.99-2.25s.33-1.62.99-2.25c.66-.63 1.45-.95 2.37-.95s1.71.32 2.37.95c.66.63.99 1.38.99 2.25z"></path>
                <path d="M12.06 10.19c-3.13 0-5.74 2.5-5.74 5.58 0 3.08 2.61 5.58 5.74 5.58 3.13 0 5.74-2.5 5.74-5.58 0-3.08-2.61-5.58-5.74-5.58zm0 9.16c-2.03 0-3.68-1.61-3.68-3.58 0-1.97 1.65-3.58 3.68-3.58 2.03 0 3.68 1.61 3.68 3.58 0 1.97-1.65 3.58-3.68 3.58z"></path>
              </svg>
              <span className="font-bold text-slate-700 dark:text-slate-300">Apple</span>
            </button>
          </div>

          {/* Footer Link */}
          <div className="text-center mt-8 pb-4">
            <p className="text-slate-600 dark:text-slate-400">
              Already have an account? 
              <Link className="text-primary font-bold hover:underline ml-1" to="/login">Log In</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
