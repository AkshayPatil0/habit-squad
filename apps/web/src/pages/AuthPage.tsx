import { Outlet, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageLayout from "@/layouts/PageLayout";

export default function AuthPage() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-accent/10 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] -z-10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-80 h-80 bg-accent/5 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] -z-10 blur-3xl pointer-events-none"></div>

      <div className="relative w-full h-full flex flex-col max-w-md bg-white dark:bg-surface-950 rounded-xl shadow-2xl overflow-hidden border border-accent/10 z-10">
        {/* Back button */}
        <button
          onClick={() => navigate("/onboarding")}
          className="absolute top-3 left-3 z-10 text-white flex h-10 w-10 shrink-0 items-center justify-center bg-surface-700 rounded-full cursor-pointer hover:bg-accent/20 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="p-6 flex-1 min-h-0 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </PageLayout>
  );
}
