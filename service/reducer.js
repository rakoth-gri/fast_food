import { ACTION_TYPES } from "../constants/constants.js";

const initState = JSON.parse(localStorage.getItem("cart") || "[]");

// Нет мутаций стэйта
export default function reducer({ type, payload }, state = initState) {
  switch (type) {
    case ACTION_TYPES.addDishToStore:
      if (state.find((item) => item.id === payload.id)) {
        return state.map((item) => ({
          ...item,
          amount: item.id === payload.id ? item.amount + 1 : item.amount,
        }));
      } else return [...state, { ...payload, amount: 1 }];
    case ACTION_TYPES.removeDishFromStore:
      return state.filter((item) => item.id !== payload);
    case ACTION_TYPES.removeAllDishesFromStore:
      return state.filter((item) => !item.id);
    default:
      return state;
  }
}
