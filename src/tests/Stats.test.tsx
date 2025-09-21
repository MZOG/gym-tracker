import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Stats from "../components/Stats";

jest.mock("../queries/getWorkoutsCount", () => ({
  __esModule: true,
  default: jest.fn(),
}));

import getWorkoutsCount from "@/queries/getWorkoutsCount";

const mockedWorkoutCount = getWorkoutsCount as jest.MockedFunction<
  typeof getWorkoutsCount
>;

describe("Stats", () => {
  it("renders component header", async () => {
    mockedWorkoutCount.mockResolvedValueOnce({});

    const ui = await Stats();
    render(ui);

    const heading = await screen.findByRole("heading", {
      level: 1,
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Statystyki");
  });
});
