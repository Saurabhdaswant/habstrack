import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isAfter,
  isEqual,
  startOfMonth,
  startOfToday,
  startOfWeek,
  sub,
  subDays,
} from "date-fns";
import React, { useContext, useRef, useState } from "react";
import { PlusSquare } from "react-feather";
import { colors, doitat, weekDays } from "./constants";
import HabitForm from "./HabitForm";
import Habits from "./Habits";
import { HabitsContext } from "../Providers/HabitsProvider";
import useToggle from "../hooks/useToggle";
import { v4 as uuidv4 } from "uuid";
import Calendar from "./Calendar";

import useClickOutSide from "../hooks/useClickOutSide";
import { CalendarIcon } from "@heroicons/react/24/outline";

const Header = ({ selectedDay, today, setShowHabitForm, setSelectedDay }) => {
  const [showDialog, setShowDialog] = useState(false);
  let domNode = useClickOutSide(() => setShowDialog(false));

  return (
    <div className="flex justify-between items-end">
      <div className="  ">
        {isEqual(selectedDay, today) ? (
          <>
            <p className="text-3xl font-bold text-[#2e2e2e]">Today</p>
            <p className="text-gray-400 text-xl">
              {format(selectedDay, "eeee")} {format(selectedDay, "MMMM dd")}
            </p>
          </>
        ) : (
          <>
            <p className="text-3xl font-bold text-[#2e2e2e]">
              {format(selectedDay, "MMMM dd")}
            </p>
            <p className="text-gray-400 text-xl">
              {format(selectedDay, "eeee")}
            </p>
          </>
        )}
      </div>
      <div className="flex items-end gap-6">
        <div ref={domNode} className="relative">
          <button
            className="p-2 bg-white rounded text-gray-600 "
            onClick={() => setShowDialog(true)}
          >
            <CalendarIcon className=" w-7" />
          </button>

          <div className=" absolute  mt-10  ">
            {showDialog && (
              <Calendar
                currDate={selectedDay}
                setCurrDate={setSelectedDay}
                toggleCalendar={() => setShowDialog(false)}
                canSelectDaysAfterToday={false}
              />
            )}
          </div>
        </div>

        <button
          onClick={() => setShowHabitForm(true)}
          className=" flex justify-between items-center gap-2 font-medium  bg-gradient-to-bl from-[#0FC9F2] to-[#0F85F2] px-5 py-2 rounded text-lg text-white"
        >
          <PlusSquare />
          <p>Add Habit</p>
        </button>
      </div>
    </div>
  );
};

const WeekDatePicker = ({ selectedDay, setSelectedDay }) => {
  const week = eachDayOfInterval({
    start: startOfWeek(selectedDay),
    end: endOfWeek(selectedDay),
  });

  return (
    <div className="bg-white flex items-center justify-evenly h-20 rounded-md  my-4 lg:my-8 ">
      {week.map((day) => {
        return (
          <div
            onClick={() => {
              if (isAfter(day, startOfToday())) {
                return;
              }
              setSelectedDay(day);
            }}
            key={day.toString()}
            className="text-center space-y-2 cursor-pointer "
          >
            <p className=" text-xs capitalize text-gray-400 ">
              {format(day, "eee")}
            </p>
            <p
              className={` font-bold text-lg ${
                isEqual(selectedDay, day) ? "text-[#007BFF]" : "text-gray-600"
              }  `}
            >
              {format(day, "d")}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default function HabitTracker() {
  const { habits, updateHabits } = useContext(HabitsContext);
  const [showHabitForm, setShowHabitForm] = useState(false);
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [error, setError] = useState(false);
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState("anytime");

  const dateWhichIsBeforeCurrDate = sub(today, {
    days: 5,
  });

  // use this if needed instead of today! 👆🏽

  const newHabit = {
    id: uuidv4(),
    name: "",
    getDoneIn: "anytime",
    color: "",
    completedOnDates: [],
    createdDate: today,
    repeatHabitDays: weekDays,
  };

  const handleCreateHabit = (currHabit) => {
    if (currHabit.name.trim().length === 0) {
      setError(true);
      return;
    } else {
      setError(false);

      if (currHabit.color === "") {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        currHabit.color = randomColor;
      }

      if (currHabit.getDoneIn === "") {
        currHabit.getDoneIn = "anytime";
      }

      const newHabits = [...(habits || []), currHabit];

      updateHabits(newHabits);
      setShowHabitForm(false);
    }
  };

  return (
    <div className=" mx-auto w-full max-w-[90%]  md:max-w-[95%] xl:max-w-[80%] 2xl:max-w-[70%] flex justify-between py-4 lg:py-8     lg:gap-8  ">
      <main className=" mx-auto w-full max-w-xl lg:max-w-[60%]   ">
        <Header
          selectedDay={selectedDay}
          today={today}
          setShowHabitForm={setShowHabitForm}
          setSelectedDay={setSelectedDay}
        />
        <WeekDatePicker
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
        <div className=" flex items-center gap-4 my-4 lg:my-8 overflow-scroll scrollbar-hide   ">
          {doitat.map((time, idx) => {
            return (
              <div
                onClick={() => setSelectedTimeOfDay(time)}
                key={idx}
                className={` cursor-pointer font-bold capitalize px-4 py-2  rounded-md ${
                  selectedTimeOfDay === time
                    ? "bg-[#BFE1FF]   text-[#02518B]"
                    : "bg-[#EDEDED]    text-gray-400"
                }`}
              >
                {time === "anytime" ? "All" : time}
              </div>
            );
          })}
        </div>
        <Habits
          selectedDay={selectedDay}
          selectedTimeOfDay={selectedTimeOfDay}
        />
      </main>
      <div>
        {showHabitForm ? (
          <HabitForm
            formTitle="Add New Habit"
            habit={newHabit}
            setShowHabitForm={setShowHabitForm}
            handleSubmit={handleCreateHabit}
            error={error}
          />
        ) : null}
      </div>
    </div>
  );
}
