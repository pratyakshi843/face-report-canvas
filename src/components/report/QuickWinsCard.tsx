import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PriorityConcern } from "@/types/report";
import { Zap, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickWinsCardProps {
  concerns: PriorityConcern[];
}

interface QuickWin {
  title: string;
  description: string;
  timeToResult: string;
  difficulty: "easy" | "medium";
  impact: "high" | "medium" | "low";
  concernCategory: string;
}

const getQuickWinsForConcern = (category: string): QuickWin[] => {
  const quickWinsMap: Record<string, QuickWin[]> = {
    pigmentation: [
      {
        title: "Apply Vitamin C serum daily",
        description: "Use in the morning before sunscreen to brighten skin and fade dark spots.",
        timeToResult: "4-6 weeks",
        difficulty: "easy",
        impact: "high",
        concernCategory: "pigmentation",
      },
      {
        title: "Always wear SPF 30+",
        description: "Sun protection is crucial to prevent further pigmentation.",
        timeToResult: "Immediate",
        difficulty: "easy",
        impact: "high",
        concernCategory: "pigmentation",
      },
    ],
    texture: [
      {
        title: "Exfoliate 2-3 times weekly",
        description: "Use a gentle AHA/BHA exfoliant to smooth skin texture.",
        timeToResult: "2-3 weeks",
        difficulty: "easy",
        impact: "high",
        concernCategory: "texture",
      },
      {
        title: "Double cleanse at night",
        description: "Remove all makeup and sunscreen to keep pores clear.",
        timeToResult: "1-2 weeks",
        difficulty: "easy",
        impact: "medium",
        concernCategory: "texture",
      },
    ],
    sun_damage: [
      {
        title: "Reapply sunscreen every 2 hours",
        description: "Especially when outdoors or near windows.",
        timeToResult: "Immediate prevention",
        difficulty: "easy",
        impact: "high",
        concernCategory: "sun_damage",
      },
      {
        title: "Add antioxidant serum",
        description: "Niacinamide or Vitamin E to repair UV damage.",
        timeToResult: "6-8 weeks",
        difficulty: "easy",
        impact: "medium",
        concernCategory: "sun_damage",
      },
    ],
    hydration: [
      {
        title: "Use hyaluronic acid serum",
        description: "Apply on damp skin to lock in moisture.",
        timeToResult: "1 week",
        difficulty: "easy",
        impact: "high",
        concernCategory: "hydration",
      },
      {
        title: "Drink 8 glasses of water daily",
        description: "Internal hydration reflects on your skin.",
        timeToResult: "1-2 weeks",
        difficulty: "easy",
        impact: "medium",
        concernCategory: "hydration",
      },
    ],
  };

  return quickWinsMap[category] || [];
};

export const QuickWinsCard = ({ concerns }: QuickWinsCardProps) => {
  // Generate quick wins based on priority concerns
  const allQuickWins = concerns.flatMap((concern) =>
    getQuickWinsForConcern(concern.category)
  );

  // Deduplicate and limit to 5 wins
  const uniqueWins = allQuickWins.reduce((acc, win) => {
    if (!acc.find((w) => w.title === win.title)) {
      acc.push(win);
    }
    return acc;
  }, [] as QuickWin[]).slice(0, 5);

  // If no concerns, show general quick wins
  const defaultWins: QuickWin[] = [
    {
      title: "Establish a consistent routine",
      description: "Cleanse, tone, moisturize morning and night.",
      timeToResult: "Immediate",
      difficulty: "easy",
      impact: "high",
      concernCategory: "general",
    },
    {
      title: "Never skip sunscreen",
      description: "SPF 30+ daily, rain or shine.",
      timeToResult: "Long-term benefit",
      difficulty: "easy",
      impact: "high",
      concernCategory: "general",
    },
    {
      title: "Get 7-8 hours of sleep",
      description: "Your skin repairs itself while you sleep.",
      timeToResult: "1 week",
      difficulty: "medium",
      impact: "high",
      concernCategory: "general",
    },
  ];

  const displayWins = uniqueWins.length > 0 ? uniqueWins : defaultWins;

  return (
    <Card className="shadow-card border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="font-display text-lg font-semibold flex items-center gap-2">
          <Zap className="h-5 w-5 text-score-warning" />
          Quick Wins
          <Badge variant="secondary" className="ml-2 bg-score-warning/10 text-score-warning">
            Start Today
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayWins.map((win, index) => (
            <div
              key={index}
              className="group p-4 rounded-xl border border-border/50 bg-card hover:shadow-soft hover:border-primary/30 transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {win.title}
                    </h4>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs flex-shrink-0",
                        win.impact === "high"
                          ? "bg-score-excellent/10 text-score-excellent border-score-excellent/20"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {win.impact} impact
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {win.description}
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Results in {win.timeToResult}
                    </span>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {win.difficulty}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
