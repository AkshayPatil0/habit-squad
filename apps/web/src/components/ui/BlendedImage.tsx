import { cn } from "@/lib/utils";

export default function BlendedImage({
  src,
  className,
}: { src: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("z-10", className)}
      style={{
        backgroundImage: `linear-gradient(var(--color-brand-700), var(--color-brand-700)), url(${src})`,
        backgroundBlendMode: "soft-light",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}
