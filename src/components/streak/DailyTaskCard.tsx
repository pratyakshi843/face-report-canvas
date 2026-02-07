import { Check, X, Droplets, Sun, Shield, Sparkles, Moon, GlassWater } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import type { DailyTask, TaskCompletion } from "@/hooks/useStreakTracker";

interface DailyTaskCardProps {
  task: DailyTask;
  completion: TaskCompletion;
  onToggle: (taskId: string, completed: boolean) => void;
  isAnimating: boolean;
  index: number;
}

const iconMap: Record<string, React.ReactNode> = {
  Droplets: <Droplets className="h-5 w-5" />,
  Sun: <Sun className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
  Sparkles: <Sparkles className="h-5 w-5" />,
  Moon: <Moon className="h-5 w-5" />,
  GlassWater: <GlassWater className="h-5 w-5" />,
};

const categoryColors: Record<string, string> = {
  skincare: "bg-primary/10 text-primary border-primary/20",
  lifestyle: "bg-category-cosmetic/10 text-category-cosmetic border-category-cosmetic/20",
  nutrition: "bg-score-good/10 text-score-good border-score-good/20",
};

export const DailyTaskCard = ({
  task,
  completion,
  onToggle,
  isAnimating,
  index,
}: DailyTaskCardProps) => {
  const isCompleted = completion.completed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn(
        "group relative p-4 rounded-xl border-2 transition-all duration-300",
        isCompleted
          ? "border-streak-complete/40 bg-streak-bg-complete"
          : "border-border/50 bg-card hover:border-primary/30 hover:shadow-soft"
      )}
    >
      {/* Completion glow effect */}
      <AnimatePresence>
        {isAnimating && isCompleted && (
          <motion.div
            className="absolute inset-0 rounded-xl bg-streak-complete/10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.05, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4">
        {/* Icon + Check */}
        <div className="relative flex-shrink-0">
          <div
            className={cn(
              "h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300",
              isCompleted
                ? "bg-streak-complete/15 text-streak-complete"
                : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
            )}
          >
            {isCompleted ? (
              <motion.div
                className="animate-check-in"
                initial={false}
              >
                <Check className="h-6 w-6 text-streak-complete" strokeWidth={3} />
              </motion.div>
            ) : (
              iconMap[task.icon] || <Sparkles className="h-5 w-5" />
            )}
          </div>
        </div>

        {/* Task Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h4
              className={cn(
                "font-semibold text-sm transition-colors",
                isCompleted
                  ? "text-streak-complete line-through decoration-streak-complete/40"
                  : "text-foreground"
              )}
            >
              {task.title}
            </h4>
            <Badge
              variant="outline"
              className={cn("text-[10px] px-1.5 py-0 h-4 capitalize", categoryColors[task.category])}
            >
              {task.category}
            </Badge>
          </div>
          <p
            className={cn(
              "text-xs transition-colors",
              isCompleted ? "text-streak-complete/60" : "text-muted-foreground"
            )}
          >
            {task.description}
          </p>
        </div>

        {/* Yes / No Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            size="sm"
            variant={isCompleted ? "default" : "outline"}
            className={cn(
              "h-9 px-4 text-xs font-semibold transition-all duration-300",
              isCompleted
                ? "bg-streak-complete hover:bg-streak-complete/90 text-white border-streak-complete shadow-sm"
                : "hover:bg-streak-bg-complete hover:text-streak-complete hover:border-streak-complete/40"
            )}
            onClick={() => onToggle(task.id, true)}
          >
            <Check className="h-3.5 w-3.5 mr-1" />
            Yes
          </Button>
          <Button
            size="sm"
            variant={!isCompleted ? "outline" : "ghost"}
            className={cn(
              "h-9 px-4 text-xs font-semibold transition-all duration-300",
              !isCompleted
                ? "border-border text-muted-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => onToggle(task.id, false)}
          >
            <X className="h-3.5 w-3.5 mr-1" />
            No
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
