import reportData from "@/data/report.json";
import { FaceAnalysisReport as ReportType } from "@/types/report";
import { SessionHeader } from "./SessionHeader";
import { OverallScoreCard } from "./OverallScoreCard";
import { SkinClassificationCard } from "./SkinClassificationCard";
import { SkinMetricsGrid } from "./SkinMetricsGrid";
import { PriorityConcernsCard } from "./PriorityConcernsCard";
import { DetectedDiseasesCard } from "./DetectedDiseasesCard";
import { AngleAnalysisTabs } from "./AngleAnalysisTabs";
import { HeatmapsSection } from "./HeatmapsSection";
import { ProductRecommendationsCard } from "./ProductRecommendationsCard";

export const FaceAnalysisReport = () => {
  // Cast report data to the correct type
  const report = reportData as unknown as ReportType;
  const { results, heatmaps, recommendations } = report;
  const { session_info, healoncal_results } = results;
  const { combined_analysis, individual_analyses } = healoncal_results;

  // Calculate an overall health score (average of key metrics)
  const overallHealthScore =
    (combined_analysis.combined_hydration_score +
      combined_analysis.combined_elasticity_score +
      combined_analysis.combined_radiance_score +
      (100 - combined_analysis.combined_wrinkles_score) +
      (100 - combined_analysis.combined_pigmentation_score)) /
    5;

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <SessionHeader
          sessionInfo={session_info}
          diagnosticAccuracy={combined_analysis.overall_diagnostic_accuracy}
        />

        {/* Overview Section */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <OverallScoreCard
              overallScore={overallHealthScore}
              hydrationScore={combined_analysis.combined_hydration_score}
              elasticityScore={combined_analysis.combined_elasticity_score}
              radianceScore={combined_analysis.combined_radiance_score}
            />
          </div>
          <SkinClassificationCard
            skinType={combined_analysis.final_skin_type_classification}
            skinTone={combined_analysis.final_skin_tone_classification}
            estimatedAge={combined_analysis.estimated_skin_age}
          />
        </div>

        {/* Detailed Metrics */}
        <SkinMetricsGrid analysis={combined_analysis} />

        {/* Priority Concerns & Detected Conditions */}
        <div className="grid gap-6 lg:grid-cols-2">
          <PriorityConcernsCard concerns={combined_analysis.priority_concerns} />
          <DetectedDiseasesCard diseases={combined_analysis.detected_diseases} />
        </div>

        {/* Analysis by Angle */}
        <AngleAnalysisTabs analyses={individual_analyses} />

        {/* Heatmaps */}
        {heatmaps.success && (
          <HeatmapsSection
            images={heatmaps.images}
            anglesAvailable={heatmaps.angles_available}
          />
        )}

        {/* Product Recommendations */}
        {recommendations.success && recommendations.recommendations.products.length > 0 && (
          <ProductRecommendationsCard
            products={recommendations.recommendations.products}
          />
        )}

        {/* Footer */}
        <footer className="pt-8 pb-4 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>
              Analysis performed by <span className="font-medium text-foreground">Healoncal v2.0</span>
            </p>
            <p>
              Session ID: <code className="text-xs bg-muted px-2 py-1 rounded">{session_info.id}</code>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};
