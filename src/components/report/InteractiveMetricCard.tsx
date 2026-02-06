import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TrendingUp, TrendingDown, Minus, Info } from "lucide-react";

interface InteractiveMetricCardProps {
  label: string;
  value: number;
  inverse?: boolean;
  category?: "medical" | "cosmetic";
  description?: string;
}

type SeverityLevel = "normal" | "mild" | "moderate" | "severe";

const getSeverityLevel = (value: number, inverse: boolean): SeverityLevel => {
  const effectiveValue = inverse ? value : 100 - value;
  if (effectiveValue <= 20) return "normal";
  if (effectiveValue <= 40) return "mild";
  if (effectiveValue <= 70) return "moderate";
  return "severe";
};

const getSeverityConfig = (severity: SeverityLevel) => {
  const config = {
    normal: {
      label: "Normal",
      color: "bg-status-normal",
      textColor: "text-status-normal",
      bgLight: "bg-status-normal/10",
      borderColor: "border-status-normal/30",
      icon: <Minus className="h-3 w-3" />,
    },
    mild: {
      label: "Mild",
      color: "bg-status-mild",
      textColor: "text-status-mild",
      bgLight: "bg-status-mild/10",
      borderColor: "border-status-mild/30",
      icon: <TrendingDown className="h-3 w-3" />,
    },
    moderate: {
      label: "Moderate",
      color: "bg-status-moderate",
      textColor: "text-status-moderate",
      bgLight: "bg-status-moderate/10",
      borderColor: "border-status-moderate/30",
      icon: <TrendingUp className="h-3 w-3" />,
    },
    severe: {
      label: "Severe",
      color: "bg-status-severe",
      textColor: "text-status-severe",
      bgLight: "bg-status-severe/10",
      borderColor: "border-status-severe/30",
      icon: <TrendingUp className="h-3 w-3" />,
    },
  };
  return config[severity];
};

const getMetricDescription = (label: string): string => {
  const descriptions: Record<string, string> = {
    Wrinkles: "Visible lines and creases in the skin caused by aging and sun exposure.",
    "Fine Lines": "Early signs of aging, typically appearing around eyes and mouth.",
    Pores: "Visible openings in the skin that can appear enlarged due to excess oil or aging.",
    Pigmentation: "Uneven skin tone caused by melanin distribution irregularities.",
    Redness: "Visible redness or flushing often associated with sensitivity or rosacea.",
    Hydration: "Skin's moisture levels affecting plumpness and elasticity.",
    Oiliness: "Sebum production levels that can affect skin texture and acne.",
    Texture: "Overall smoothness and evenness of the skin surface.",
    Elasticity: "Skin's ability to bounce back, indicating collagen health.",
    Radiance: "Skin's natural glow and luminosity.",
    "UV Damage": "Cumulative sun damage affecting skin health and appearance.",
    Sensitivity: "Skin's tendency to react to products or environmental factors.",
  };
  return descriptions[label] || "Skin health metric based on analysis.";
};

export const InteractiveMetricCard = ({
  label,
  value,
  inverse = false,
  category = "cosmetic",
  description,
}: InteractiveMetricCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const severity = getSeverityLevel(value, inverse);
  const config = getSeverityConfig(severity);
  const metricDescription = description || getMetricDescription(label);

  // Calculate display value for better UX
  const displayScore = inverse ? Math.round(100 - value) : Math.round(value);
  const percentage = Math.min(value, 100);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "group relative p-4 rounded-xl border transition-all duration-300 cursor-pointer",
              "hover:shadow-card hover:scale-[1.02]",
              isHovered ? config.borderColor : "border-border/50",
              config.bgLight
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Category indicator */}
            <div
              className={cn(
                "absolute top-2 right-2 h-2 w-2 rounded-full transition-all",
                category === "medical"
                  ? "bg-category-medical"
                  : "bg-category-cosmetic",
                isHovered && "scale-125"
              )}
            />

            {/* Label and info icon */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium text-foreground">{label}</span>
              <Info className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Score display */}
            <div className="flex items-end gap-2 mb-3">
              <span className={cn("text-3xl font-bold tabular-nums", config.textColor)}>
                {displayScore}
              </span>
              <span className="text-sm text-muted-foreground mb-1">/100</span>
            </div>

            {/* Progress bar */}
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden mb-3">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-700 ease-out",
                  config.color
                )}
                style={{ width: `${percentage}%` }}
              />
            </div>

            {/* Severity badge */}
            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className={cn(
                  "text-xs font-medium transition-all",
                  config.bgLight,
                  config.textColor,
                  config.borderColor
                )}
              >
                {config.icon}
                <span className="ml-1">{config.label}</span>
              </Badge>

              {/* Category badge */}
              <Badge
                variant="outline"
                className={cn(
                  "text-xs capitalize",
                  category === "medical"
                    ? "bg-category-medical/10 text-category-medical border-category-medical/30"
                    : "bg-category-cosmetic/10 text-category-cosmetic border-category-cosmetic/30"
                )}
              >
                {category}
              </Badge>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <p className="text-sm">{metricDescription}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
