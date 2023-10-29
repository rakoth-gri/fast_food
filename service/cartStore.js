import reducer from "./reducer.js";

const cartStore = {
  // state: JSON.parse(localStorage.getItem("cart") || "[]"),
  state: reducer({type: "INIT MANAGER"}),
  subscribers: [],
  // METHODS ------
  dispatch(action) {
    this.state = reducer(action, this.state);
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
