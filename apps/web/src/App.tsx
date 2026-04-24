import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useAuthStore } from "./store/authStore";
import AppLayout from "./layouts/AppLayout";
import OnboardingPage from "./pages/OnboardingPage";
import LoginForm from "./components/Auth/LoginForm";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterForm from "./components/Auth/RegisterForm";
import ResetPasswordForm from "./components/Auth/ResetPasswordForm";
import SquadOnboardingPage from "./pages/SquadOnboardingPage";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { user: storeUser } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to={`/auth/login?redirect=${encodeURIComponent(location.pathname + location.search)}`}
        replace
      />
    );
  }

  if (
    storeUser &&
    storeUser.groups &&
    storeUser.groups.length === 0 &&
    location.pathname !== "/squad-onboarding"
  ) {
    return <Navigate to="/squad-onboarding" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            <Navigate to="/app/home" replace />
          ) : (
            <Navigate to="/onboarding" replace />
          )
        }
      />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/auth" element={<AuthPage />}>
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="reset-password" element={<ResetPasswordForm />} />
      </Route>
      <Route
        path="/squad-onboarding"
        element={
          <PrivateRoute>
            <SquadOnboardingPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/app"
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<HomePage />} />
        <Route path="activity" element={<ActivityPage />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/app" replace />} />
    </Routes>
  );
}

import { Toaster } from "sonner";
import ActivityPage from "./pages/ActivityPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "hsl(var(--background))",
              color: "hsl(var(--foreground))",
              border: "1px solid hsl(var(--border))",
            },
            className: "my-toast-class",
            classNames: {
              toast:
                "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg text-gray-900 dark:text-gray-100 font-medium font-sans",
              title: "text-base font-semibold",
              description: "text-sm text-gray-500 dark:text-gray-400",
              actionButton:
                "bg-accent text-white rounded-md px-3 py-2 text-sm font-medium",
              cancelButton:
                "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md px-3 py-2 text-sm font-medium",
              success: "text-green-600 dark:text-green-400",
              error: "text-red-600 dark:text-red-400",
              warning: "text-yellow-600 dark:text-yellow-400",
              info: "text-blue-600 dark:text-blue-400",
            },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}
