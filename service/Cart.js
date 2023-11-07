import { formatter } from "./formatter.js";
import cartStore from "./cartStore.js";
import { actionCreators } from "./actionCreators.js";

export default class Cart {
  constructor(container) {
    this.$container = container;
    this.H1 = document.querySelector(".Cart__h1");
    // METHODS --
    this.render(cartStore.getState(), this.$container);
    this.addListenerToContainer();
  }

  render(data, container) {
    if (!data.length) {
      this.H1.textContent = "В корзине товаров нет!";
      container.innerHTML = "";
      return;
    }

    const totalSum = data.reduce(
      (acc, { price, amount }) => acc + price * amount,
      0
    );

    container.innerHTML = `
    <table class="table">
    <thead>
      <tr class="table__tr">
        <th class="table__td_title">Наименование</th>
        <th class="table__td_price">Цена</th>
        <th class="table__td_amount">Кол-во</th>
        <th class="table__td_summa">Сумма</th>
        <th class="table__td_summa">Сумма</th>
      </tr>
    </thead>
    <tbody>
        ${data
          .map(
            ({ title, price, amount, id }, i) => `
            <tr class="table__tr">
                <td class="table__td_title">${title}</td>
                <td class="table__td_price">${price}</td>
                <td class="table__td_amount">${amount}</td>
                <td class="table__td_summa">${formatter(price * amount)}</td>
                <th class="table__td_button">
                    <button id='${id}'> Delete </button>  
                </th>
            </tr>
            `
          )
          .join("")}
        <tr class="table__tr">
            <th class="table__td_title" colspan="3" style="text-align: right;"> Итого: </th>            
            <th class="table__td_summa"> ${formatter(totalSum)}</th>
        </tr>     
    </tbody>
  </table>
    `;
  }

  containerHandler(e) {
    if (!e.target.matches(".table__td_button button")) return;
    cartStore.dispatch(actionCreators.removeDishFromStoreAction(e.target.id));
    this.render(cartStore.getState(), this.$container);
  }

  addListenerToContainer() {
    this.$container.addEventListener("click", this.containerHandler.bind(this));
  }
}
