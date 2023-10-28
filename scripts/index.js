import {
  CATEGORIES_LIST,
  CATEGORIES_CONTAINER,
  DISHES_CONTAINER,
  URL,
  HEADER_BASKET_AMOUNT,
  HEADER_SHOPPING_BASKET
} from "../constants/constants.js";
import { Categories } from "../service/Categories.js";
import cartStore from "../service/cartStore.js";

const callback = function (state) {
  localStorage.setItem("cart", JSON.stringify(state));

  HEADER_SHOPPING_BASKET.className = `material-symbols-outlined header__shoppingBasket ${
    state.length ? "active" : ""
  }`;

  HEADER_BASKET_AMOUNT.textContent = state.reduce(
    (acc, item) => acc + item.amount,
    0
  );
};
callback(cartStore.state);

// отправляем подписчика --
cartStore.observer(callback);

// Стартуем отрисовку ----
new Categories({
  categories: CATEGORIES_CONTAINER,
  data: CATEGORIES_LIST,
  dishes: DISHES_CONTAINER,
  url: URL,
});
