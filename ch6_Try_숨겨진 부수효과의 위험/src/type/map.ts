import * as O from "./option";

export const curry2 = <A, B, C>(f: (a: A, b: B) => C) => (a: A) => (b: B): C =>
  f(a, b);

export const flip = <A, B, C>(f: (a: A, b: B) => C) => (b: B, a: A): C =>
  f(a, b);

// Array<A> == A []
// map :: (Array<A>, (A => B)) => Array<B>
export const map = <A, B>(arr: Array<A>, f: (a: A) => B): Array<B> => {
  const result: Array<B> = [];
  for (const value of arr) {
    result.push(f(value));
  }
  return result;
};

export const main = () => {
  console.clear();
  const numbers = [1, 2, 3];
  const isEven = (x: number) => x % 2 === 0;

  console.log(map(numbers, isEven));

  // curriedMap :: Array<A> => ((A => B) => Array<B>)
  const curriedMap = curry2(map);
  console.log(curriedMap(numbers)(isEven));

  // map :: Array<A> ~> (A => B) => Array<B>
  console.log(numbers.map(isEven));

  // _map :: (A => B) => (Array<A> => Array<B>)
  const _map = curry2(flip(map));
  // isEven :: number => boolean
  // mapIsEven :: Array<number> => Array<boolean>
  const mapIsEven = _map(isEven);

  console.log(isEven(42));
  console.log(isEven(7));
  console.log(mapIsEven([2, 7, 13]));

  const oMap = curry2(flip(O.map));
  // optionIsEven :: Option<number> => Option<boolean>
  const optionIsEven = oMap(isEven);

  console.log(optionIsEven(O.some(42)));
  console.log(optionIsEven(O.none()));
};
