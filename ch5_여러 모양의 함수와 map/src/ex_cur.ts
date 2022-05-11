// 커링은 함수를 변환한다.
// 인자가 여러 개인 함수: (A, B, C) => D
// 커링을 적용 curry((A, B, C) => D)
// curried function: (A) => (B) => (C) => D

const delivery = (present: string, from: string, to: string) => {
  return `
    보내는 물건: ${present}
    보내는 사람: ${from}
    받는 사람: ${to}
  `;
};

const curry3 = <A, B, C, D>(f: (a: A, b: B, c: C) => D) => (a: A) => (b: B) => (
  c: C
) => f(a, b, c);

const curriedDelivery = curry3(delivery);

export const main = () => {
  console.clear();

  const momsPresent = curriedDelivery("상품권")("엄마");
  console.log(momsPresent("아들"));
};
