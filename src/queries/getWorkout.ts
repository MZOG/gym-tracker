type GetWorkoutsProps = {
  workoutId: string;
};

const getWorkout = async ({ workoutId }: GetWorkoutsProps) => {
  const URL = `https://api.hevyapp.com/v1/workouts/${workoutId}`;
  const response = await fetch(URL, {
    method: "GET",
    headers: {
      accept: "application/json",
      "api-key": process.env.HEVY_API_KEY!,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export default getWorkout;
