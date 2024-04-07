import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isAfter,
  isEqual,
  isToday,
  parse,
  startOfToday,
} from "date-fns";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Calendar({
  currDate,
  setCurrDate,
  toggleCalendar,
  canSelectDaysAfterToday,
  completedHabitDates,
}) {
  let [currentMonth, setCurrentMonth] = useState(format(currDate, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  return (
    <div className=" bg-white  p-4 min-w-[307px] shadow-md rounded-md ">
      <div className="flex items-center ">
        <h2 className="flex-auto font-semibold text-gray-900">
          {format(firstDayCurrentMonth, "MMMM yyyy")}
        </h2>
        <button
          type="button"
          onClick={previousMonth}
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
        </button>
        <button
          onClick={nextMonth}
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
      <div className="grid grid-cols-7 mt-4 text-xs leading-6 text-center text-gray-500">
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>
      <div className="grid grid-cols-7 mt-2 text-sm">
        {days.map((day, dayIdx) => (
          <div
            key={day.toString()}
            className={classNames(
              dayIdx === 0 && colStartClasses[getDay(day)],
              "py-1.5"
            )}
          >
            {toggleCalendar ? (
              <button
                type="button"
                onClick={() => {
                  if (
                    isAfter(day, startOfToday()) &&
                    !canSelectDaysAfterToday
                  ) {
                    return;
                  }
                  setCurrDate(day);
                  toggleCalendar();
                }}
                className={classNames(
                  isEqual(currDate, day) && !isToday(day) && " bg-blue-200 ",
                  isToday(day) && "text-white bg-blue-500 ",
                  !isEqual(day, currDate) &&
                    !isToday(day) &&
                    " hover:bg-gray-200 ",
                  isAfter(day, startOfToday()) && "text-gray-400",
                  "mx-auto flex h-6 w-6 items-center justify-center rounded-full "
                )}
              >
                <time dateTime={format(day, "yyyy-MM-dd")}>
                  {format(day, "d")}
                </time>
              </button>
            ) : (
              <div
                className={classNames(
                  completedHabitDates?.includes(day.toISOString()) &&
                    "text-white bg-green-500 ",
                  "mx-auto flex h-6 w-6 items-center justify-center rounded-full "
                )}
              >
                <time dateTime={format(day, "yyyy-MM-dd")}>
                  {format(day, "d")}
                </time>
              </div>
            )}
          </div>
        ))}
      </div>
      {toggleCalendar && (
        <div className="flex text-sm pt-4 justify-between font-semibold  border-t-2 border-gray-100 mt-2">
          <button
            className="uppercase"
            onClick={() => {
              toggleCalendar();
            }}
          >
            Close
          </button>
          <button
            className="uppercase"
            onClick={() => {
              setCurrDate(startOfToday());
              toggleCalendar();
            }}
          >
            Today
          </button>
        </div>
      )}
    </div>
  );
}

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
