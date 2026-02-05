import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SeverityBadge } from "./SeverityBadge";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Stethoscope, User } from "lucide-react";
import { DetectedDisease } from "@/types/report";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface DetectedDiseasesCardProps {
  diseases: DetectedDisease[];
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    structural: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    pigmentary: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    genetic: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    infectious: "bg-red-500/10 text-red-600 border-red-500/20",
    fungal: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  };
  return colors[category] || "bg-muted text-muted-foreground border-border";
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

  return (
    <Card className="shadow-card border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="font-display text-lg font-semibold flex items-center gap-2">
          <Stethoscope className="h-5 w-5 text-primary" />
          Detected Conditions
          <Badge variant="secondary" className="ml-2">
            {uniqueDiseases.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="space-y-2">
          {uniqueDiseases.map((disease) => (
            <AccordionItem
              key={disease.id}
              value={disease.id}
              className="border border-border/50 rounded-xl px-4 data-[state=open]:bg-muted/30"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex items-center gap-3 flex-1 text-left">
                    <span className="font-medium text-foreground">
                      {disease.disease_name}
                    </span>
                    <Badge
                      variant="outline"
                      className={getCategoryColor(disease.disease_category)}
                    >
                      {disease.disease_category}
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
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Confidence</p>
                      <p className="font-semibold text-foreground">
                        {Math.round(disease.confidence_score * 100)}%
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Affected Area</p>
                      <p className="font-semibold text-foreground capitalize">
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
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};
