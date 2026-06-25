interface DuoVialLogoProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function DuoVialLogo({
  size = 200,
  className = "",
  style,
}: DuoVialLogoProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur1" />
          <feGaussianBlur stdDeviation="8" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#neonGlow)">
        <circle
          cx="256"
          cy="256"
          r="200"
          stroke="#00E5FF"
          strokeWidth="5"
        />

        <path
          d="M130 256 C180 170, 332 170, 382 256 C332 342, 180 342, 130 256Z"
          stroke="#00E5FF"
          strokeWidth="5"
          fill="none"
        />
        <circle
          cx="256"
          cy="256"
          r="55"
          stroke="#00E5FF"
          strokeWidth="5"
          fill="none"
        />
      </g>

      <circle
        cx="256"
        cy="256"
        r="18"
        fill="#FF1744"
        className="animate-record"
      />
    </svg>
  );
}
