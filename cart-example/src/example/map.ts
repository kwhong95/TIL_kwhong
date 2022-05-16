import * as O from "../types/option";

const compose =
  <B, C>(g: (b: B) => C) =>
  <A>(f: (a: A) => B) =>
  (a: A): C =>
    g(f(a));

const getLength = (s: string): number => {
  return s.length;
};

const isEven = (n: number): boolean => {
  return n % 2 === 0;
};

// 불변성, immutability
const x = 3;

// apply :: (A => B) => A => B
const apply =
  <A, B>(f: (a: A) => B) =>
  (a: A): B =>
    f(a);

const x2 = apply(isEven)(x);

// anotherIsEven :: number => boolean
const anotherIsEven = apply(isEven);
const anotherGetLength = apply(getLength);

// f1 :: string => boolean
const f1 = apply(compose(isEven)(getLength));
const f2 = compose(apply(isEven))(apply(getLength));

// optionIsEven :: Option<number> => Option<boolean>
const optionIsEven = O.map(isEven);
// optionGetLength :: Option<string> => Option<number>
const optionGetLength = O.map(getLength);

// of1 :: Option<string> => Option<boolean>
const of1 = O.map(compose(optionIsEven)(optionGetLength));
const of2 = compose(O.map(isEven))(O.map(getLength));

export type Iterator<A> = () => A;
export type Observer<A> = (a: A) => void;
type Function<A, B> = (a: A) => B;

const map =
  <A, B>(f: (a: A) => B) =>
  <R>(input: Function<R, A>): Function<R, B> => {
    return (r) => {
      return f(input(r));
    };
  };

// mapIsEven :: (R => number) => (R => boolean)
const mapIsEven = map(isEven);
const c1 = mapIsEven(getLength);

const contraMap =
  <A, B>(f: (a: A) => B) =>
  <R>(input: Function<B, R>): Function<A, R> => {
    return (a) => {
      return input(f(a));
    };
  };

const contraMapGetLength = contraMap(getLength);

export {
  anotherIsEven,
  anotherGetLength,
  x2,
  f1,
  f2,
  of1,
  of2,
  c1,
  contraMapGetLength,
};
