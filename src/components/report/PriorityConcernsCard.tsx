import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SeverityBadge } from "./SeverityBadge";
import { AlertTriangle } from "lucide-react";
import { PriorityConcern } from "@/types/report";

interface PriorityConcernsCardProps {
  concerns: PriorityConcern[];
}

const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    pigmentation: "🎨",
    texture: "✨",
    sun_damage: "☀️",
    aging: "⏰",
    hydration: "💧",
    acne: "🔴",
  };
  return icons[category] || "📋";
};

export const PriorityConcernsCard = ({ concerns }: PriorityConcernsCardProps) => {
  return (
    <Card className="shadow-card border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="font-display text-lg font-semibold flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-score-warning" />
          Priority Concerns
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {concerns.map((concern, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getCategoryIcon(concern.category)}</span>
                <div>
                  <p className="font-medium text-foreground">{concern.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {concern.category.replace(/_/g, " ")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-muted-foreground">
                  Score: {Math.round(concern.score)}
                </span>
                <SeverityBadge severity={concern.severity} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
