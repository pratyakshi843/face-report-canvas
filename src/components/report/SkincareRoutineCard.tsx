import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/types/report";
import { Sun, Moon, Droplets, Shield, Sparkles, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkincareRoutineCardProps {
  products: Product[];
  skinType: string;
}

interface RoutineStep {
  step: number;
  name: string;
  icon: React.ReactNode;
  description: string;
  timing: string;
  product?: Product;
}

export const SkincareRoutineCard = ({
  products,
  skinType,
}: SkincareRoutineCardProps) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // Map products to routine steps
  const findProduct = (category: string) =>
    products.find((p) => p.category.toLowerCase() === category.toLowerCase());

  const morningRoutine: RoutineStep[] = [
    {
      step: 1,
      name: "Cleanse",
      icon: <Droplets className="h-4 w-4" />,
      description: "Start with a gentle cleanser to remove overnight oils",
      timing: "1-2 min",
      product: findProduct("cleanser"),
    },
    {
      step: 2,
      name: "Tone",
      icon: <Sparkles className="h-4 w-4" />,
      description: "Balance your skin's pH and prep for treatments",
      timing: "30 sec",
      product: findProduct("toner"),
    },
    {
      step: 3,
      name: "Treat",
      icon: <Droplets className="h-4 w-4" />,
      description: "Apply targeted serums for your skin concerns",
      timing: "1 min",
      product: findProduct("serum"),
    },
    {
      step: 4,
      name: "Moisturize",
      icon: <Shield className="h-4 w-4" />,
      description: "Lock in hydration and protect your skin barrier",
      timing: "1 min",
      product: findProduct("moisturizer"),
    },
    {
      step: 5,
      name: "Protect",
      icon: <Sun className="h-4 w-4" />,
      description: "Apply SPF 30+ - the most important step!",
      timing: "1 min",
      product: findProduct("sunscreen"),
    },
  ];

  const eveningRoutine: RoutineStep[] = [
    {
      step: 1,
      name: "Double Cleanse",
      icon: <Droplets className="h-4 w-4" />,
      description: "Remove makeup/sunscreen, then deep cleanse",
      timing: "2-3 min",
      product: findProduct("cleanser"),
    },
    {
      step: 2,
      name: "Tone",
      icon: <Sparkles className="h-4 w-4" />,
      description: "Prepare skin for nighttime treatments",
      timing: "30 sec",
      product: findProduct("toner"),
    },
    {
      step: 3,
      name: "Treat",
      icon: <Droplets className="h-4 w-4" />,
      description: "Apply treatment serums (retinol, acids)",
      timing: "1 min",
      product: findProduct("treatment") || findProduct("serum"),
    },
    {
      step: 4,
      name: "Eye Cream",
      icon: <Moon className="h-4 w-4" />,
      description: "Gently pat around the eye area",
      timing: "30 sec",
    },
    {
      step: 5,
      name: "Moisturize",
      icon: <Shield className="h-4 w-4" />,
      description: "Use a richer night cream for overnight repair",
      timing: "1 min",
      product: findProduct("moisturizer"),
    },
  ];

  const RoutineStepItem = ({ routine, step }: { routine: "am" | "pm"; step: RoutineStep }) => (
    <div
      className={cn(
        "group p-4 rounded-xl border transition-all cursor-pointer",
        activeStep === step.step
          ? "border-primary bg-primary/5 shadow-soft"
          : "border-border/50 hover:border-primary/30 hover:bg-muted/50"
      )}
      onClick={() => setActiveStep(activeStep === step.step ? null : step.step)}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors",
            routine === "am"
              ? "bg-score-warning/10 text-score-warning"
              : "bg-primary/10 text-primary"
          )}
        >
          {step.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                Step {step.step}
              </span>
              <h4 className="font-medium text-foreground">{step.name}</h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {step.timing}
              </span>
              <ChevronRight
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform",
                  activeStep === step.step && "rotate-90"
                )}
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{step.description}</p>

          {/* Expanded content */}
          {activeStep === step.step && step.product && (
            <div className="mt-3 pt-3 border-t border-border/50">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Recommended Product</p>
                  <p className="text-sm font-medium text-foreground">{step.product.product_name}</p>
                  <p className="text-xs text-muted-foreground">{step.product.brand}</p>
                </div>
                <Badge variant="secondary" className="text-xs capitalize">
                  {step.product.category}
                </Badge>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Card className="shadow-card border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-display text-lg font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Daily Skincare Routine
          </CardTitle>
          <Badge variant="outline" className="capitalize">
            {skinType} Skin
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="morning" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="morning" className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              Morning Routine
            </TabsTrigger>
            <TabsTrigger value="evening" className="flex items-center gap-2">
              <Moon className="h-4 w-4" />
              Evening Routine
            </TabsTrigger>
          </TabsList>

          <TabsContent value="morning" className="space-y-3">
            {morningRoutine.map((step) => (
              <RoutineStepItem key={step.step} routine="am" step={step} />
            ))}
            <div className="pt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Total time: <span className="font-medium">~5 minutes</span>
              </p>
            </div>
          </TabsContent>

          <TabsContent value="evening" className="space-y-3">
            {eveningRoutine.map((step) => (
              <RoutineStepItem key={step.step} routine="pm" step={step} />
            ))}
            <div className="pt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Total time: <span className="font-medium">~6 minutes</span>
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
