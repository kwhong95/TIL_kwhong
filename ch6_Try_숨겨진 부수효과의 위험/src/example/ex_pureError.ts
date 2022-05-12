console.clear();

const tenDivideBy = (n: number): number => {
  // if (n === 0) {
  //   throw new Error("0으로 나눌 수 없습니다.");
  // }
  return 10 / n;
};

const test = () => {
  const y = tenDivideBy(0);
  try {
    /* try 구문 내부와 밖에서의 동작이 다르므로 참조에 투명하지 않다. */
    //const y = tenDivideBy(0); // Not Error
    return y;
  } catch (e) {
    return 1;
  }
};

export const main = () => {
  const x = test();
  console.log(x);
  console.log("프로그램이 종료 되었습니다.");
};
