import { useEffect, useState } from "react";
import "./styles.css";

import { cart, Item } from "./cart";
import { Cart } from "./components";
import { totalCalulator } from "./utils";

export type ArrayItem = Array<Item>;

const App = (): JSX.Element => {
  const [items, setItems] = useState<Array<Item> | []>([]);
  const totalPrice = totalCalulator(cart, (item) => item.quantity * item.price);
  const totalCount = totalCalulator(cart, (item) => item.quantity);

  useEffect(() => {
    setItems(cart);
  }, [items]);

  return (
    <>
      <h1>장바구니</h1>
      <Cart items={items} />
      <h2>전체 수량: {totalCount}상자</h2>
      <h2>전체 가격: {totalPrice}원</h2>
    </>
  );
};

export default App;
