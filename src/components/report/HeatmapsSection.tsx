import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SeverityBadge } from "./SeverityBadge";
import { HeatmapItem, AngleHeatmaps } from "@/types/report";
import { Flame, RotateCcw, ArrowLeft, ArrowRight } from "lucide-react";

interface HeatmapsSectionProps {
  images: {
    front: AngleHeatmaps;
    left: AngleHeatmaps;
    right: AngleHeatmaps;
  };
  anglesAvailable: string[];
}

const HeatmapCard = ({ heatmap }: { heatmap: HeatmapItem }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group relative rounded-xl overflow-hidden border border-border/50 bg-card shadow-soft hover:shadow-card transition-all">
      <div className="aspect-square relative overflow-hidden bg-muted">
        {!imageError ? (
          <img
            src={heatmap.url}
            alt={heatmap.disease_name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Flame className="h-12 w-12" />
          </div>
        )}
        
        {/* Overlay with color indicator */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ backgroundColor: heatmap.colors.primary }}
        />
      </div>
      
      <div className="p-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-medium text-foreground line-clamp-1">
            {heatmap.disease_name}
          </h4>
          <SeverityBadge severity={heatmap.severity} className="text-xs" />
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <Badge variant="outline" className="text-xs capitalize">
            {heatmap.category}
          </Badge>
          <span className="font-medium">
            {Math.round(heatmap.confidence * 100)}% confidence
          </span>
        </div>
      </div>
    </div>
  );
};

export const HeatmapsSection = ({
  images,
  anglesAvailable,
}: HeatmapsSectionProps) => {
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

  return (
    <Card className="shadow-card border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="font-display text-lg font-semibold flex items-center gap-2">
          <Flame className="h-5 w-5 text-primary" />
          Heatmap Visualizations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={anglesAvailable[0] || "front"}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            {anglesAvailable.map((angle) => (
              <TabsTrigger
                key={angle}
                value={angle}
                className="flex items-center gap-2 capitalize"
              >
                {getAngleIcon(angle)}
                {angle}
              </TabsTrigger>
            ))}
          </TabsList>

          {anglesAvailable.map((angle) => {
            const angleData = images[angle as keyof typeof images];
            return (
              <TabsContent key={angle} value={angle}>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {angleData?.individual_heatmaps?.map((heatmap, index) => (
                    <HeatmapCard key={`${angle}-${index}`} heatmap={heatmap} />
                  ))}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
};
