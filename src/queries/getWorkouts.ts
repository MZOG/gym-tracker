type GetWorkoutsProps = {
  page?: number;
  pageSize?: number;
};

const getWorkouts = async ({ page = 1, pageSize = 5 }: GetWorkoutsProps) => {
  const URL = `https://api.hevyapp.com/v1/workouts?page=${page}&pageSize=${pageSize}`;
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

export default getWorkouts;
