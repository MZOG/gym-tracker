import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LatestWorkouts from "../components/LatestWorkouts";

// mock getWorkouts
jest.mock("../queries/getWorkouts", () => ({
  __esModule: true,
  default: jest.fn(),
}));

import getWorkouts from "../queries/getWorkouts";

const mockedGetWorkouts = getWorkouts as jest.MockedFunction<
  typeof getWorkouts
>;

const mockWorkouts = {
  workouts: [
    {
      id: 1,
      title: "Przykładowy trening",
      start_time: "2025-09-20T10:00:00Z",
      end_time: "2025-09-20T11:00:00Z",
    },
    {
      id: 2,
      title: "Cardio trening",
      start_time: "2025-09-21T12:00:00Z",
      end_time: "2025-09-21T13:00:00Z",
    },
  ],
};

describe("LatestWorkouts", () => {
  it("renders component header", async () => {
    mockedGetWorkouts.mockResolvedValueOnce(mockWorkouts);

    const ui = await LatestWorkouts();
    render(ui);

    const heading = await screen.findByRole("heading", {
      level: 1,
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Ostatnie treningi");
  });

  it("renders workout titles", async () => {
    mockedGetWorkouts.mockResolvedValueOnce(mockWorkouts);

    const ui = await LatestWorkouts();
    render(ui);

    const workoutTitles = await screen.findAllByRole("heading", { level: 2 });
    expect(workoutTitles.length).toBeGreaterThan(0);

    workoutTitles.forEach((title) => {
      expect(title.textContent).not.toBeNull();
      expect(title.textContent).not.toBe("");
    });
  });
});
