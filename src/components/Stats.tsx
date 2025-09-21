import getWorkoutsCount from "@/queries/getWorkoutsCount";
import getWorkoutsEvents from "@/queries/getWorkoutsEvents";
import WorkoutsEvents from "./WorkoutsEvents";

const Stats = async () => {
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const totalWorkouts = await getWorkoutsCount();
  const workoutsEvents = await getWorkoutsEvents({
    page: 1,
    pageSize: 5,
    since: since,
  });

  if (!totalWorkouts) {
    return <p>Błąd pobierania</p>;
  }

  console.log(workoutsEvents);

  const { workout_count } = totalWorkouts;

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-1">
      <h1 className="font-medium">Statystyki</h1>

      <div>
        <p>Wszystkie treningi: {workout_count}</p>
        <WorkoutsEvents initialWorkouts={workoutsEvents} />
      </div>
    </div>
  );
};

export default Stats;
