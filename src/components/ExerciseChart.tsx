"use client";

import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Props = {
  exercise: {
    index: number;
    title: string;
    notes?: string;
    sets: {
      index: number;
      weight_kg: number;
      reps: number;
      type: string;
      rpe?: number;
    }[];
  };
};

export default function ExerciseChart({ exercise }: Props) {
  const chartData = exercise.sets.map((set) => ({
    set: set.index + 1,
    weight: set.weight_kg,
    reps: set.reps,
  }));

  return (
    <div className=" bg-gray-50 border border-gray-100 rounded-lg p-3">
      <p className="font-semibold">
        {exercise.index + 1}. {exercise.title}
      </p>
      {exercise.notes && <p className="text-sm">{exercise.notes}</p>}

      <div className="mt-2 space-y-1">
        {exercise.sets.map((set) => (
          <p
            key={set.index}
            className={`${
              set.type === "warmup" &&
              "bg-orange-100 border-orange-200 border opacity-60"
            } ${
              set.type === "dropset" && "bg-blue-100 border border-blue-200"
            } ${
              set.type === "failure" && "bg-red-100 border border-red-200"
            } p-1 pl-2 rounded-md relative text-sm`}
          >
            {set.index + 1}. {set.weight_kg}kg × {set.reps}{" "}
            {set.rpe && `@ ${set.rpe} rpe`}
            {set.type === "warmup" && (
              <span className="absolute top-1/2 right-2 transform -translate-y-1/2 text-xs font-medium text-yellow-600">
                rozgrzewka
              </span>
            )}
            {set.type === "dropset" && (
              <span className="absolute top-1/2 right-2 transform -translate-y-1/2 text-xs font-medium text-blue-600">
                dropset
              </span>
            )}
            {set.type === "normal" && (
              <span className="absolute top-1/2 right-2 transform -translate-y-1/2 text-xs font-medium text-primary">
                robocza
              </span>
            )}
            {set.type === "failure" && (
              <span className="absolute top-1/2 right-2 transform -translate-y-1/2 text-xs font-medium text-primary text-rose-900">
                niepowodzenie
              </span>
            )}
          </p>
        ))}
      </div>

      <div className="mt-4 h-50 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="set" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="weight"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.1}
              name="kg"
            />
            <Area
              type="monotone"
              dataKey="reps"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.3}
              name="powtórzenia"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
