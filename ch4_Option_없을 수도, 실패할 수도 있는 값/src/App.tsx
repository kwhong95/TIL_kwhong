import React from "react";
import { cart, Item } from "./cart";
import { totalCalulator } from "./utils";
import "./styles.css";
import * as O from "./option";

const Cart = () => {
  return (
    <ul>
      {cart.map((item: Item, idx: number) => {
        const optionDiscountPrice = O.fromUndefined(item.discountPrice);
        const discountPrice = O.getOrElse(optionDiscountPrice, 0);

        const saleText = O.mapOrElse(
          optionDiscountPrice,
          (discountPrice) => `${discountPrice}원 할인`,
          ""
        );

        if (item.outOfStock) {
          return (
            <li key={idx} style={{ color: "gray" }}>
              <h2>{item.name} (품절)</h2>
              <div className="strike">가격: {item.price}원</div>
              <div className="strike">수량: {item.quantity}</div>
            </li>
          );
        } else {
          return (
            <li key={idx}>
              <h2>{item.name}</h2>
              <div>
                가격: {item.price - discountPrice}원 {saleText}
              </div>
              <div>수량: {item.quantity}</div>
            </li>
          );
        }
      })}
    </ul>
  );
};

const App = (): JSX.Element => {
  const totalPrice = totalCalulator(cart, (item) => item.quantity * item.price);
  const totalCount = totalCalulator(cart, (item) => item.quantity);

  const totalDiscountPrice = totalCalulator(cart, (item) => {
    const discountPrice = O.getOrElse(O.fromUndefined(item.discountPrice), 0);
    return discountPrice * item.quantity;
  });

  return (
    <>
      <h1>장바구니</h1>
      <Cart />
      <h2>전체 수량: {totalCount}상자</h2>
      <h2>
        전체 가격: {totalPrice - totalDiscountPrice}원 (총 {totalDiscountPrice}
        원 할인)
      </h2>
    </>
  );
};

export default App;
