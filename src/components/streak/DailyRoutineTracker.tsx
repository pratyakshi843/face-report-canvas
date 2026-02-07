import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flame, ListChecks, CalendarDays } from "lucide-react";
import { useStreakTracker, DAILY_TASKS } from "@/hooks/useStreakTracker";
import { StreakCounter } from "./StreakCounter";
import { DailyTaskCard } from "./DailyTaskCard";
import { StreakCalendar } from "./StreakCalendar";

export const DailyRoutineTracker = () => {
  const {
    streakData,
    todayRecord,
    completedToday,
    totalTasks,
    todayProgress,
    toggleTask,
    getDayRecord,
    isDayCompleted,
    isDayPartial,
    animatingTaskId,
    showConfetti,
    currentStreak,
    longestStreak,
  } = useStreakTracker();

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-streak-fire/10 flex items-center justify-center">
          <Flame className="h-5 w-5 text-streak-fire" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">
            Daily Routine Tracker
          </h2>
          <p className="text-sm text-muted-foreground">
            Complete all tasks daily to build your streak
          </p>
        </div>
        {currentStreak > 0 && (
          <Badge className="ml-auto bg-streak-fire/10 text-streak-fire border-streak-fire/20 text-sm px-3 py-1">
            🔥 {currentStreak} day streak
          </Badge>
        )}
      </div>

      {/* Streak Stats */}
      <Card className="shadow-card border-border/50 overflow-hidden">
        <CardContent className="p-6">
          <StreakCounter
            currentStreak={currentStreak}
            longestStreak={longestStreak}
            todayProgress={todayProgress}
            completedToday={completedToday}
            totalTasks={totalTasks}
            showConfetti={showConfetti}
          />
        </CardContent>
      </Card>

      {/* Tasks & Calendar Tabs */}
      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <ListChecks className="h-4 w-4" />
            Today's Tasks
            <Badge variant="secondary" className="ml-1 text-xs h-5 px-1.5">
              {completedToday}/{totalTasks}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            Calendar View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tasks">
          <Card className="shadow-card border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="font-display text-lg font-semibold flex items-center gap-2">
                <ListChecks className="h-5 w-5 text-primary" />
                Today's Skincare Tasks
                {todayProgress === 100 && (
                  <Badge className="ml-2 bg-streak-complete text-white">
                    ✅ All Done!
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {DAILY_TASKS.map((task, index) => {
                const completion = todayRecord.tasks.find(
                  (t) => t.taskId === task.id
                ) || { taskId: task.id, completed: false };
                return (
                  <DailyTaskCard
                    key={task.id}
                    task={task}
                    completion={completion}
                    onToggle={toggleTask}
                    isAnimating={animatingTaskId === task.id}
                    index={index}
                  />
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <StreakCalendar
            isDayCompleted={isDayCompleted}
            isDayPartial={isDayPartial}
            getDayRecord={getDayRecord}
            dailyTasks={DAILY_TASKS}
            totalCompletedDays={streakData.totalCompletedDays}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
