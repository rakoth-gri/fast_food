import { ACTION_TYPES } from "../constants/constants.js";

export const actionCreators = {
  addDishToStoreAction: (payload) => ({
    type: ACTION_TYPES.addDishToStore,
    payload,
  }),
  removeDishFromStoreAction: (payload) => ({
    type: ACTION_TYPES.removeDishFromStore,
    payload,
  }),
  removeAllDishesFromStore: () => ({
    type: ACTION_TYPES.removeAllDishesFromStore,
  }),
};
