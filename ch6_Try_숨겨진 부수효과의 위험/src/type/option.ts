// 값이 있을수도, 없을수도 있는 자료구조

export type Some<A> = {
  readonly _tag: "Some";
  readonly value: A;
};

export type None = {
  readonly _tag: "None";
};

export type Option<A> = Some<A> | None;

export const some = <A>(value: A): Option<A> => ({ _tag: "Some", value });

export const none = (): Option<never> => ({ _tag: "None" });

export const isSome = <A>(oa: Option<A>): oa is Some<A> => oa._tag === "Some";

export const isNone = <A>(oa: Option<A>): oa is None => oa._tag === "None";

export const fromUndefined = <A>(a: A | undefined): Option<A> => {
  if (a === undefined) return none();
  return some(a);
};

export const getOrElse = <A>(oa: Option<A>, defaultValue: A): A => {
  // 값이 없으면 지정된 값을 사용한다.
  if (isNone(oa)) return defaultValue;
  // 값이 있으면 해당 값을 사용한다.
  return oa.value;
};

export const map = <A, B>(oa: Option<A>, f: (a: A) => B): Option<B> => {
  // 값이 없으면 값이 없는 상태를 유지한다.
  if (isNone(oa)) return oa;
  // 값이 있으면 값을 함수에 적용한다.
  return some(f(oa.value));
};

// Functor의 map
// > 구조를 보존
// f에 의해 내부의 값은 변경되어도 구조는 변경되지 않는다.

export const mapOrElse = <A, B>(
  oa: Option<A>,
  f: (a: A) => B,
  defaultValue: B
): B => {
  return getOrElse(map(oa, f), defaultValue);
};
