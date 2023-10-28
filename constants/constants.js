// DOM
const CATEGORIES_CONTAINER = document.querySelector(".categories");
const DISHES_CONTAINER = document.querySelector(".dishes");
const HEADER_BASKET_AMOUNT = document.querySelector(".header__basketAmount");
const HEADER_SHOPPING_BASKET = document.querySelector(".header__shoppingBasket");

// API
const URL = "./db/dishes.json";

// XXXX.._LISTS
const CATEGORIES_LIST = [
  {
    id: 1,
    pict: "https://vkusnoitochka.ru/resize/290x286/upload/iblock/e98/w7jscubj93p44j698r5mnrfbomyuj2y8/large.png",
    category: "drinks",
    title: "Напитки",
  },
  {
    id: 2,
    pict: "https://vkusnoitochka.ru/resize/194x194/upload/iblock/1d8/r4o3ipwaxj7qko81fa1mcdyj4s7mesiv/large.png",
    category: "potatoesNstartersNsalads",
    title: "Картофель, стартеры и салаты",
  },
  {
    id: 3,
    pict: "https://vkusnoitochka.ru/resize/194x194/upload/iblock/399/rcrahic86gvdateldvpul16wwqid9sho/large.png",
    category: "burgersNrolls",
    title: "Бургеры и роллы",
  },
];

const ACTION_TYPES = {
  addDishToStore: "addDishToStore",
  removeDishFromStore: "removeDishFromStore",
  removeAllDishesFromStore: "removeAllDishesFromStore",
};

export { CATEGORIES_CONTAINER, DISHES_CONTAINER, CATEGORIES_LIST, URL, HEADER_BASKET_AMOUNT, HEADER_SHOPPING_BASKET, ACTION_TYPES };
