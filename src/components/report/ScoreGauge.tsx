import { cn } from "@/lib/utils";

interface ScoreGaugeProps {
  score: number;
  label: string;
  size?: "sm" | "md" | "lg";
  showPercentage?: boolean;
}

const getScoreColor = (score: number): string => {
  if (score >= 80) return "stroke-score-excellent";
  if (score >= 60) return "stroke-score-good";
  if (score >= 40) return "stroke-score-moderate";
  if (score >= 20) return "stroke-score-warning";
  return "stroke-score-poor";
};

const getScoreTextColor = (score: number): string => {
  if (score >= 80) return "text-score-excellent";
  if (score >= 60) return "text-score-good";
  if (score >= 40) return "text-score-moderate";
  if (score >= 20) return "text-score-warning";
  return "text-score-poor";
};

const getScoreLabel = (score: number): string => {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Moderate";
  if (score >= 20) return "Needs Care";
  return "Critical";
};

export const ScoreGauge = ({ score, label, size = "md", showPercentage = true }: ScoreGaugeProps) => {
  const sizeConfig = {
    sm: { width: 80, strokeWidth: 6, textSize: "text-lg", labelSize: "text-xs" },
    md: { width: 120, strokeWidth: 8, textSize: "text-2xl", labelSize: "text-sm" },
    lg: { width: 180, strokeWidth: 10, textSize: "text-4xl", labelSize: "text-base" },
  };

  const config = sizeConfig[size];
  const radius = (config.width - config.strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: config.width, height: config.width }}>
        {/* Background circle */}
        <svg
          className="absolute inset-0 -rotate-90"
          width={config.width}
          height={config.width}
        >
          <circle
            cx={config.width / 2}
            cy={config.width / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={config.strokeWidth}
            className="text-muted"
          />
          <circle
            cx={config.width / 2}
            cy={config.width / 2}
            r={radius}
            fill="none"
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={cn("transition-all duration-1000 ease-out animate-score-fill", getScoreColor(score))}
            style={{ strokeDashoffset }}
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-display font-bold", config.textSize, getScoreTextColor(score))}>
            {Math.round(score)}
            {showPercentage && <span className="text-[0.5em]">%</span>}
          </span>
          <span className={cn("text-muted-foreground", config.labelSize)}>
            {getScoreLabel(score)}
          </span>
        </div>
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
  );
};
