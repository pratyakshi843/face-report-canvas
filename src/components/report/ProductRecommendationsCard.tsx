import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/report";
import { ShoppingBag, Star, CheckCircle2, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductRecommendationsCardProps {
  products: Product[];
}

const getPriceIcon = (priceRange: string) => {
  switch (priceRange) {
    case "budget":
      return <DollarSign className="h-3.5 w-3.5" />;
    case "mid-range":
      return (
        <div className="flex">
          <DollarSign className="h-3.5 w-3.5" />
          <DollarSign className="h-3.5 w-3.5 -ml-1" />
        </div>
      );
    case "luxury":
      return (
        <div className="flex">
          <DollarSign className="h-3.5 w-3.5" />
          <DollarSign className="h-3.5 w-3.5 -ml-1" />
          <DollarSign className="h-3.5 w-3.5 -ml-1" />
        </div>
      );
    default:
      return <DollarSign className="h-3.5 w-3.5" />;
  }
};

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    cleanser: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    serum: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    moisturizer: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    sunscreen: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    toner: "bg-pink-500/10 text-pink-600 border-pink-500/20",
    treatment: "bg-red-500/10 text-red-600 border-red-500/20",
    mask: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  };
  return colors[category] || "bg-muted text-muted-foreground border-border";
};

export const ProductRecommendationsCard = ({
  products,
}: ProductRecommendationsCardProps) => {
  return (
    <Card className="shadow-card border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="font-display text-lg font-semibold flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-primary" />
          Recommended Products
          <Badge variant="secondary" className="ml-2">
            {products.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {products.map((product, index) => (
            <div
              key={index}
              className={cn(
                "p-4 rounded-xl border border-border/50 bg-card hover:shadow-soft transition-all",
                product.priority === "high" && "ring-1 ring-primary/20"
              )}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant="outline"
                      className={cn("text-xs capitalize", getCategoryColor(product.category))}
                    >
                      {product.category}
                    </Badge>
                    {product.priority === "high" && (
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                        Priority
                      </Badge>
                    )}
                  </div>
                  <h4 className="font-semibold text-foreground">
                    {product.product_name}
                  </h4>
                  <p className="text-sm text-muted-foreground">{product.brand}</p>
                </div>
                <div className="flex items-center text-muted-foreground">
                  {getPriceIcon(product.price_range)}
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {product.target_concern}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {product.key_ingredients.slice(0, 3).map((ingredient, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {ingredient}
                  </Badge>
                ))}
                {product.key_ingredients.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{product.key_ingredients.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-border/50">
                {product.dermatologist_approved && (
                  <div className="flex items-center gap-1 text-xs text-score-excellent">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Dermatologist Approved</span>
                  </div>
                )}
                {product.medical_grade && (
                  <div className="flex items-center gap-1 text-xs text-primary">
                    <Star className="h-3.5 w-3.5" />
                    <span>Medical Grade</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
