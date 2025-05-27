// NOTE: The declaration below was injected by `"framer"`
// see https://www.framer.com/docs/guides/handshake for more information.
declare module "https://framer.com/m/*";

// Declare custom JSX components to fix TypeScript errors
declare namespace JSX {
  interface IntrinsicElements {
    'iOS18Decoration': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      className?: string;
    }
  }
}
