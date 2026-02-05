import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SeverityBadgeProps {
  severity: string;
  className?: string;
}

const getSeverityStyles = (severity: string) => {
  switch (severity.toLowerCase()) {
    case "mild":
      return "bg-severity-mild/10 text-severity-mild border-severity-mild/20";
    case "moderate":
      return "bg-severity-moderate/10 text-severity-moderate border-severity-moderate/20";
    case "high":
    case "severe":
      return "bg-severity-high/10 text-severity-high border-severity-high/20";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

export const SeverityBadge = ({ severity, className }: SeverityBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium capitalize border",
        getSeverityStyles(severity),
        className
      )}
    >
      {severity}
    </Badge>
  );
};
