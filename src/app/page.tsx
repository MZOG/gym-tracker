import LatestWorkouts from "@/components/LatestWorkouts";
import Stats from "@/components/Stats";

export default async function Home() {
  return (
    <section className="px-5 mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 my-10">
      <LatestWorkouts />
      <Stats />
    </section>
  );
}
