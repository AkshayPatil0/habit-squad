import { PropsWithChildren } from "react";

export default function PageLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative w-full max-w-md mx-auto overflow-hidden bg-surface-950 font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col items-center">
      {children}
    </div>
  );
}
