import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/report";
import { ShoppingBag, Star, CheckCircle2, DollarSign, ShoppingCart, Plus, Check, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ProductRecommendationsCardProps {
  products: Product[];
}

const getPriceIcon = (priceRange: string) => {
  const count = priceRange === "budget" ? 1 : priceRange === "mid-range" ? 2 : 3;
  return (
    <div className="flex">
      {Array.from({ length: count }).map((_, i) => (
        <DollarSign key={i} className={cn("h-3.5 w-3.5", i > 0 && "-ml-1")} />
      ))}
    </div>
  );
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
  const [cart, setCart] = useState<Set<number>>(new Set());

  const addToCart = (index: number, productName: string) => {
    setCart((prev) => new Set(prev).add(index));
    toast.success(`Added ${productName} to cart`, {
      description: "View your cart to complete purchase",
      action: {
        label: "View Cart",
        onClick: () => {},
      },
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => {
      const newCart = new Set(prev);
      newCart.delete(index);
      return newCart;
    });
  };

  const isInCart = (index: number) => cart.has(index);

  // Filter out beautician products (only keep dermatologist-approved or medical-grade)
  const filteredProducts = products.filter(
    (p) => p.dermatologist_approved || p.medical_grade
  );

  return (
    <Card className="shadow-card border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-display text-lg font-semibold flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Recommended Products
            <Badge variant="secondary" className="ml-2">
              {filteredProducts.length}
            </Badge>
          </CardTitle>
          {cart.size > 0 && (
            <Button variant="default" size="sm" className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              View Cart ({cart.size})
            </Button>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Dermatologist-approved products tailored to your skin analysis
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className={cn(
                "relative p-4 rounded-xl border bg-card transition-all hover:shadow-soft",
                product.priority === "high" && "ring-1 ring-primary/20",
                isInCart(index) && "ring-2 ring-score-excellent/50 bg-score-excellent/5",
                "border-border/50"
              )}
            >
              {/* Priority badge */}
              {product.priority === "high" && (
                <div className="absolute -top-2 -right-2">
                  <Badge className="bg-primary text-primary-foreground shadow-soft">
                    Priority
                  </Badge>
                </div>
              )}

              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant="outline"
                      className={cn("text-xs capitalize", getCategoryColor(product.category))}
                    >
                      {product.category}
                    </Badge>
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
                {product.why_recommended}
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

              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <div className="flex items-center gap-3">
                  {product.dermatologist_approved && (
                    <div className="flex items-center gap-1 text-xs text-score-excellent">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Derm Approved</span>
                    </div>
                  )}
                  {product.medical_grade && (
                    <div className="flex items-center gap-1 text-xs text-primary">
                      <Star className="h-3.5 w-3.5" />
                      <span>Medical Grade</span>
                    </div>
                  )}
                </div>

                {/* Add to Cart Button */}
                <Button
                  size="sm"
                  variant={isInCart(index) ? "outline" : "default"}
                  className={cn(
                    "transition-all",
                    isInCart(index) && "border-score-excellent text-score-excellent hover:bg-score-excellent/10"
                  )}
                  onClick={() =>
                    isInCart(index)
                      ? removeFromCart(index)
                      : addToCart(index, product.product_name)
                  }
                >
                  {isInCart(index) ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      In Cart
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-1" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        {cart.size > 0 && (
          <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {cart.size} {cart.size === 1 ? "product" : "products"} in cart
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Ready for checkout
                  </p>
                </div>
              </div>
              <Button className="gap-2">
                <ShoppingCart className="h-4 w-4" />
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
