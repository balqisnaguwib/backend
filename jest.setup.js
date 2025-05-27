// Import jest-dom's custom assertions
import "@testing-library/jest-dom";

// Mock Next.js router
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
  }),
}));

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...props }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  },
}));

// Reset all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});
