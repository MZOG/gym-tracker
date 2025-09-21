export type Workout = {
  id: string;
  title: string;
  routine_id: string;
  description: string;
  start_time: string;
  end_time: string;
  updated_at: string;
  created_at: string;
  exercises: {
    index: number;
    title: string;
    notes: string;
    exercise_template_id: string;
    supersets_id: string;
    sets: {
      index: number;
      type: string;
      weight_kg: number;
      reps: number;
      distance_meters: number;
      duration_seconds: number;
      rpe: number;
      custom_metric: number;
    }[];
  }[];
};
