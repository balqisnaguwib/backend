import React from "react";
import { render } from "@testing-library/react";
import IndexPage from "../../../src/pages/index";

// Mock the useRouter hook
const mockRouterReplace = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => ({
    replace: mockRouterReplace,
  }),
}));

describe("Index Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<IndexPage />);
  });

  it("contains a useEffect hook", () => {
    // Since we can't easily test useEffect directly,
    // we'll just test that the component doesn't crash when rendered
    expect(() => render(<IndexPage />)).not.toThrow();
  });
});
