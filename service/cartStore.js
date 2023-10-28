import reducer from "./reducer.js";

const cartStore = {
  state: JSON.parse(localStorage.getItem("cart") || "[]"),
  subscribers: [],
  // METHODS ------
  dispatch(action) {
    this.state = reducer(this.state, action);
    this.subscribers.forEach((fn) => fn(this.state));
  },
  
  getState() {
    return this.state;
  },

  observer(cb) {
    this.subscribers.push(cb);
  },
};

export default cartStore;
