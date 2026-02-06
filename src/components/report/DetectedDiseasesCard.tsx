import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SeverityBadge } from "./SeverityBadge";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Stethoscope, User, Sparkles, Heart } from "lucide-react";
import { DetectedDisease } from "@/types/report";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface DetectedDiseasesCardProps {
  diseases: DetectedDisease[];
}

const getCategoryConfig = (category: string) => {
  const medicalCategories = ["structural", "infectious", "fungal", "genetic"];
  const isMedical = medicalCategories.includes(category.toLowerCase());
  
  return {
    isMedical,
    colors: isMedical
      ? "bg-category-medical/10 text-category-medical border-category-medical/20"
      : "bg-category-cosmetic/10 text-category-cosmetic border-category-cosmetic/20",
    icon: isMedical ? Stethoscope : Sparkles,
    label: isMedical ? "Medical" : "Cosmetic",
  };
};

export const DetectedDiseasesCard = ({ diseases }: DetectedDiseasesCardProps) => {
  // Deduplicate diseases by name
  const uniqueDiseases = diseases.reduce((acc, disease) => {
    const existing = acc.find((d) => d.disease_name === disease.disease_name);
    if (!existing || disease.confidence_score > existing.confidence_score) {
      return [...acc.filter((d) => d.disease_name !== disease.disease_name), disease];
    }
    return acc;
  }, [] as DetectedDisease[]);

  // Separate medical and cosmetic
  const medicalDiseases = uniqueDiseases.filter((d) => {
    const config = getCategoryConfig(d.disease_category);
    return config.isMedical;
  });

  const cosmeticDiseases = uniqueDiseases.filter((d) => {
    const config = getCategoryConfig(d.disease_category);
    return !config.isMedical;
  });

  return (
    <Card className="shadow-card border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="font-display text-lg font-semibold flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          Detected Conditions
          <Badge variant="secondary" className="ml-2">
            {uniqueDiseases.length}
          </Badge>
        </CardTitle>
        <div className="flex items-center gap-4 mt-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-category-medical" />
            <span className="text-muted-foreground">Medical ({medicalDiseases.length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-category-cosmetic" />
            <span className="text-muted-foreground">Cosmetic ({cosmeticDiseases.length})</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="space-y-2">
          {uniqueDiseases.map((disease) => {
            const categoryConfig = getCategoryConfig(disease.disease_category);
            const CategoryIcon = categoryConfig.icon;
            
            return (
              <AccordionItem
                key={disease.id}
                value={disease.id}
                className={cn(
                  "border rounded-xl px-4 data-[state=open]:bg-muted/30 transition-all",
                  categoryConfig.isMedical
                    ? "border-category-medical/20 data-[state=open]:border-category-medical/40"
                    : "border-category-cosmetic/20 data-[state=open]:border-category-cosmetic/40"
                )}
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-3 flex-1">
                    {/* Category indicator */}
                    <div
                      className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
                        categoryConfig.isMedical
                          ? "bg-category-medical/10"
                          : "bg-category-cosmetic/10"
                      )}
                    >
                      <CategoryIcon
                        className={cn(
                          "h-4 w-4",
                          categoryConfig.isMedical
                            ? "text-category-medical"
                            : "text-category-cosmetic"
                        )}
                      />
                    </div>
                    
                    <div className="flex items-center gap-3 flex-1 text-left">
                      <span className="font-medium text-foreground">
                        {disease.disease_name}
                      </span>
                      <Badge
                        variant="outline"
                        className={cn("text-xs", categoryConfig.colors)}
                      >
                        {categoryConfig.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mr-2">
                      {disease.requires_medical_attention && (
                        <AlertCircle className="h-4 w-4 text-destructive" />
                      )}
                      <SeverityBadge severity={disease.severity_level} />
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="space-y-4 pt-2 pl-11">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Confidence</p>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${Math.round(disease.confidence_score * 100)}%` }}
                            />
                          </div>
                          <p className="font-semibold text-foreground text-sm">
                            {Math.round(disease.confidence_score * 100)}%
                          </p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Affected Area</p>
                        <p className="font-semibold text-foreground text-sm capitalize">
                          {disease.affected_area}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Urgency</p>
                        <Badge
                          variant="outline"
                          className={
                            disease.urgency_level === "urgent"
                              ? "bg-destructive/10 text-destructive border-destructive/20"
                              : "bg-muted text-muted-foreground"
                          }
                        >
                          {disease.urgency_level}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Specialist</p>
                        <div className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-sm font-medium capitalize">
                            {disease.recommended_specialist.replace(/_/g, " ")}
                          </span>
                        </div>
                      </div>
                    </div>

                    {disease.symptoms_noted.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">Symptoms Noted</p>
                        <div className="flex flex-wrap gap-2">
                          {disease.symptoms_noted.map((symptom, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {symptom}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {disease.requires_medical_attention && (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          Medical attention recommended
                        </span>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
};
