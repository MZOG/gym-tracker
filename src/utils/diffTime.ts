const diffTime = (start_time: string, end_time: string) => {
  const start = new Date(start_time);
  const end = new Date(end_time);

  let diffMs = Math.abs(start.getTime() - end.getTime());
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  diffMs -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(diffMs / (1000 * 60));

  return `${hours}h ${minutes}m`;
};

export default diffTime;
