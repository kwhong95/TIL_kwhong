import { useState, useEffect } from "react";

import { Cart } from "components";
import { cart, Item } from "data/cart";

const App = () => {
  const [list, setList] = useState<Item[]>([]);

  useEffect(() => {
    setList(cart);
  }, [list]);

  return <Cart list={list} />;
};

export default App;
