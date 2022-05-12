import type { Item } from "./cart";
import * as T from "./type/try";

export type ParseError = {
  name: string;
  message: string;
};

export type ParsedItem = { _tag: "parsedItem" } & Item;

export const parseItem = (item: Item): T.Try<ParseError, ParsedItem> => {
  if (item.quantity < 1) {
    return T.failed({
      name: item.name,
      message: "상품은 반드시 한 개 이상 담아야 합니다."
    });
  } else if (item.quantity > 10) {
    return T.failed({
      name: item.name,
      message: "한 번에 10개를 초과하여 구매할 수 없습니다."
    });
  }
  return T.success({
    _tag: "parsedItem",
    ...item
  });
};

export const totalCalulator = (
  list: Array<Item>,
  getValue: (item: Item) => number
) => {
  return list
    .filter((item) => {
      try {
        parseItem(item);
        return item.outOfStock === false;
      } catch (e) {
        return false;
      }
    })
    .map(getValue)
    .reduce((total, item) => total + item);
};
