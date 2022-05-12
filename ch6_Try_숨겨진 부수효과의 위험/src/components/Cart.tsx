import * as T from "../type/try";
import { StockItem } from "../components";
import { parseItem, ParseError } from "../utils";

import type { Item } from "../cart";

interface IProps {
  items: Array<Item> | [];
}

const ErrorItem = (e: ParseError): JSX.Element => (
  <li style={{ color: "red" }}>
    <h2>{e.name}</h2>
    <div>Error: {e.message}</div>
  </li>
);

export const Cart: React.FC<IProps> = ({ items }) => {
  return (
    <ul>
      {items.map((item: Item, idx) => {
        const parsedItem = parseItem(item);
        const render = T.map(parsedItem, (item) => {
          return <StockItem key={idx} item={item} />;
        });
        return T.getOrElse(render, ErrorItem);
      })}
    </ul>
  );
};
