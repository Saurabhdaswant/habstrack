import {
  isThisMonth,
  isThisWeek,
  isThisYear,
  startOfToday,
  sub,
} from "date-fns";
import { X } from "react-feather";
import { Cell, Label, Pie, PieChart } from "recharts";
import {
  getTheBestStreakCount,
  getTheCurrentStreakCount,
  getAllStreaks,
  getDates,
  filterDatesByWeekdays,
} from "../utils/utils";
import Calendar from "./Calendar";
import useClickOutSide from "../hooks/useClickOutSide";

function HabitStats({ habit, toggleStats }) {
  const yesterday = sub(startOfToday(), {
    days: 1,
  });

  const consecutiveDates = getAllStreaks(
    habit.completedOnDates.map((d) => new Date(d))
  );

  const bestStreakCount = getTheBestStreakCount(consecutiveDates);
  const currentStreakCount = getTheCurrentStreakCount(
    consecutiveDates,
    startOfToday(),
    yesterday
  );

  const datesSinceCreationOfHabit = getDates(
    new Date(habit.createdDate),
    startOfToday()
  );

  const daysSinceCreationOfHabit = filterDatesByWeekdays(
    datesSinceCreationOfHabit,
    habit.repeatHabitDays
  ).length;

  const datesWhenHabitWasCompleted = filterDatesByWeekdays(
    habit?.completedOnDates,
    habit.repeatHabitDays
  );

  const totalStreakPercentage = Math.floor(
    (datesWhenHabitWasCompleted.length / daysSinceCreationOfHabit) * 100
  );

  const missedHabitCount =
    daysSinceCreationOfHabit - datesWhenHabitWasCompleted.length;
  const missedHabitPercentage = Math.floor(
    (missedHabitCount / daysSinceCreationOfHabit) * 100
  );

  const completedHabitsOfYear = datesWhenHabitWasCompleted.filter((date) =>
    isThisYear(new Date(date))
  );

  const completedHabitsOfMonth = datesWhenHabitWasCompleted.filter((date) =>
    isThisMonth(new Date(date))
  );

  const completedHabitsOfWeek = datesWhenHabitWasCompleted.filter((date) =>
    isThisWeek(new Date(date))
  );

  const allTimeCompletedHabitsCount = datesWhenHabitWasCompleted.length;
  const completedThisYear = completedHabitsOfYear.length;
  const completedThisMonth = completedHabitsOfMonth.length;
  const completedThisWeek = completedHabitsOfWeek.length;

  const data = [
    { name: "Group A", value: totalStreakPercentage },
    { name: "Group B", value: missedHabitPercentage },
  ];
  const COLORS = ["#0fc9f2", "#f3f3f3"];

  const completedHabitDatesISO = datesWhenHabitWasCompleted.map((date) =>
    date?.toISOString()
  );
  let domNode = useClickOutSide(() => toggleStats());

  return (
    <div className=" fixed inset-0 z-40 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50  ">
      <div
        ref={domNode}
        className="p-4 lg:p-8 absolute space-y-4 scrollbar-hide lg:space-y-8 top-0 right-0 w-full overflow-scroll max-w-[450px] bg-white rounded-md rounded-r-none z-50 h-full"
      >
        <div className="flex justify-between">
          <h1 className=" text-2xl ">Statistics</h1>
          <X onClick={toggleStats} className=" cursor-pointer " />
        </div>
        <div className="space-y-4 ">
          <p className="  font-semibold   ">Habit Score</p>
          <PieChart width={400} height={170}>
            <Pie
              data={data}
              cx={200}
              cy={80}
              innerRadius={60}
              outerRadius={80}
              fill="#0fc9f2"
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={123332} fill={COLORS[index % COLORS.length]} />
              ))}
              <Label
                value={totalStreakPercentage}
                className=" font-bold text-5xl  "
                position="center"
              />
            </Pie>
          </PieChart>
        </div>
        <div className="space-y-4  ">
          <p className="  font-semibold   ">Streak</p>
          <div className="flex  justify-between   bg-white rounded-md ">
            <div className="flex items-center gap-4 ">
              <div className=" grid place-items-center bg-[#D6FCD8]  text-[#242424] w-12 h-12 rounded-lg ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-medium ">
                  {currentStreakCount} Days
                </p>
                <p className="text-gray-400 text-sm ">Current Streak </p>
              </div>
            </div>
            <div className="flex items-center gap-4 ">
              <div className=" grid place-items-center bg-[#f2e7bb]  text-[#242424] w-12 h-12 rounded-lg ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                  />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-medium ">{bestStreakCount} Days</p>
                <p className="text-gray-400 text-sm ">Best Strike</p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4 my-4  ">
          <p className="  font-semibold   ">Times Completed</p>
          <div className="  space-y-4 ">
            <div className="flex justify-between items-center bg-gray-100 px-4 ">
              <p>This Week</p>
              <h1 className=" font-semibold text-lg ">{completedThisWeek}</h1>
            </div>
            <div className="flex justify-between items-center bg-gray-100 px-4 ">
              <p>This Month</p>
              <h1 className=" font-semibold text-lg ">{completedThisMonth}</h1>
            </div>
            <div className="flex justify-between items-center bg-gray-100 px-4 ">
              <p>This Year</p>
              <h1 className=" font-semibold text-lg ">{completedThisYear}</h1>
            </div>
            <div className="flex justify-between items-center bg-gray-100 px-4 ">
              <p>All</p>
              <h1 className=" font-semibold text-lg ">
                {allTimeCompletedHabitsCount}
              </h1>
            </div>
          </div>
        </div>

        <div className="space-y-4 my-4  ">
          <p className="  font-semibold   ">Calendar Progrees</p>
          <Calendar
            currDate={startOfToday()}
            completedHabitDates={completedHabitDatesISO}
          />
        </div>
      </div>
    </div>
  );
}

export default HabitStats;
