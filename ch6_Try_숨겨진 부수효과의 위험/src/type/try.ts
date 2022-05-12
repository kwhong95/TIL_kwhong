// 실패하거나 성공했을 때 각각 다른 값을 가지는 자료 구조

type Success<R> = {
  readonly _tag: "success";
  readonly result: R;
};

type Failed<E> = {
  readonly _tag: "failed";
  readonly error: E;
};

export type Try<E, R> = Failed<E> | Success<R>;

export const success = <R>(result: R): Try<never, R> => ({
  _tag: "success",
  result
});

export const failed = <E>(error: E): Try<E, never> => ({
  _tag: "failed",
  error
});

/* 
  never vs unknown
  - never   : 사용하지 않는 타입 파라미터가 return 타입에서 사용될 경우
  - unknown :            "         인자의 타입에서 사용될 경우
  => 타입스크립트의 타입 시스템이 서브 타입을 사용하기 때문이며, 인자의 타입과 return
     타입에 따라서 서브 타이핑의 동작이 다르기 때문
*/

export const isSuccess = <R>(ta: Try<unknown, R>): ta is Success<R> =>
  ta._tag === "success";

export const isFailed = <E>(ta: Try<E, unknown>): ta is Failed<E> =>
  ta._tag === "failed";

export const getOrElse = <E, R>(
  ta: Try<E, R>,
  defaultValue: (e: E) => R
): R => {
  // 에러가 있을 경우 에러에 기반하여 기본 값을 결정한다.
  if (isFailed(ta)) return defaultValue(ta.error);
  // 결과가 성공이라면 해당 값을 사용한다.
  return ta.result;
};

export const map = <E, A, B>(ta: Try<E, A>, f: (a: A) => B): Try<E, B> => {
  if (isFailed(ta)) return ta;
  return success(f(ta.result));
};
