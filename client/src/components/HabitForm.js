import React, { useState } from "react";
import { X } from "react-feather";
import { filterDatesByWeekdays } from "../utils/utils";
import { arraysHaveSameStrings, colors, doitat, weekDays } from "./constants";
import { DialogComponent } from "./HabitTracker";
import Calendar from "./Calendar";
import useToggle from "../hooks/useToggle";
import { startOfToday } from "date-fns";
import useClickOutSide from "../hooks/useClickOutSide";

function HabitForm({
  formTitle,
  habit,
  setShowHabitForm,
  handleSubmit,
  error,
}) {
  const [currHabit, setCurrHabit] = useState(habit);
  const [showDialog, toggleDialog] = useToggle(false);

  const addDayIntoRepeatHabitDaysList = (day) => {
    if (currHabit.repeatHabitDays.includes(day)) {
      const newRepeatedHabitDays = currHabit.repeatHabitDays.filter(
        (d) => d !== day
      );

      const newCompletedOnDates = filterDatesByWeekdays(
        currHabit.completedOnDates,
        newRepeatedHabitDays
      );

      setCurrHabit({
        ...currHabit,
        repeatHabitDays: [...new Set(newRepeatedHabitDays)],
        completedOnDates: newCompletedOnDates,
      });
      return;
    }

    const newRepeatedHabitDays = [...currHabit.repeatHabitDays, day];
    const newCompletedOnDates = filterDatesByWeekdays(
      currHabit.completedOnDates,
      newRepeatedHabitDays
    );

    setCurrHabit({
      ...currHabit,
      repeatHabitDays: [...new Set(newRepeatedHabitDays)],
      completedOnDates: newCompletedOnDates,
    });
  };

  const updateEndDate = (date) => {
    setCurrHabit({
      ...currHabit,
      endDate: date,
    });
  };

  return (
    <div className=" fixed inset-0 z-40 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50 ">
      <div className=" p-4  lg:p-8 absolute space-y-4 lg:space-y-8 top-0 right-0 w-full max-w-[450px] bg-white rounded-md z-50 h-full ">
        <div className="flex justify-between">
          <h1 className=" text-2xl ">{formTitle}</h1>
          <X
            onClick={() => setShowHabitForm(false)}
            className=" cursor-pointer "
          />
        </div>
        <div className=" flex flex-col   h-full ">
          <div className=" space-y-4  lg:space-y-8 overflow-scroll scrollbar-hide h-[70vh] ">
            <div className="flex flex-col  lg:space-y-2">
              <label htmlFor="habitName" className="font-semibold pb-2">
                Habit
              </label>
              <input
                onChange={(e) =>
                  setCurrHabit({
                    ...currHabit,
                    name: e.target.value,
                  })
                }
                value={currHabit.name}
                name="habitName"
                id="habitName"
                className={`
							outline-none focus:border-[#0F85F2]  font-medium 
							border-2    px-4 py-2 rounded ${
                currHabit.name?.length > 0 && error
                  ? "border-zinc-200"
                  : error
                  ? "border-red-500"
                  : null
              }`}
              />
            </div>
            <div className="flex flex-col space-y-2 ">
              <p className="font-semibold">Repeat Habit days </p>
              <div className="space-y-4">
                <div className=" grid grid-cols-7 gap-2 ">
                  {weekDays.map((day) => {
                    return (
                      <div
                        onClick={() => addDayIntoRepeatHabitDaysList(day)}
                        key={day}
                        className={` text-sm  ${
                          currHabit.repeatHabitDays?.includes(day)
                            ? "bg-[#0F85F2] border-[#0F85F2]  text-white "
                            : "  hover:bg-blue-100 hover:border-blue-300  border-zinc-200 "
                        } cursor-pointer capitalize text-center  font-medium border-2  py-2 rounded `}
                      >
                        {day.slice(0, 3)}
                      </div>
                    );
                  })}
                </div>
                <div className=" grid grid-cols-2 gap-6 ">
                  <div
                    onClick={() =>
                      setCurrHabit({
                        ...currHabit,
                        repeatHabitDays: [...weekDays].splice(0, 5),
                      })
                    }
                    className={`  ${
                      arraysHaveSameStrings(
                        currHabit.repeatHabitDays,
                        [...weekDays].splice(0, 5)
                      )
                        ? "bg-[#0F85F2] border-[#0F85F2]  text-white "
                        : "  hover:bg-blue-100 hover:border-blue-300  border-zinc-200 "
                    } cursor-pointer capitalize text-center  font-medium border-2  px-4 py-2 rounded `}
                  >
                    Week days
                  </div>
                  <div
                    onClick={() =>
                      setCurrHabit({ ...currHabit, repeatHabitDays: weekDays })
                    }
                    className={`  ${
                      currHabit.repeatHabitDays?.length === 7
                        ? "bg-[#0F85F2] border-[#0F85F2]  text-white "
                        : "  hover:bg-blue-100 hover:border-blue-300  border-zinc-200 "
                    } cursor-pointer capitalize text-center  font-medium border-2  px-4 py-2 rounded `}
                  >
                    Every day
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2 ">
              <p className="font-semibold">Do it at</p>
              <div className=" grid grid-cols-2 gap-x-6 gap-y-4 ">
                {doitat.map((time, idx) => {
                  return (
                    <div
                      onClick={() =>
                        setCurrHabit({ ...currHabit, getDoneIn: time })
                      }
                      key={idx}
                      className={` ${
                        currHabit.getDoneIn === time
                          ? "bg-[#0F85F2] border-[#0F85F2]  text-white "
                          : "  hover:bg-blue-100 hover:border-blue-300  border-zinc-200 "
                      } cursor-pointer capitalize text-center  font-medium border-2  px-4 py-2 rounded `}
                    >
                      {time}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col space-y-2 ">
              <p className="font-semibold">Color</p>
              <div className=" grid grid-cols-6 gap-2 ">
                {colors.map((color, idx) => {
                  return (
                    <div
                      onClick={() => setCurrHabit({ ...currHabit, color })}
                      key={idx}
                      className={` cursor-pointer capitalize text-center h-12  rounded  bg-${color}  ${
                        color === currHabit.color
                          ? `outline outline-offset-2 outline-[#0F85F2] `
                          : null
                      }`}
                    ></div>
                  );
                })}
              </div>
            </div>
            {/* <div className="flex flex-col space-y-2 ">
              <p className="font-semibold">End Date</p>
              <DialogComponent
                showDialog={showDialog}
                toggleDialog={toggleDialog}
              >
                {showDialog && (
                  <Calendar
                    currDate={startOfToday()}
                    setCurrDate={updateEndDate}
                    toggleCalendar={toggleDialog}
                    canSelectDaysAfterToday={true}
                  />
                )}
              </DialogComponent>
            </div> */}
          </div>
          <button
            onClick={() => handleSubmit(currHabit)}
            type="submit"
            className=" w-full my-8 font-semibold  bg-[#2e2e2e] hover:bg-[#2e2e2eed] text-white px-14 rounded py-4 "
          >
            {formTitle}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HabitForm;
