import { useState, useCallback, useEffect } from "react";
import { format, isToday, isYesterday, parseISO, startOfDay, differenceInCalendarDays } from "date-fns";

export interface DailyTask {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name
  category: "skincare" | "lifestyle" | "nutrition";
}

export interface TaskCompletion {
  taskId: string;
  completed: boolean; // true = Yes, false = No / not completed
}

export interface DayRecord {
  date: string; // ISO date string YYYY-MM-DD
  tasks: TaskCompletion[];
  allCompleted: boolean;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalCompletedDays: number;
  dayRecords: Record<string, DayRecord>; // key = YYYY-MM-DD
}

const STORAGE_KEY = "skincare-streak-data";

// Predefined daily tasks based on skincare analysis
export const DAILY_TASKS: DailyTask[] = [
  {
    id: "cleanse",
    title: "Morning Cleanse",
    description: "Wash face with gentle cleanser",
    icon: "Droplets",
    category: "skincare",
  },
  {
    id: "sunscreen",
    title: "Apply Sunscreen SPF 30+",
    description: "Protect skin from UV damage",
    icon: "Sun",
    category: "skincare",
  },
  {
    id: "moisturize",
    title: "Moisturize",
    description: "Apply hydrating moisturizer",
    icon: "Shield",
    category: "skincare",
  },
  {
    id: "serum",
    title: "Apply Treatment Serum",
    description: "Vitamin C or targeted serum",
    icon: "Sparkles",
    category: "skincare",
  },
  {
    id: "water",
    title: "Drink 8 Glasses of Water",
    description: "Stay hydrated throughout the day",
    icon: "GlassWater",
    category: "nutrition",
  },
  {
    id: "sleep",
    title: "7-8 Hours of Sleep",
    description: "Quality sleep for skin repair",
    icon: "Moon",
    category: "lifestyle",
  },
  {
    id: "evening-cleanse",
    title: "Evening Double Cleanse",
    description: "Remove makeup & deep cleanse",
    icon: "Droplets",
    category: "skincare",
  },
  {
    id: "night-cream",
    title: "Night Cream / Retinol",
    description: "Apply overnight treatment",
    icon: "Moon",
    category: "skincare",
  },
];

const loadStreakData = (): StreakData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to load streak data:", e);
  }
  return {
    currentStreak: 0,
    longestStreak: 0,
    totalCompletedDays: 0,
    dayRecords: {},
  };
};

const saveStreakData = (data: StreakData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save streak data:", e);
  }
};

const calculateStreak = (dayRecords: Record<string, DayRecord>): number => {
  const today = startOfDay(new Date());
  let streak = 0;
  let checkDate = today;

  // Check if today is completed
  const todayKey = format(today, "yyyy-MM-dd");
  const todayRecord = dayRecords[todayKey];

  if (todayRecord?.allCompleted) {
    streak = 1;
    checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() - 1);
  } else {
    // If today isn't done yet, start checking from yesterday
    checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() - 1);
  }

  // Walk backwards counting consecutive completed days
  while (true) {
    const key = format(checkDate, "yyyy-MM-dd");
    const record = dayRecords[key];
    if (record?.allCompleted) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};

export const useStreakTracker = () => {
  const [streakData, setStreakData] = useState<StreakData>(loadStreakData);
  const [animatingTaskId, setAnimatingTaskId] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const todayKey = format(new Date(), "yyyy-MM-dd");

  const todayRecord = streakData.dayRecords[todayKey] || {
    date: todayKey,
    tasks: DAILY_TASKS.map((t) => ({ taskId: t.id, completed: false })),
    allCompleted: false,
  };

  const completedToday = todayRecord.tasks.filter((t) => t.completed).length;
  const totalTasks = DAILY_TASKS.length;
  const todayProgress = totalTasks > 0 ? (completedToday / totalTasks) * 100 : 0;

  const toggleTask = useCallback(
    (taskId: string, completed: boolean) => {
      setAnimatingTaskId(taskId);
      setTimeout(() => setAnimatingTaskId(null), 600);

      setStreakData((prev) => {
        const newData = { ...prev };
        const newRecords = { ...newData.dayRecords };

        const existing = newRecords[todayKey] || {
          date: todayKey,
          tasks: DAILY_TASKS.map((t) => ({ taskId: t.id, completed: false })),
          allCompleted: false,
        };

        const newTasks = existing.tasks.map((t) =>
          t.taskId === taskId ? { ...t, completed } : t
        );

        const allDone = newTasks.every((t) => t.completed);

        newRecords[todayKey] = {
          ...existing,
          tasks: newTasks,
          allCompleted: allDone,
        };

        newData.dayRecords = newRecords;

        // Recalculate streak
        newData.currentStreak = calculateStreak(newRecords);
        newData.longestStreak = Math.max(
          newData.longestStreak,
          newData.currentStreak
        );
        newData.totalCompletedDays = Object.values(newRecords).filter(
          (r) => r.allCompleted
        ).length;

        saveStreakData(newData);

        // Trigger confetti when all tasks completed
        if (allDone && !existing.allCompleted) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 2000);
        }

        return newData;
      });
    },
    [todayKey]
  );

  const getDayRecord = useCallback(
    (date: Date): DayRecord | undefined => {
      const key = format(date, "yyyy-MM-dd");
      return streakData.dayRecords[key];
    },
    [streakData.dayRecords]
  );

  const isDayCompleted = useCallback(
    (date: Date): boolean => {
      const key = format(date, "yyyy-MM-dd");
      return streakData.dayRecords[key]?.allCompleted ?? false;
    },
    [streakData.dayRecords]
  );

  const isDayPartial = useCallback(
    (date: Date): boolean => {
      const key = format(date, "yyyy-MM-dd");
      const record = streakData.dayRecords[key];
      if (!record) return false;
      const completed = record.tasks.filter((t) => t.completed).length;
      return completed > 0 && !record.allCompleted;
    },
    [streakData.dayRecords]
  );

  return {
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
    currentStreak: streakData.currentStreak,
    longestStreak: streakData.longestStreak,
  };
};
