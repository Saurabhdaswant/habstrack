import React from "react";
import {
  CalendarIcon,
  ChartBarIcon,
  CogIcon,
  HeartIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import { Music, Wind } from "react-feather";

function Sidebar() {
  return (
    <div className=" hidden xl:block z-50 w-[15%] bg-white  ">
      <div className="h-[10%] flex items-center gap-2  justify-center  ">
        <Image src="/headway.svg" alt="Vercel Logo" width={10} height={0} />
        <p className=" text-xl font-extrabold  text-gray-900 ">Headway</p>
      </div>
      <div className=" flex flex-col justify-between  h-[90%]">
        <ul className="  px-4  ">
          <li className="py-3 px-4 flex items-center gap-2  rounded-md font-medium bg-[#2e2e2e] text-white my-4">
            <CalendarIcon className=" w-5 h-5 " /> Habit Tracker
          </li>
          {/* <li className="py-4 px-4 flex items-center gap-2  rounded-md font-medium">
					<HeartIcon className=" w-5 h-5 " /> Workout Tracker
				</li>
				<li className="py-4 px-4 flex items-center gap-2  rounded-md font-medium">
					<Wind className=" w-5 h-5 " /> Meditate
				</li>
				
				<li className="py-4 px-4 flex items-center gap-2  rounded-md font-medium">
					<ChartBarIcon className=" w-5 h-5 " /> Dashboard
				</li> */}
          <li className="py-4 px-4 flex items-center gap-2  rounded-md font-medium">
            <UserCircleIcon className=" w-[1.4rem] h-[1.4rem] " /> Profile
          </li>
          <li className="py-4 px-4 flex items-center gap-2  rounded-md font-medium">
            <CogIcon className=" w-[1.4rem] h-[1.4rem]" /> Settings
          </li>
        </ul>
        <div className=" flex items-center justify-center gap-2 border-t py-4 border-gray-200  ">
          <div className=" w-12 h-12 bg-slate-300 rounded-full"></div>
          <p className=" font-medium ">Saurabh</p>{" "}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
