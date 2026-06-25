export default function GradientText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-gradient-to-r from-primary via-accent to-primary-light bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient ${className}`}
    >
      {children}
    </span>
  );
}
