import getWorkoutsCount from "@/queries/getWorkoutsCount";

const Stats = async () => {
  const totalWorkouts = await getWorkoutsCount();

  if (!totalWorkouts) {
    return <p>Błąd pobierania</p>;
  }

  const { workout_count } = totalWorkouts;

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-1">
      <h1 className="font-medium">Statystyki</h1>

      <div>
        <p>Wszystkie treningi: {workout_count}</p>
      </div>
    </div>
  );
};

export default Stats;
