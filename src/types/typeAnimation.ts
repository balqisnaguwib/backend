export interface TypeAnimationExampleProps {
  sequence: (string | number)[];
  wrapper?: 'span' | 'div' | 'p';
  speed?: number;
  repeat?: number;
  className?: string;
}
