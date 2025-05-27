import React from "react";
import Document from "../../../src/pages/_document";

// Since we can't easily test Next.js Document components with the regular renderer
// We'll just verify the component can be instantiated without errors
describe("Document Component", () => {
  it("can be instantiated", () => {
    // This test just verifies that the Document component can be instantiated
    expect(() => new Document({})).not.toThrow();
  });
});
