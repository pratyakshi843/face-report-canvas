import { cn } from "@/lib/utils";

interface MetricBarProps {
  label: string;
  value: number;
  maxValue?: number;
  showValue?: boolean;
  inverse?: boolean;
  description?: string;
}

const getBarColor = (value: number, inverse: boolean): string => {
  const effectiveValue = inverse ? 100 - value : value;
  if (effectiveValue >= 80) return "bg-score-excellent";
  if (effectiveValue >= 60) return "bg-score-good";
  if (effectiveValue >= 40) return "bg-score-moderate";
  if (effectiveValue >= 20) return "bg-score-warning";
  return "bg-score-poor";
};

const formatLabel = (label: string): string => {
  return label
    .replace(/_score$/, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

export const MetricBar = ({
  label,
  value,
  maxValue = 100,
  showValue = true,
  inverse = false,
  description,
}: MetricBarProps) => {
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{formatLabel(label)}</span>
        {showValue && (
          <span className="text-sm font-semibold text-muted-foreground">
            {Math.round(value)}
          </span>
        )}
      </div>
      <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-out",
            getBarColor(value, inverse)
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
};
