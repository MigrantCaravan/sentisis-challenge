import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

// Mock fetch globally
global.fetch = jest.fn();

describe("App list", () => {
  const mockTickets = [
    {
      id: "1",
      title: "Test Event",
      type: "show",
      releaseDate: 1555970400000,
      description: "Test Description",
      price: 15,
      currency: "euro",
    },
  ];

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset fetch mock
    (global.fetch as jest.Mock).mockReset();
  });

  it("shows loading state initially", () => {
    (global.fetch as jest.Mock).mockImplementationOnce(
      () => new Promise(() => {})
    );

    render(<App />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays tickets after loading", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockTickets),
      })
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Test Event")).toBeInTheDocument();
    });
  });
});
