import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoveRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import PageLayout from "@/layouts/PageLayout";
import BlendedImage from "@/components/ui/BlendedImage";

const STEPS = [
  {
    title: (
      <>
        Build habits <br />
        <span className="text-accent">with friends</span>
      </>
    ),
    description: "Stay accountable, earn rewards, and grow together.",
    image: "/images/onboarding_1.png",
  },
  {
    title: "Track habits daily",
    description: "Daily, weekly, or custom goals tailored to your lifestyle.",
    image: "/images/onboarding_2.png",
  },
  {
    title: "Join a squad",
    description: "Join a squad, earn rewards, and grow together.",
    image: "/images/onboarding_3.png",
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
    },
    [Autoplay()],
  );

  const handleSkip = () => {
    navigate("/login");
  };

  useEffect(() => {
    emblaApi?.on("select", () => {
      setStep(emblaApi?.selectedScrollSnap() + 1);
    });
  }, [emblaApi]);

  const renderDots = () => {
    return (
      <div className="flex w-full flex-row items-center justify-center gap-3">
        {STEPS.map((_, index) => (
          <div
            key={index}
            className={`h-2.5 rounded-full transition-all duration-300 ${step === index + 1 ? "w-8 bg-accent shadow-sm shadow-accent/40" : "w-2.5 bg-accent/20"}`}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <PageLayout>
      <Decorations step={step} />
      <div className="flex min-h-dvh w-full max-w-md flex-col gap-8 overflow-y-auto overflow-x-hidden shadow-2xl bg-background-light dark:bg-background-dark justify-between py-4 pb-8">
        {/* Header / Skip Action */}
        <div className="z-10 flex items-center px-6 justify-end">
          <button
            onClick={handleSkip}
            className="flex items-center justify-end px-4 py-2 hover:bg-accent/10 rounded-full transition-colors z-20 relative"
          >
            <p className="text-accent font-bold text-base leading-normal tracking-[0.015em] cursor-pointer">
              Skip
            </p>
          </button>
        </div>

        <div className="embla__viewport flex-1 min-h-max" ref={emblaRef}>
          <div className="embla__container h-full">
            {STEPS.map((step, index) => (
              <div
                className="embla__slide flex flex-col justify-around"
                key={index}
              >
                <div className="z-10 flex w-full items-center justify-center pb-8 px-12">
                  <div className="relative w-full aspect-square max-w-[340px]">
                    <div className="absolute inset-0 bg-brand-200/50 rounded-xl rotate-3"></div>
                    <div className="absolute inset-0 bg-brand-400/50 rounded-xl -rotate-3"></div>
                    <div className="relative w-full h-full bg-white rounded-3xl p-6 flex items-center justify-center overflow-hidden border-2 border-white/50 dark:border-surface-700/50">
                      <BlendedImage
                        className="h-full w-full"
                        src={step.image}
                      />
                    </div>
                  </div>
                </div>

                <div className="z-10 flex flex-col items-center px-8 w-full gap-3">
                  <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight text-center">
                    {step.title}
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-[280px] mx-auto text-center">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {renderDots()}

        <div className="w-full px-6 flex flex-col gap-4">
          <button
            onClick={() => navigate("/auth/register")}
            className="w-full flex gap-2 justify-center items-center btn-primary"
          >
            Get Started <MoveRight />
          </button>
          <div
            className="flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => navigate("/auth/login")}
          >
            <span className="text-slate-500 dark:text-slate-400 text-sm">
              Already have an account?
            </span>
            <span className="text-accent font-bold text-sm">Log In</span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

function Decorations({ step }: { step: number }) {
  const [translateQ, setTranslateQ] = useState(1);
  useEffect(() => {
    setTranslateQ((q) => q * -1);
  }, [step]);

  return (
    <>
      {/* Background blobs for style */}
      <div
        className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-accent/20 rounded-full blur-3xl transition-transform duration-1000 pointer-events-none"
        style={{
          transform: `translate(${translateQ * 100}px, ${translateQ * -100}px)`,
        }}
      ></div>
      <div
        className="absolute top-[20%] right-[-15%] w-80 h-80 bg-accent/10 rounded-full blur-3xl transition-transform duration-1000 pointer-events-none"
        style={{
          transform: `translate(${translateQ * 100}px, ${translateQ * -100}px)`,
        }}
      ></div>
      <div
        className="absolute bottom-[-5%] left-[5%] w-72 h-72 bg-accent/20 rounded-full blur-3xl transition-transform duration-1000 pointer-events-none"
        style={{
          transform: `translate(${translateQ * 100}px, ${translateQ * -100}px)`,
        }}
      ></div>

      <div
        className="absolute top-20 left-10 w-12 h-12 bg-accent/20 rounded-full border-4 border-white dark:border-surface-800 shadow-sm pointer-events-none transition-transform duration-1000"
        style={{
          transform: `translate(${translateQ * 12}px, ${translateQ * -12}px)`,
        }}
      ></div>
      <div
        className="absolute top-1/2 left-4 w-6 h-6 bg-emerald-400/20 rounded-full pointer-events-none transition-transform duration-1000"
        style={{
          transform: `translate(${translateQ * 10}px, ${translateQ * 10}px)`,
        }}
      ></div>
      <div
        className="absolute bottom-40 right-10 w-8 h-8 bg-yellow-400/20 rounded-full border-2 border-white dark:border-surface-800 shadow-sm pointer-events-none transition-transform duration-1000"
        style={{
          transform: `translate(${translateQ * -15}px, ${translateQ * -15}px)`,
        }}
      ></div>
    </>
  );
}
