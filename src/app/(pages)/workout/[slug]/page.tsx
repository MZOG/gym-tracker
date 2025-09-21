import getWorkout from "@/queries/getWorkout";
import { Workout } from "@/types/types";
import diffTime from "@/utils/diffTime";
import ExerciseChart from "@/components/ExerciseChart";

const WorkoutPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const data: Workout = await getWorkout({ workoutId: slug });

  if (!data) {
    return (
      <section className="px-5 mx-auto max-w-7xl gap-10 my-10">
        <p>error fetching data</p>
      </section>
    );
  }

  const { title, start_time, end_time, exercises } = data;

  console.log(exercises);

  // calculate time
  const workoutTime = (time: string) => {
    const date = new Date(time);
    const calculatedTime = date.toLocaleTimeString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return calculatedTime;
  };

  // calculate kg
  const totals = exercises.reduce(
    (acc, exercise) => {
      exercise.sets.forEach((set) => {
        if (set.type === "warmup") {
          acc.warmups += 1;
        } else {
          acc.normals += 1;
          acc.totalKg += set.weight_kg * set.reps;
        }
      });
      return acc;
    },
    {
      warmups: 0,
      normals: 0,
      totalKg: 0,
    },
  );

  return (
    <section className="px-5 mx-auto max-w-7xl gap-10 my-10">
      <h1>{title}</h1>
      <div className="text-sm">
        <p>Start: {workoutTime(start_time)}</p>
        <p>Koniec: {workoutTime(end_time)}</p>
        <p>Spędzony czas: {diffTime(start_time, end_time)}</p>
        <p>Serie rozgrzewkowe: {totals.warmups}</p>
        <p>Serie robocze: {totals.normals}</p>
        <p>KG: {totals.totalKg}kg</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {exercises.map((exercise) => {
          return <ExerciseChart key={exercise.index} exercise={exercise} />;
        })}
      </div>
    </section>
  );
};

export default WorkoutPage;
