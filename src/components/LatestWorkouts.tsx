import getWorkouts from "@/queries/getWorkouts";

import { Workout } from "@/types/types";
import diffTime from "@/utils/diffTime";

import Link from "next/link";

const LatestWorkouts = async () => {
  const data = await getWorkouts({ page: 1, pageSize: 5 });

  if (!data) {
    // create a generic error component
    return <p>Błąd</p>;
  }

  // get workouts array from response
  const { workouts } = data;

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-1">
      <h1 className="font-medium">Ostatnie treningi</h1>
      <div className="flex flex-col gap-2">
        {workouts.map(({ id, title, start_time, end_time }: Workout) => {
          return (
            <LatestWorkoutCard key={id} slug={id}>
              <LatestWorkoutTitle title={title} />
              <LatestWorkoutTime start_time={start_time} end_time={end_time} />
            </LatestWorkoutCard>
          );
        })}
      </div>
    </div>
  );
};

const LatestWorkoutCard = ({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug: string;
}) => (
  <Link
    href={`/workout/${slug}`}
    className="p-2 border border-gray-200 rounded-lg bg-gray-50"
  >
    {children}
  </Link>
);

const LatestWorkoutTitle = ({ title }: { title: string }) => <h2>{title}</h2>;
const LatestWorkoutTime = ({
  start_time,
  end_time,
}: {
  start_time: string;
  end_time: string;
}) => <p className="text-sm font-medium">{diffTime(start_time, end_time)}</p>;

export default LatestWorkouts;
