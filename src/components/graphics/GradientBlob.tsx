interface GradientBlobProps {
  className?: string;
  color1?: string;
  color2?: string;
  delay?: number;
}

export default function GradientBlob({
  className = '',
  color1 = '#8B5CF6',
  color2 = '#3B82F6',
  delay = 0,
}: GradientBlobProps) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-30 animate-blob ${className}`}
      style={{
        background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

export function GradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main blobs */}
      <GradientBlob
        className="w-96 h-96 -top-48 -left-48"
        color1="#8B5CF6"
        color2="#3B82F6"
        delay={0}
      />
      <GradientBlob
        className="w-80 h-80 top-1/4 right-0"
        color1="#06B6D4"
        color2="#EC4899"
        delay={2}
      />
      <GradientBlob
        className="w-72 h-72 bottom-0 left-1/3"
        color1="#3B82F6"
        color2="#06B6D4"
        delay={4}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}
