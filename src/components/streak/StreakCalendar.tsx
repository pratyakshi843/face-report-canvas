import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Check, X, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { DayRecord } from "@/hooks/useStreakTracker";
import type { DailyTask } from "@/hooks/useStreakTracker";
import { motion, AnimatePresence } from "framer-motion";

interface StreakCalendarProps {
  isDayCompleted: (date: Date) => boolean;
  isDayPartial: (date: Date) => boolean;
  getDayRecord: (date: Date) => DayRecord | undefined;
  dailyTasks: DailyTask[];
  totalCompletedDays: number;
}

export const StreakCalendar = ({
  isDayCompleted,
  isDayPartial,
  getDayRecord,
  dailyTasks,
  totalCompletedDays,
}: StreakCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const selectedRecord = selectedDate ? getDayRecord(selectedDate) : undefined;

  // Custom day class modifier
  const modifiers = {
    completed: (date: Date) => isDayCompleted(date),
    partial: (date: Date) => isDayPartial(date),
  };

  const modifiersStyles = {
    completed: {
      backgroundColor: "hsl(var(--streak-complete))",
      color: "white",
      borderRadius: "50%",
      fontWeight: 700,
    },
    partial: {
      backgroundColor: "hsl(var(--streak-fire) / 0.15)",
      color: "hsl(var(--streak-fire))",
      borderRadius: "50%",
      border: "2px solid hsl(var(--streak-fire) / 0.4)",
      fontWeight: 600,
    },
  };

  return (
    <Card className="shadow-card border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-display text-lg font-semibold flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            Streak Calendar
          </CardTitle>
          <Badge variant="secondary" className="bg-streak-complete/10 text-streak-complete">
            {totalCompletedDays} days completed
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Calendar */}
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              disabled={(date) => date > new Date()}
              className="p-3 pointer-events-auto rounded-xl border border-border/50"
            />
          </div>

          {/* Selected Day Details */}
          <AnimatePresence mode="wait">
            {selectedDate ? (
              <motion.div
                key={format(selectedDate, "yyyy-MM-dd")}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-semibold text-foreground">
                    {format(selectedDate, "EEEE, MMM d")}
                  </h4>
                  {selectedRecord?.allCompleted ? (
                    <Badge className="bg-streak-complete text-white">
                      <Check className="h-3 w-3 mr-1" />
                      All Complete
                    </Badge>
                  ) : selectedRecord ? (
                    <Badge variant="outline" className="text-streak-fire border-streak-fire/30">
                      <Minus className="h-3 w-3 mr-1" />
                      Partial
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground">
                      <X className="h-3 w-3 mr-1" />
                      No Activity
                    </Badge>
                  )}
                </div>

                {selectedRecord ? (
                  <div className="space-y-2">
                    {selectedRecord.tasks.map((task) => {
                      const taskInfo = dailyTasks.find((t) => t.id === task.taskId);
                      return (
                        <div
                          key={task.taskId}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg border transition-colors",
                            task.completed
                              ? "bg-streak-bg-complete border-streak-complete/20"
                              : "bg-muted/50 border-border/30"
                          )}
                        >
                          <div
                            className={cn(
                              "h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0",
                              task.completed
                                ? "bg-streak-complete text-white"
                                : "bg-muted-foreground/20 text-muted-foreground"
                            )}
                          >
                            {task.completed ? (
                              <Check className="h-3.5 w-3.5" strokeWidth={3} />
                            ) : (
                              <X className="h-3.5 w-3.5" />
                            )}
                          </div>
                          <span
                            className={cn(
                              "text-sm",
                              task.completed
                                ? "text-streak-complete font-medium"
                                : "text-muted-foreground"
                            )}
                          >
                            {taskInfo?.title || task.taskId}
                          </span>
                        </div>
                      );
                    })}
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground">
                        {selectedRecord.tasks.filter((t) => t.completed).length}/
                        {selectedRecord.tasks.length} tasks completed
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                      <CalendarDays className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      No tasks recorded for this day.
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-1">
                      Complete your daily tasks to mark this day!
                    </p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-8 text-center"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <CalendarDays className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  Select a date
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Click any date to see task details
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-streak-complete" />
                    <span className="text-xs text-muted-foreground">All done</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full border-2 border-streak-fire/40 bg-streak-fire/15" />
                    <span className="text-xs text-muted-foreground">Partial</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};
