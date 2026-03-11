import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { ArrowLeft, Coffee, Eye, LogIn, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // mock successful login
    setAuth({ _id: '1', name: 'Alex Cooper', email: 'hello@example.com', avatar: '', xp: 250, coins: 150, groups: [] }, 'mock_jwt_token_for_mvp');
    navigate('/app/home');
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
      <div className="relative w-full max-w-[480px] bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-primary/10 z-10">
        
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-primary/5">
          <button onClick={() => navigate(-1)} className="text-primary cursor-pointer hover:bg-primary/10 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-primary text-lg font-bold tracking-tight">HabitHub</h2>
          <div className="w-10"></div>
        </div>

        <div className="px-8 pt-8 pb-4 flex flex-col items-center text-center">
          <div className="w-48 h-48 bg-primary/10 rounded-full flex items-center justify-center mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10"></div>
            <img className="w-full h-full object-cover rounded-full mix-blend-multiply opacity-90 relative z-0" alt="Happy person" src="/images/login.png" />
            <div className="absolute bottom-2 right-6 bg-white dark:bg-slate-800 p-2 rounded-full shadow-lg border-2 border-primary/20 z-20">
              <Coffee className="w-5 h-5 text-primary" />
            </div>
          </div>
          <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-bold leading-tight mb-2">Welcome Back!</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Your habits missed you. Let's get back on track!</p>
        </div>

        <form className="px-8 pb-10 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 text-slate-400 w-5 h-5 pointer-events-none" />
              <input required className="w-full pl-12 pr-4 h-14 bg-background-light dark:bg-slate-800 border-2 border-transparent focus:border-primary focus:ring-0 rounded-xl transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none" placeholder="hello@example.com" type="email" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
              <Link className="text-xs font-bold text-primary hover:underline" to="#">Forgot Password?</Link>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 text-slate-400 w-5 h-5 pointer-events-none" />
              <input required className="w-full pl-12 pr-12 h-14 bg-background-light dark:bg-slate-800 border-2 border-transparent focus:border-primary focus:ring-0 rounded-xl transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none" placeholder="••••••••" type="password" />
              <button className="absolute right-4 text-slate-400 hover:text-primary" type="button">
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>

          <button className="w-full h-14 bg-gradient-to-r from-primary to-[#7c7cf8] text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2" type="submit">
            Log In
            <LogIn className="w-5 h-5" />
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center px-2">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-900 px-4 text-slate-500 font-medium">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 h-12 rounded-xl border-2 border-slate-100 dark:border-slate-800 hover:bg-background-light dark:hover:bg-slate-800 transition-colors" type="button">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              <span className="text-sm font-bold">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 h-12 rounded-xl border-2 border-slate-100 dark:border-slate-800 hover:bg-background-light dark:hover:bg-slate-800 transition-colors" type="button">
              <svg className="w-5 h-5 fill-slate-900 dark:fill-white" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.96.95-2.04 1.44-3.23 1.44-1.24 0-2.32-.47-3.23-1.42-.92-.95-1.38-2.06-1.38-3.34 0-1.28.46-2.39 1.38-3.34.91-.95 1.99-1.42 3.23-1.42 1.25 0 2.33.47 3.23 1.42.92.95 1.38 2.06 1.38 3.34 0 1.28-.46 2.39-1.38 3.34zm-1.88-14.86c0 .87-.33 1.62-.99 2.25-.66.63-1.45.95-2.37.95s-1.71-.32-2.37-.95c-.66-.63-.99-1.38-.99-2.25s.33-1.62.99-2.25c.66-.63 1.45-.95 2.37-.95s1.71.32 2.37.95c.66.63.99 1.38.99 2.25z"></path>
                <path d="M12.06 10.19c-3.13 0-5.74 2.5-5.74 5.58 0 3.08 2.61 5.58 5.74 5.58 3.13 0 5.74-2.5 5.74-5.58 0-3.08-2.61-5.58-5.74-5.58zm0 9.16c-2.03 0-3.68-1.61-3.68-3.58 0-1.97 1.65-3.58 3.68-3.58 2.03 0 3.68 1.61 3.68 3.58 0 1.97-1.65 3.58-3.68 3.58z"></path>
              </svg>
              <span className="text-sm font-bold">Apple</span>
            </button>
          </div>
        </form>

        <div className="bg-background-light dark:bg-slate-800/50 py-6 text-center border-t border-slate-100 dark:border-slate-800 relative z-10">
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            New here? 
            <Link className="text-primary font-bold hover:underline ml-1" to="/register">Create Account</Link>
          </p>
        </div>

      </div>

      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none z-0"></div>
    </div>
  );
}
