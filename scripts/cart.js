import cartStore from "../service/cartStore.js";
import Cart from "../service/Cart.js";

const callback = function (state) {
  localStorage.setItem("cart", JSON.stringify(state));
};
callback(cartStore.state);

// отправляем подписчика --
cartStore.observer(callback);

// Стартуем отрисовку корзины ----
new Cart(document.querySelector(".Cart__tableWrapper"));
