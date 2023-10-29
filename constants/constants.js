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
  {
    id: 4,
    pict: "https://vkusnoitochka.ru/resize/290x286/upload/iblock/a80/62fil0t32gickk0iuzkz7abq0e3dtgj9/large.png",
    category: "comboLunch",
    title: "Комбо Обед",
  },
  {
    id: 5,
    pict: "https://vkusnoitochka.ru/resize/290x286/upload/iblock/a9c/o9wvsgd785mlozd8sekimfcxzxtlmbsg/large.png",
    category: "popular",
    title: "Популярное",
  },
  {
    id: 6,
    pict: "https://vkusnoitochka.ru/resize/290x286/upload/iblock/767/p3cdgcpo7vf9d0g44umohuufvpocwm1q/large.png",
    category: "breakfast",
    title: "Завтрак",
  },
  {
    id: 7,
    pict: "https://vkusnoitochka.ru/resize/290x286/upload/iblock/25f/ozm5cwa1c4rz4eg2lv8towuw9x1ghwvh/large.png",
    category: "desserts",
    title: "Десерты",
  },
  {
    id: 8,
    pict: "https://vkusnoitochka.ru/resize/290x286/upload/iblock/487/q1lnmk8vud4h4mia9j77ltl6ylk4vg5b/large.png",
    category: "saucesNother",
    title: "Cоусы",
  }     
];

const ACTION_TYPES = {
  addDishToStore: "addDishToStore",
  removeDishFromStore: "removeDishFromStore",
  removeAllDishesFromStore: "removeAllDishesFromStore",
};

export { CATEGORIES_CONTAINER, DISHES_CONTAINER, CATEGORIES_LIST, URL, HEADER_BASKET_AMOUNT, HEADER_SHOPPING_BASKET, ACTION_TYPES };
