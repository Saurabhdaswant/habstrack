import React, { createContext, useEffect, useState } from "react";

export const HabitsContext = createContext();

export default function HabitsProvider({ children }) {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHabits(JSON.parse(localStorage.getItem("Habits")));
    }
  }, []);

  const updateHabits = (newHabits) => {
    setHabits(newHabits);

    if (typeof window !== "undefined") {
      localStorage.setItem("Habits", JSON.stringify([...newHabits]));
    }
  };

  return (
    <HabitsContext.Provider value={{ habits, updateHabits }}>
      {children}
    </HabitsContext.Provider>
  );
}
