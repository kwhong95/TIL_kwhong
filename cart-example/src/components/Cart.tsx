import { SetStateAction, useState } from "react";

import { Item } from "data/cart";
import type { ArrayItem } from "types/cart";
import { useEffect } from "react";

interface IProps {
  readonly list: ArrayItem;
}

export const Cart: React.FC<IProps> = ({ list }) => {
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const calcTotalCount = (list: ArrayItem): SetStateAction<void> => {
    return setTotalCount(totalCalculator(list, (item) => item.quantity));
  };

  const calcTotalPrice = (list: ArrayItem): SetStateAction<void> => {
    return setTotalPrice(
      totalCalculator(list, (item) => item.price * item.quantity)
    );
  };

  useEffect(() => {
    calcTotalCount(list);
    calcTotalPrice(list);
  }, [list]);

  return (
    <div className="container">
      <h1>장바구니</h1>
      <ul>
        {list.map((item: Item) => {
          if (item.outOfStock) {
            return (
              <li className="gray" key={item.code}>
                <h2>{item.name} (품절)</h2>
                <div className="strike">가격 {item.price}원</div>
              </li>
            );
          } else {
            return (
              <li key={item.code}>
                <h2>{item.name}</h2>
                <div>가격: {item.price}원</div>
                <div>수량: {item.quantity}상자</div>
              </li>
            );
          }
        })}
      </ul>
      <h2>전체 수량: {totalCount}상자</h2>
      <h2>전체 가격: {totalPrice}원</h2>
    </div>
  );
};

const totalCalculator = (list: ArrayItem, getValue: (item: Item) => number) => {
  return list
    .filter((item) => item.outOfStock === false)
    .map(getValue)
    .reduce((total, value) => total + value, 0);
};
