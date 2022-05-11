import type { Item } from "./cart";

export const totalCalulator = (
  list: Array<Item>,
  getValue: (item: Item) => number
) => {
  return list
    .filter((item) => item.outOfStock === false)
    .map(getValue)
    .reduce((total, item) => total + item);
};
