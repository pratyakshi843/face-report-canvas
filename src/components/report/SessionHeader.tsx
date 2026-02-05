import { SessionInfo } from "@/types/report";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, CheckCircle2, Clock, Image, Scan } from "lucide-react";

interface SessionHeaderProps {
  sessionInfo: SessionInfo;
  diagnosticAccuracy: number;
}

export const SessionHeader = ({ sessionInfo, diagnosticAccuracy }: SessionHeaderProps) => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDuration = () => {
    const start = new Date(sessionInfo.created_at);
    const end = new Date(sessionInfo.completed_at);
    const diffMs = end.getTime() - start.getTime();
    const minutes = Math.floor(diffMs / 60000);
    const seconds = Math.floor((diffMs % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="gradient-card rounded-2xl p-6 shadow-card border border-border/50">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center shadow-soft">
              <Scan className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">
                Face Analysis Report
              </h1>
              <p className="text-sm text-muted-foreground">
                Comprehensive Skin Health Assessment
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1.5 bg-card">
            <CheckCircle2 className="h-3.5 w-3.5 text-score-excellent" />
            <span className="capitalize">{sessionInfo.status}</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1.5 bg-card">
            <Image className="h-3.5 w-3.5 text-primary" />
            <span>{sessionInfo.processed_images} Images</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1.5 bg-card">
            <span className="text-primary font-semibold">{diagnosticAccuracy}%</span>
            <span>Accuracy</span>
          </Badge>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border/50 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          <span>{formatDate(sessionInfo.completed_at)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Analysis Duration: {getDuration()}</span>
        </div>
      </div>
    </div>
  );
};
