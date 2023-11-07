import cartStore from "./cartStore.js";
import Modal from "./Modal.js";
import { actionCreators } from "./actionCreators.js";
import { fetchService } from "./fetchService.js";
import { SPINNER, MAIN, MODAL_CONTAINER } from "../constants/constants.js";

// SERVICE БЛЮД -----
// *****************************************
export default class Dishes {
  constructor(URL, container, startCategory) {
    this.$container = container;
    this.$searchBar = document.querySelector(".header__searchBar_input");
    this.$deleteAll = document.querySelector(".header__deleteAll");
    this.dishesList = null;
    this.modal = new Modal(MODAL_CONTAINER);
    // methods
    this.getAPIdata(URL, startCategory);
    this.addListenerToContainer();
    this.addListenerToSearchBar();
    this.addListenerToDeleteAll();
  }

  async getAPIdata(url, category) {
    let data = await fetchService(url);
    if (data instanceof Object) {
      //  Object => []
      this.dishesList = Object.values(data).flat();
      this.render(category, null);
      SPINNER.classList.toggle("inner");
      return;
    }
    alert(`Error: ${data}`);
  }

  // RENDERS--
  render(category, search) {
    const cartState = cartStore.getState();

    MAIN.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    let data =
      search === null
        ? this.dishesList.filter((dish) =>
            category === "popular" ? dish.popular : dish.category === category
          )
        : this.dishesList.filter(({ title, desc }) =>
            title.concat(desc).trim().toLowerCase().includes(search)
          );

    this.$container.innerHTML = `
        ${data
          .map(({ title, pict, size, price, id, popular }, i) => {
            return `
              <article class="dishes__card">
                ${
                  popular
                    ? `<img alt="hit.png" src="./img/hit.png" class="dishes__card_hit"/>`
                    : ``
                }
                <img src="${pict}" alt="${title}" class="dishes__card_pict" loading="lazy"/>
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

    const { id, title, price, size, newDish, desc, pict } =
      this.dishesList.find((dish) => dish.id === e.target.id);

    // Контроллер обработки кнопок-иконок в карточках товаров (dishes__card):
    switch (true) {
      case e.target.matches(".dishes__card_btn"):
        this.modal.render({ id, title, price, size, newDish, desc, pict });
        break;
      case e.target.matches(".dishes__card_remove"):
        [...document.querySelectorAll(".dishes__card_amount")].find(
          (item) => item.id === id
        ).textContent = 0;
        cartStore.dispatch(actionCreators.removeDishFromStoreAction(id));
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
    this.render(null, e.target.value.trim().toLowerCase());
  };

  deleteAllHandler = (e) => {
    cartStore.dispatch(actionCreators.removeAllDishesFromStore());
    document
      .querySelectorAll(".dishes__card_amount")
      .forEach((dishAmount) => (dishAmount.textContent = 0));
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
