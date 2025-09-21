"use client";

import { Workout } from "@/types/types";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line,
} from "recharts";

type WorkoutEvent = {
  type: string;
  workout: Workout;
};

type Props = {
  events: WorkoutEvent[];
};

export default function WorkoutTimeChart({ events }: Props) {
  const chartData = events
    .map((e) => {
      let workingSets = 0;
      let totalKg = 0;

      e.workout.exercises.forEach((ex) => {
        ex.sets.forEach((set) => {
          if (set.type !== "warmup") {
            workingSets += 1;
            totalKg += set.reps * set.weight_kg;
          }
        });
      });

      return {
        date: new Date(e.workout.start_time).toLocaleDateString(),
        workingSets,
        totalKg,
        title: e.workout.title, // include title
      };
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="date" />
          <YAxis
            yAxisId="left"
            label={{ value: "Sets", angle: -90, position: "insideLeft" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: "Total Kg", angle: -90, position: "insideRight" }}
          />
          <Tooltip
            formatter={(value, name) => {
              if (name === "workingSets") return [value, "Serie"];
              if (name === "totalKg") return [value, "KG"];
              return [value, name];
            }}
            labelFormatter={(label, payload) => {
              if (payload && payload.length > 0) {
                return `${label} - ${payload[0].payload.title}`;
              }
              return label;
            }}
          />
          <Legend
            formatter={(value) => (value === "workingSets" ? "serie" : "kg")}
          />
          <Bar yAxisId="left" dataKey="workingSets" fill="#3b82f6" />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="totalKg"
            stroke="#f97316"
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
