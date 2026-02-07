import { Flame, Trophy, TrendingUp, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
  todayProgress: number;
  completedToday: number;
  totalTasks: number;
  showConfetti: boolean;
}

const getMotivationalMessage = (streak: number, progress: number): string => {
  if (progress === 100) return "🎉 All done today! Amazing!";
  if (progress >= 75) return "Almost there! Just a few more!";
  if (progress >= 50) return "Halfway done! Keep pushing! 💪";
  if (progress >= 25) return "Great start! Keep going!";
  if (streak >= 30) return "🔥 Legendary streak! Don't stop!";
  if (streak >= 14) return "🌟 Two weeks strong!";
  if (streak >= 7) return "⚡ One week streak! Incredible!";
  if (streak >= 3) return "You're on fire! Keep it up!";
  if (streak >= 1) return "Nice streak going! Stay consistent!";
  return "Start your streak today! 🚀";
};

export const StreakCounter = ({
  currentStreak,
  longestStreak,
  todayProgress,
  completedToday,
  totalTasks,
  showConfetti,
}: StreakCounterProps) => {
  const message = getMotivationalMessage(currentStreak, todayProgress);

  return (
    <div className="relative">
      {/* Confetti overlay */}
      <AnimatePresence>
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-xl">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                initial={{
                  x: "50%",
                  y: "50%",
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: [0, 1.5, 0],
                  opacity: [1, 0.8, 0],
                  rotate: [0, 360],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.05,
                  ease: "easeOut",
                }}
                style={{
                  backgroundColor: [
                    "hsl(var(--streak-fire))",
                    "hsl(var(--streak-complete))",
                    "hsl(var(--primary))",
                    "hsl(var(--score-warning))",
                    "hsl(var(--category-cosmetic))",
                  ][i % 5],
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Current Streak */}
        <motion.div
          className={cn(
            "flex flex-col items-center gap-2 p-5 rounded-xl border transition-all",
            currentStreak > 0
              ? "border-streak-fire/30 bg-streak-fire/5"
              : "border-border/50 bg-card"
          )}
          animate={showConfetti ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className={cn(
              "relative",
              currentStreak > 0 && "animate-glow-pulse"
            )}
            animate={
              showConfetti
                ? { rotate: [-10, 10, -10, 10, 0], scale: [1, 1.3, 1] }
                : {}
            }
            transition={{ duration: 0.6 }}
          >
            <Flame
              className={cn(
                "h-8 w-8",
                currentStreak > 0
                  ? "text-streak-fire"
                  : "text-muted-foreground"
              )}
            />
          </motion.div>
          <div className="text-center">
            <p className="text-3xl font-display font-bold text-foreground">
              {currentStreak}
            </p>
            <p className="text-xs text-muted-foreground font-medium">
              Day Streak
            </p>
          </div>
        </motion.div>

        {/* Longest Streak */}
        <div className="flex flex-col items-center gap-2 p-5 rounded-xl border border-border/50 bg-card">
          <Trophy className="h-8 w-8 text-score-warning" />
          <div className="text-center">
            <p className="text-3xl font-display font-bold text-foreground">
              {longestStreak}
            </p>
            <p className="text-xs text-muted-foreground font-medium">
              Best Streak
            </p>
          </div>
        </div>

        {/* Today's Progress */}
        <div className="flex flex-col items-center gap-2 p-5 rounded-xl border border-border/50 bg-card">
          <TrendingUp className="h-8 w-8 text-primary" />
          <div className="text-center">
            <p className="text-3xl font-display font-bold text-foreground">
              {completedToday}/{totalTasks}
            </p>
            <p className="text-xs text-muted-foreground font-medium">
              Today's Tasks
            </p>
          </div>
        </div>

        {/* Motivational Card */}
        <div className="flex flex-col items-center justify-center gap-2 p-5 rounded-xl border border-primary/20 bg-primary/5">
          <Star className="h-6 w-6 text-primary" />
          <p className="text-sm text-center font-medium text-foreground leading-snug">
            {message}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Daily Progress
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round(todayProgress)}%
          </span>
        </div>
        <div className="h-3 w-full rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-streak-complete"
            initial={{ width: 0 }}
            animate={{ width: `${todayProgress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
};
