import React from 'react'
import {
	CartesianGrid,
	YAxis,
	ResponsiveContainer,
	AreaChart,
	Area,
} from "recharts";

function HabitsCompletionChart() {
	const habitCompletionData = [
		{ name: "10 Nov", completedHabits: 0 },
		{ name: "11 Nov", completedHabits: 10 },
		{ name: "12 Nov", completedHabits: 8 },
		{ name: "14 Nov", completedHabits: 15 },
		{ name: "14 Nov", completedHabits: 12 },
	];

	return (
		<div className="bg-white mt-10 p-6 pl-0 rounded-md">
			<ResponsiveContainer width="100%" height={200}>
				<AreaChart data={habitCompletionData}>
					<defs>
						<linearGradient
							id="colorPv"
							x1="0"
							y1="0"
							x2="0"
							y2="1"
						>
							<stop
								offset="5%"
								stopColor="#0F85F2"
								stopOpacity={0.8}
							/>
							<stop
								offset="95%"
								stopColor="#0F85F2"
								stopOpacity={0}
							/>
						</linearGradient>
					</defs>
					<Area
						type="monotone"
						dataKey="completedHabits"
						stroke="#0F85F2"
						fillOpacity={1}
						fill="url(#colorPv)"
					/>
					<YAxis
						dataKey="completedHabits"
						axisLine={false}
						tickLine={false}
						tickCount={8}
						tickFormatter={number => `${number} k`}
					/>
					<CartesianGrid
						vertical={false}
						stroke="#2a2a2a"
						opacity={0.1}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	)
}

export default HabitsCompletionChart