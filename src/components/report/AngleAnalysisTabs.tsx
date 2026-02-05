import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricBar } from "./MetricBar";
import { ScoreGauge } from "./ScoreGauge";
import { IndividualAnalysis } from "@/types/report";
import { RotateCcw, ArrowLeft, ArrowRight } from "lucide-react";

interface AngleAnalysisTabsProps {
  analyses: IndividualAnalysis[];
}

const getAngleIcon = (angle: string) => {
  switch (angle) {
    case "front":
      return <RotateCcw className="h-4 w-4" />;
    case "left":
      return <ArrowLeft className="h-4 w-4" />;
    case "right":
      return <ArrowRight className="h-4 w-4" />;
    default:
      return null;
  }
};

export const AngleAnalysisTabs = ({ analyses }: AngleAnalysisTabsProps) => {
  return (
    <Card className="shadow-card border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="font-display text-lg font-semibold">
          Analysis by Angle
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={analyses[0]?.angle || "front"}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            {analyses.map((analysis) => (
              <TabsTrigger
                key={analysis.angle}
                value={analysis.angle}
                className="flex items-center gap-2 capitalize"
              >
                {getAngleIcon(analysis.angle)}
                {analysis.angle}
              </TabsTrigger>
            ))}
          </TabsList>

          {analyses.map((analysis) => (
            <TabsContent key={analysis.angle} value={analysis.angle}>
              <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
                {/* Score summary */}
                <div className="flex flex-col items-center gap-6 p-6 rounded-xl bg-muted/30">
                  <ScoreGauge
                    score={analysis.skin_health_metrics.overall_skin_health_score}
                    label="Health Score"
                    size="md"
                  />
                  
                  <div className="w-full space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Skin Type</span>
                      <span className="font-medium">{analysis.skin_classification.skin_type}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Skin Tone</span>
                      <span className="font-medium">{analysis.skin_classification.skin_tone}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Est. Age</span>
                      <span className="font-medium">{analysis.skin_classification.estimated_age} yrs</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Image Quality</span>
                      <span className="font-medium">{analysis.healoncal_metrics.image_quality_score}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Confidence</span>
                      <span className="font-medium">{analysis.healoncal_metrics.analysis_confidence}%</span>
                    </div>
                  </div>
                </div>

                {/* Metrics grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MetricBar
                    label="Wrinkles"
                    value={analysis.skin_health_metrics.wrinkles_score}
                    inverse
                  />
                  <MetricBar
                    label="Fine Lines"
                    value={analysis.skin_health_metrics.fine_lines_score}
                    inverse
                  />
                  <MetricBar
                    label="Pores"
                    value={analysis.skin_health_metrics.pores_score}
                    inverse
                  />
                  <MetricBar
                    label="Pigmentation"
                    value={analysis.skin_health_metrics.pigmentation_score}
                    inverse
                  />
                  <MetricBar
                    label="Redness"
                    value={analysis.skin_health_metrics.redness_score}
                    inverse
                  />
                  <MetricBar
                    label="Hydration"
                    value={analysis.skin_health_metrics.hydration_score}
                  />
                  <MetricBar
                    label="Oiliness"
                    value={analysis.skin_health_metrics.oiliness_score}
                    inverse
                  />
                  <MetricBar
                    label="Firmness"
                    value={analysis.skin_health_metrics.skin_firmness_score}
                  />
                  <MetricBar
                    label="Elasticity"
                    value={analysis.skin_health_metrics.elasticity_score}
                  />
                  <MetricBar
                    label="Acne"
                    value={analysis.skin_health_metrics.acne_score}
                    inverse
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};
