import cartStore from "./cartStore.js";
import Dishes_modal from "./DishesModal.js";
import { actionCreators } from "./actionCreators.js";

// SERVICE БЛЮД -----
// *****************************************
export default class Dishes {
  constructor(URL, container, startCategory) {
    this.$container = container;
    this.$searchBar = document.querySelector(".header__searchBar_input");
    this.$deleteAll = document.querySelector(".header__deleteAll");
    this.dishesList = null;
    this.modalDishInfo = {};
    this.dishes_modal = new Dishes_modal();
    // methods
    this.fetchDishes(URL, startCategory);
    this.addListenerToContainer();
    this.addListenerToSearchBar();
    this.addListenerToDeleteAll();
  }

  async fetchDishes(URL, category) {
    let res = await fetch(URL);
    let data = await res.json();
    //  Object => []
    this.dishesList = Object.values(data).flat();        
    this.renderDishes(category, null);
  }

  // RENDERS--
  renderDishes(category, searchValue) {
    const cartState = cartStore.getState();

    let data =
      searchValue === null
        // ? this.dishesList.filter((dish) => dish.category === category)
        ? this.dishesList.filter((dish) => category === 'popular' ? dish.popular : dish.category === category)
        : this.dishesList.filter(({ title, desc }) =>
            title.concat(desc).trim().toLowerCase().includes(searchValue)
          );

    this.$container.innerHTML = `
        ${data
          .map(({ title, pict, size, price, id }, i) => {
            return `
              <article class="dishes__card">
                <img src="${pict}" alt="${title}" class="dishes__card_pict"/>
                <p class="dishes__card_title"> ${title} </p>
                <div class="dishes__card_info">
                  <span class="dishes__card_size"> ${
                    !size ? "" : size[0].name
                  }</span>
                  <span class="dishes__card_price"> ${
                    !size
                      ? "от " + price + " &#8381;"
                      : `от ${size[0].price}  &#8381;`
                  }</span>                
                </div>
                <div>
                  <button id='${id}' class="dishes__card_btn"> подробнее </button>
                </div>
                <span class="material-symbols-outlined dishes__card_remove" id='${id}'>
                  delete_forever
                </span>
                <span class="dishes__card_amount" id='${id}'> ${
              cartState.find((item) => item.id === id)?.amount || 0
            } </span>                        
                <span class="material-symbols-outlined dishes__card_cart" id='${id}'>shopping_cart</span>              
              </article>
          `;
          })
          .join("")}
      `;
  }

  // HANDLERS --
  containerHandler = (e) => {
    if (
      ![".dishes__card_btn", ".dishes__card_cart", ".dishes__card_remove"].find(
        (item) => e.target.closest(item)
      )
    )
      return;

    const cartState = cartStore.getState();

    this.modalDishInfo = this.dishesList.find(
      (dish) => dish.id === e.target.id
    );

    const { id, title, price, size } = this.modalDishInfo;

    // Контроллер обработки кнопок-иконок в карточках товаров (dishes__card):
    switch (true) {
      case e.target.matches(".dishes__card_btn"):
        this.dishes_modal.renderDishesModal(this.modalDishInfo);
        break;
      case e.target.matches(".dishes__card_remove"):
        [...document.querySelectorAll(".dishes__card_amount")].find(
          (item) => item.id === id
        ).textContent = 0;
        cartStore.dispatch(actionCreators.removeDishFromStoreAction(id))       
        break;
      default:
        [...document.querySelectorAll(".dishes__card_amount")].find(
          (item) => item.id === id
        ).textContent =
          (cartState.find((item) => item.id === id)?.amount || 0) + 1;        
        cartStore.dispatch(
          actionCreators.addDishToStoreAction({
            id,
            title,
            price: !size ? price : size[0].price,
          })
        );
        break;
    }
  };

  searchBarHandler = (e) => {
    this.renderDishes(null, e.target.value.trim().toLowerCase());
  };

  deleteAllHandler = (e) => {
    cartStore.dispatch(actionCreators.removeAllDishesFromStore())
    document.querySelectorAll(".dishes__card_amount").forEach(dishAmount => dishAmount.textContent = 0)
  };

  // LISTENERS --
  addListenerToContainer() {
    this.$container.addEventListener("click", this.containerHandler);
  }

  addListenerToSearchBar() {
    this.$searchBar.addEventListener("input", this.searchBarHandler);
  }

  addListenerToDeleteAll() {
    this.$deleteAll.addEventListener("click", this.deleteAllHandler);
  }
}
