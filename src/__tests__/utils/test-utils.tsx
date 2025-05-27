import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";

// Add custom render function here if we need to wrap components with providers

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };

// Add a dummy test to keep Jest happy
describe("test-utils", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });
});
