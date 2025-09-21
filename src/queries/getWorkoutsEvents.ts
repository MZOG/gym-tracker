type GetWorkoutsProps = {
  page?: number;
  pageSize?: number;
  since: string;
  api?: string;
};

const getWorkoutsEvents = async ({
  page = 1,
  pageSize = 5,
  since,
  api,
}: GetWorkoutsProps) => {
  const URL = `https://api.hevyapp.com/v1/workouts/events?page=${page}&pageSize=${pageSize}&since=${since}`;
  const response = await fetch(URL, {
    method: "GET",
    headers: {
      accept: "application/json",
      "api-key": process.env.HEVY_API_KEY! || api!,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export default getWorkoutsEvents;
