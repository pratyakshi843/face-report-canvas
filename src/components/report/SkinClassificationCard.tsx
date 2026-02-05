import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Palette, User } from "lucide-react";

interface SkinClassificationCardProps {
  skinType: string;
  skinTone: string;
  estimatedAge: number;
}

export const SkinClassificationCard = ({
  skinType,
  skinTone,
  estimatedAge,
}: SkinClassificationCardProps) => {
  return (
    <Card className="shadow-card border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="font-display text-lg font-semibold flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          Skin Classification
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Droplets className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Skin Type</p>
              <p className="font-semibold text-foreground">{skinType}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Palette className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Skin Tone</p>
              <p className="font-semibold text-foreground">{skinTone}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Estimated Skin Age</p>
              <p className="font-semibold text-foreground">{estimatedAge} years</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
