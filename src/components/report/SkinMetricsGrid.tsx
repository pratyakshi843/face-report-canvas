import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricBar } from "./MetricBar";
import { BarChart3 } from "lucide-react";
import { CombinedAnalysis } from "@/types/report";

interface SkinMetricsGridProps {
  analysis: CombinedAnalysis;
}

export const SkinMetricsGrid = ({ analysis }: SkinMetricsGridProps) => {
  const metrics = [
    { label: "Wrinkles", value: analysis.combined_wrinkles_score, inverse: true },
    { label: "Fine Lines", value: analysis.combined_fine_lines_score, inverse: true },
    { label: "Pores", value: analysis.combined_pores_score, inverse: true },
    { label: "Pigmentation", value: analysis.combined_pigmentation_score, inverse: true },
    { label: "Redness", value: analysis.combined_redness_score, inverse: true },
    { label: "Hydration", value: analysis.combined_hydration_score, inverse: false },
    { label: "Oiliness", value: analysis.combined_oiliness_score, inverse: true },
    { label: "Texture", value: analysis.combined_skin_texture_score, inverse: true },
    { label: "Elasticity", value: analysis.combined_elasticity_score, inverse: false },
    { label: "Radiance", value: analysis.combined_radiance_score, inverse: false },
    { label: "UV Damage", value: analysis.combined_uv_damage_score, inverse: true },
    { label: "Sensitivity", value: analysis.combined_sensitivity_score, inverse: true },
  ];

  return (
    <Card className="shadow-card border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="font-display text-lg font-semibold flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Detailed Skin Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric) => (
            <MetricBar
              key={metric.label}
              label={metric.label}
              value={metric.value}
              inverse={metric.inverse}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
