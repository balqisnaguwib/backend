import React from "react";
import { render } from "@testing-library/react";
import App from "../../../src/pages/_app";

// Mock the dependencies
jest.mock("react-redux", () => ({
  Provider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="redux-provider">{children}</div>
  ),
}));

jest.mock("next-query-params/pages", () => {
  return jest.fn();
});

jest.mock("use-query-params", () => ({
  QueryParamProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="query-param-provider">{children}</div>
  ),
}));

jest.mock("notistack", () => ({
  SnackbarProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="snackbar-provider">{children}</div>
  ),
}));

jest.mock("@/providers/Loader", () => {
  const Loader = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="loader-provider">{children}</div>
  );
  return Loader;
});

jest.mock("@/layouts/Internal", () => {
  const Layout = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout-component">{children}</div>
  );
  return Layout;
});

jest.mock("../../../src/stores", () => {
  return {};
});

describe("App Component", () => {
  it("renders with all providers", () => {
    const Component = () => (
      <div data-testid="page-component">Page Component</div>
    );
    const pageProps = {};

    const { getByTestId } = render(
      <App Component={Component} pageProps={pageProps} />
    );

    // Check if all providers are rendered
    expect(getByTestId("redux-provider")).toBeInTheDocument();
    expect(getByTestId("query-param-provider")).toBeInTheDocument();
    expect(getByTestId("loader-provider")).toBeInTheDocument();
    expect(getByTestId("snackbar-provider")).toBeInTheDocument();
    expect(getByTestId("layout-component")).toBeInTheDocument();
    expect(getByTestId("page-component")).toBeInTheDocument();
  });
});
