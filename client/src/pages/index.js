import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [habits, sethabits] = useState([]);

  useEffect(() => {
    async function gethabits() {
      const res = await fetch("http://localhost:5000/api/habits", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const habits = await res.json();

      sethabits(habits);
    }
    gethabits();
  }, []);

  console.log("getting habits here : ", habits);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1 className=" font-black text-7xl text-blue-400 ">peace</h1>
    </main>
  );
}
