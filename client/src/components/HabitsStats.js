import {
	CheckCircle,
	TrendingUp,
	Zap,
} from "react-feather";

export default function HabitsStats() {
	return <div className="grid grid-cols-2 gap-6 p-6 bg-white rounded-md mt-10">
		<div className="flex items-center gap-2 ">
			<div className=" grid place-items-center bg-[#D6FCD8]  text-[#242424] w-10 h-10 rounded-lg ">
				<TrendingUp className="  w-5 h-5  " />
			</div>
			<div>
				<p className="text-2xl font-medium ">90%</p>
				<p className="text-gray-400 text-sm ">
					Completion Rate
				</p>
			</div>
		</div>
		<div className="flex items-center gap-2 ">
			<div className=" grid place-items-center bg-[#FCF4D6]  text-[#242424] w-10 h-10 rounded-lg ">
				<Zap className="  w-5 h-5  " />
			</div>
			<div>
				<p className="text-2xl font-medium ">15</p>
				<p className="text-gray-400 text-sm ">
					Current Strike
				</p>
			</div>
		</div>
		<div className="flex items-center gap-2 ">
			<div className=" grid place-items-center bg-[#F0D6FC]  text-[#242424] w-10 h-10 rounded-lg ">
				<CheckCircle className="  w-5 h-5  " />
			</div>
			<div>
				<p className="text-2xl font-medium ">80</p>
				<p className="text-gray-400 text-sm ">
					Habits Finished
				</p>
			</div>
		</div>
		<div className="flex items-center gap-2 ">
			<div className=" grid place-items-center bg-[#D6F5FC]  text-[#242424] w-10 h-10 rounded-lg ">
				<TrendingUp className="  w-5 h-5  " />
			</div>
			<div>
				<p className="text-2xl font-medium ">200</p>
				<p className="text-gray-400 text-sm ">
					Perfect Days
				</p>
			</div>
		</div>
	</div>
}
