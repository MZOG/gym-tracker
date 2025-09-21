"use client";

import { useState, useEffect } from "react";
import { subDays } from "date-fns";
import getWorkoutsEvents from "@/queries/getWorkoutsEvents";
import { Workout } from "@/types/types";
import WorkoutTimeChart from "./EventsChart";

type WorkoutEvent = {
  type: string;
  workout: Workout;
};

type InitialWorkouts = {
  events: WorkoutEvent[];
  page: number;
  page_count: number;
};

type Props = {
  initialWorkouts: InitialWorkouts;
};

type FilterRange = "7" | "14" | "30" | "custom";

export default function WorkoutsEvents({ initialWorkouts }: Props) {
  const [filter, setFilter] = useState<FilterRange>("7");
  const [customDate, setCustomDate] = useState<string>("");
  const [since, setSince] = useState<string>("");
  const [pageSize, setPageSize] = useState(5);
  const [events, setEvents] = useState<WorkoutEvent[]>(initialWorkouts.events);

  useEffect(() => {
    let date: Date;

    switch (filter) {
      case "7":
        date = subDays(new Date(), 7);
        break;
      case "14":
        date = subDays(new Date(), 14);
        break;
      case "30":
        date = subDays(new Date(), 30);
        break;
      case "custom":
        date = customDate ? new Date(customDate) : new Date();
        break;
      default:
        date = new Date(1970, 0, 1);
    }
    const iso = date.toISOString().split(".")[0] + "Z";
    setSince(encodeURIComponent(iso));
  }, [filter, customDate]);

  useEffect(() => {
    if (!since) return;

    const fetchWorkouts = async () => {
      const res = await getWorkoutsEvents({
        page: 1,
        pageSize: pageSize,
        since: since,
        api: process.env.NEXT_PUBLIC_HEVY_API_KEY,
      });
      setEvents(res.events);
    };

    fetchWorkouts();
  }, [since, pageSize]);

  return (
    <div className="flex flex-col gap-4">
      {/* Filter buttons */}
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <button
            className={`text-sm px-2 py-1 cursor-pointer font-medium rounded ${
              filter === "7" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter("7")}
          >
            Last 7 days
          </button>
          <button
            className={`text-sm px-2 py-1 cursor-pointer font-medium rounded ${
              filter === "14" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter("14")}
          >
            Last 14 days
          </button>
          <button
            className={`text-sm px-2 py-1 cursor-pointer font-medium rounded ${
              filter === "30" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter("30")}
          >
            Last 30 days
          </button>
          <button
            className={`text-sm px-2 py-1 cursor-pointer font-medium rounded ${
              filter === "custom" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter("custom")}
          >
            Custom
          </button>
        </div>

        <div className="flex gap-2 items-center">
          <button
            className={`text-sm px-2 py-1 cursor-pointer font-medium rounded ${
              pageSize === 5 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setPageSize(5)}
          >
            5
          </button>
          <button
            className={`text-sm px-2 py-1 cursor-pointer font-medium rounded ${
              pageSize === 10 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setPageSize(10)}
          >
            10
          </button>
        </div>
      </div>

      {filter === "custom" && (
        <input
          type="date"
          className="border border-gray-200 p-2 text-sm rounded"
          value={customDate}
          onChange={(e) => setCustomDate(e.target.value)}
        />
      )}

      <WorkoutTimeChart events={events} />
    </div>
  );
}
