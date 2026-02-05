import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreGauge } from "./ScoreGauge";
import { Activity, Sparkles, Shield, Target } from "lucide-react";

interface OverallScoreCardProps {
  overallScore: number;
  hydrationScore: number;
  elasticityScore: number;
  radianceScore: number;
}

export const OverallScoreCard = ({
  overallScore,
  hydrationScore,
  elasticityScore,
  radianceScore,
}: OverallScoreCardProps) => {
  return (
    <Card className="shadow-card border-border/50 overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-br from-primary/5 to-transparent">
        <CardTitle className="font-display text-lg font-semibold flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Overall Skin Health
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center">
          <ScoreGauge score={overallScore} label="Overall Score" size="lg" />
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/30">
            <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-blue-500" />
            </div>
            <span className="text-lg font-bold text-foreground">{Math.round(hydrationScore)}</span>
            <span className="text-xs text-muted-foreground text-center">Hydration</span>
          </div>

          <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/30">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Shield className="h-4 w-4 text-emerald-500" />
            </div>
            <span className="text-lg font-bold text-foreground">{Math.round(elasticityScore)}</span>
            <span className="text-xs text-muted-foreground text-center">Elasticity</span>
          </div>

          <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/30">
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Target className="h-4 w-4 text-amber-500" />
            </div>
            <span className="text-lg font-bold text-foreground">{Math.round(radianceScore)}</span>
            <span className="text-xs text-muted-foreground text-center">Radiance</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
