import React from "react";
import type { Item } from "../cart";

interface IProps {
  item: Item;
}

export const StockItem: React.FC<IProps> = ({ item }) => {
  if (item.outOfStock) {
    return (
      <li style={{ color: "gray" }}>
        <h2>{item.name} (품절)</h2>
        <div className="strike">가격: {item.price}원</div>
      </li>
    );
  } else {
    return (
      <li>
        <h2>{item.name}</h2>
        <div>가격: {item.price}원</div>
        <div>수량: {item.quantity}상자</div>
      </li>
    );
  }
};
