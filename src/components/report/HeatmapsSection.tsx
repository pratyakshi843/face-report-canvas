import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SeverityBadge } from "./SeverityBadge";
import { HeatmapItem, AngleHeatmaps } from "@/types/report";
import { Flame, RotateCcw, ArrowLeft, ArrowRight, ZoomIn, X, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface HeatmapsSectionProps {
  images: {
    front: AngleHeatmaps;
    left: AngleHeatmaps;
    right: AngleHeatmaps;
  };
  anglesAvailable: string[];
}

const HeatmapCard = ({ heatmap, onView }: { heatmap: HeatmapItem; onView: () => void }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Get category color for medical vs cosmetic
  const getCategoryStyle = (category: string) => {
    const medicalCategories = ["structural", "infectious", "fungal", "genetic"];
    const isMedical = medicalCategories.includes(category.toLowerCase());
    return isMedical
      ? "bg-category-medical/10 text-category-medical border-category-medical/20"
      : "bg-category-cosmetic/10 text-category-cosmetic border-category-cosmetic/20";
  };

  return (
    <div
      className={cn(
        "group relative rounded-2xl overflow-hidden border bg-card transition-all duration-300",
        "hover:shadow-elevated hover:scale-[1.02] cursor-pointer",
        isHovered ? "border-primary/50" : "border-border/50"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onView}
    >
      {/* Image container with oval mask effect */}
      <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-muted to-muted/50">
        {!imageError ? (
          <>
            {/* Oval mask overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              <div
                className="absolute inset-4 rounded-[50%] border-2 border-primary/20"
                style={{
                  boxShadow: "0 0 0 100px hsl(var(--background) / 0.6)",
                }}
              />
            </div>
            <img
              src={heatmap.url}
              alt={heatmap.disease_name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
            {/* Gradient overlay */}
            <div
              className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                "bg-gradient-to-t from-black/60 via-transparent to-transparent"
              )}
            />
            {/* Zoom icon on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <div className="h-12 w-12 rounded-full bg-white/90 flex items-center justify-center shadow-elevated">
                <ZoomIn className="h-5 w-5 text-foreground" />
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-2">
            <Flame className="h-12 w-12 opacity-50" />
            <span className="text-xs">Image unavailable</span>
          </div>
        )}
        
        {/* Color indicator bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1.5 z-20"
          style={{
            background: `linear-gradient(90deg, ${heatmap.colors.primary} 0%, ${heatmap.colors.secondary} 100%)`,
          }}
        />
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-semibold text-foreground line-clamp-2 leading-tight">
            {heatmap.disease_name}
          </h4>
          <SeverityBadge severity={heatmap.severity} className="text-xs flex-shrink-0" />
        </div>
        
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className={cn("text-xs capitalize", getCategoryStyle(heatmap.category))}
          >
            {heatmap.category}
          </Badge>
          
          {/* Confidence indicator */}
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-12 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${Math.round(heatmap.confidence * 100)}%` }}
              />
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              {Math.round(heatmap.confidence * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HeatmapsSection = ({
  images,
  anglesAvailable,
}: HeatmapsSectionProps) => {
  const [selectedHeatmap, setSelectedHeatmap] = useState<HeatmapItem | null>(null);

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

  const getTotalHeatmaps = () => {
    return anglesAvailable.reduce((total, angle) => {
      const angleData = images[angle as keyof typeof images];
      return total + (angleData?.individual_heatmaps?.length || 0);
    }, 0);
  };

  return (
    <>
      <Card className="shadow-card border-border/50 overflow-hidden">
        <CardHeader className="pb-4 bg-gradient-to-r from-primary/5 to-transparent">
          <CardTitle className="font-display text-lg font-semibold flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Layers className="h-4 w-4 text-primary" />
            </div>
            Heatmap Visualizations
            <Badge variant="secondary" className="ml-2">
              {getTotalHeatmaps()} maps
            </Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Click on any heatmap to view detailed analysis. The oval overlay highlights the face region analyzed.
          </p>
        </CardHeader>
        <CardContent className="pt-2">
          <Tabs defaultValue={anglesAvailable[0] || "front"}>
            <TabsList className="grid w-full grid-cols-3 mb-6 p-1 bg-muted/50">
              {anglesAvailable.map((angle) => (
                <TabsTrigger
                  key={angle}
                  value={angle}
                  className="flex items-center gap-2 capitalize data-[state=active]:bg-background data-[state=active]:shadow-soft"
                >
                  {getAngleIcon(angle)}
                  {angle} View
                </TabsTrigger>
              ))}
            </TabsList>

            {anglesAvailable.map((angle) => {
              const angleData = images[angle as keyof typeof images];
              return (
                <TabsContent key={angle} value={angle}>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {angleData?.individual_heatmaps?.map((heatmap, index) => (
                      <HeatmapCard
                        key={`${angle}-${index}`}
                        heatmap={heatmap}
                        onView={() => setSelectedHeatmap(heatmap)}
                      />
                    ))}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>

      {/* Fullscreen Heatmap Dialog */}
      <Dialog open={!!selectedHeatmap} onOpenChange={() => setSelectedHeatmap(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="font-display text-xl">
                  {selectedHeatmap?.disease_name}
                </DialogTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="capitalize">
                    {selectedHeatmap?.category}
                  </Badge>
                  {selectedHeatmap && (
                    <SeverityBadge severity={selectedHeatmap.severity} />
                  )}
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="p-6 pt-4">
            <div className="relative rounded-2xl overflow-hidden bg-muted aspect-square max-h-[60vh] mx-auto">
              {selectedHeatmap && (
                <>
                  {/* Oval focus indicator */}
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    <div
                      className="absolute inset-8 rounded-[50%] border-4 border-primary/40"
                      style={{
                        boxShadow: "0 0 0 100px hsl(var(--background) / 0.5)",
                      }}
                    />
                  </div>
                  <img
                    src={selectedHeatmap.url}
                    alt={selectedHeatmap.disease_name}
                    className="w-full h-full object-contain"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 h-2 z-20"
                    style={{
                      background: `linear-gradient(90deg, ${selectedHeatmap.colors.primary} 0%, ${selectedHeatmap.colors.secondary} 100%)`,
                    }}
                  />
                </>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Confidence</p>
                  <p className="font-semibold">
                    {selectedHeatmap && Math.round(selectedHeatmap.confidence * 100)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="font-semibold capitalize">{selectedHeatmap?.type}</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => setSelectedHeatmap(null)}>
                <X className="h-4 w-4 mr-2" />
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
