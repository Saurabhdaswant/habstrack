import React, { useContext } from "react";
import { Clipboard } from "react-feather";
import Habit from "./Habit";
import {
  getDay,
  isAfter,
  isBefore,
  isSameDay,
  isToday,
  startOfToday,
} from "date-fns";
import days from "../Data/Days";
import { HabitsContext } from "../Providers/HabitsProvider";

const NoHabits = ({ children }) => {
  return (
    <div className=" flex flex-col gap-4 items-center ">
      <Clipboard className="w-20 h-20" />
      <p className=" text-gray-400 w-full text-center">{children}</p>
    </div>
  );
};

export default function Habits({ selectedDay, selectedTimeOfDay }) {
  const { habits } = useContext(HabitsContext);

  const currentDay = days[getDay(selectedDay)];
  const anyTimeOfDay = selectedTimeOfDay === "anytime";

  const isAfterCreation = (habit) =>
    isSameDay(selectedDay, new Date(habit.createdDate)) ||
    isToday(selectedDay) ||
    isAfter(selectedDay, new Date(habit.createdDate));

  const isRepeatDay = (habit) => habit.repeatHabitDays.includes(currentDay);
  const isBeforeEndDate = (habit) =>
    habit.endDate === undefined ||
    isBefore(selectedDay, new Date(habit.endDate));

  const matchesSelectedTimeOfDay = (habit) =>
    habit.getDoneIn === selectedTimeOfDay;

  let filteredHabits = habits
    ?.filter(isAfterCreation)
    ?.filter(isRepeatDay)
    ?.filter(isBeforeEndDate);

  if (!anyTimeOfDay) {
    filteredHabits = filteredHabits?.filter(matchesSelectedTimeOfDay);
  }

  if (
    !filteredHabits ||
    filteredHabits.length === 0 ||
    isAfter(selectedDay, startOfToday())
  ) {
    return <NoHabits>No Habits Found!</NoHabits>;
  }

  return (
    <div className=" scrollbar-hide h-[50vh]  overflow-auto ">
      {filteredHabits?.map((habit, _) => {
        return <Habit key={habit.id} habit={habit} currDate={selectedDay} />;
      })}
    </div>
  );
}
