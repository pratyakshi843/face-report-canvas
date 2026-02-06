import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveMetricCard } from "./InteractiveMetricCard";
import { BarChart3, Stethoscope, Sparkles } from "lucide-react";
import { CombinedAnalysis } from "@/types/report";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SkinMetricsGridProps {
  analysis: CombinedAnalysis;
}

interface MetricConfig {
  label: string;
  value: number;
  inverse: boolean;
  category: "medical" | "cosmetic";
}

export const SkinMetricsGrid = ({ analysis }: SkinMetricsGridProps) => {
  const medicalMetrics: MetricConfig[] = [
    { label: "Redness", value: analysis.combined_redness_score, inverse: true, category: "medical" },
    { label: "Pigmentation", value: analysis.combined_pigmentation_score, inverse: true, category: "medical" },
    { label: "UV Damage", value: analysis.combined_uv_damage_score, inverse: true, category: "medical" },
    { label: "Sensitivity", value: analysis.combined_sensitivity_score, inverse: true, category: "medical" },
    { label: "Acne", value: analysis.combined_acne_score, inverse: true, category: "medical" },
  ];

  const cosmeticMetrics: MetricConfig[] = [
    { label: "Wrinkles", value: analysis.combined_wrinkles_score, inverse: true, category: "cosmetic" },
    { label: "Fine Lines", value: analysis.combined_fine_lines_score, inverse: true, category: "cosmetic" },
    { label: "Pores", value: analysis.combined_pores_score, inverse: true, category: "cosmetic" },
    { label: "Hydration", value: analysis.combined_hydration_score, inverse: false, category: "cosmetic" },
    { label: "Oiliness", value: analysis.combined_oiliness_score, inverse: true, category: "cosmetic" },
    { label: "Texture", value: analysis.combined_skin_texture_score, inverse: true, category: "cosmetic" },
    { label: "Elasticity", value: analysis.combined_elasticity_score, inverse: false, category: "cosmetic" },
    { label: "Radiance", value: analysis.combined_radiance_score, inverse: false, category: "cosmetic" },
  ];

  const allMetrics = [...medicalMetrics, ...cosmeticMetrics];

  return (
    <Card className="shadow-card border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="font-display text-lg font-semibold flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Detailed Skin Metrics
        </CardTitle>
        <div className="flex items-center gap-4 mt-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-category-medical" />
            <span className="text-muted-foreground">Medical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-category-cosmetic" />
            <span className="text-muted-foreground">Cosmetic</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              All Metrics
            </TabsTrigger>
            <TabsTrigger value="medical" className="flex items-center gap-2">
              <Stethoscope className="h-4 w-4" />
              Medical
            </TabsTrigger>
            <TabsTrigger value="cosmetic" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Cosmetic
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {allMetrics.map((metric) => (
                <InteractiveMetricCard
                  key={metric.label}
                  label={metric.label}
                  value={metric.value}
                  inverse={metric.inverse}
                  category={metric.category}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="medical">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {medicalMetrics.map((metric) => (
                <InteractiveMetricCard
                  key={metric.label}
                  label={metric.label}
                  value={metric.value}
                  inverse={metric.inverse}
                  category={metric.category}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cosmetic">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {cosmeticMetrics.map((metric) => (
                <InteractiveMetricCard
                  key={metric.label}
                  label={metric.label}
                  value={metric.value}
                  inverse={metric.inverse}
                  category={metric.category}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
