// SERVICE МОДАЛКИ БЛЮДА -----
// *****************************************
export default class Dishes_modal {
  constructor() {
    this.$modalWindow = document.querySelector(".dishes__modal");
    this.$price = null;
    this.sizeList = null;
    this.addListenerToModalWindow();
  }

  // RENDERS --
  renderDishesModal({ title, price, size, pict, newDish, desc }) {
    this.$modalWindow.innerHTML = `
        <section class="dishes__body">
          <span class="dishes__body_exit">&times;</span>
          <img alt="${newDish || ""}" src="${
      newDish ? "img/new.png" : ""
    }" class="dishes__body_new"/>
          <div class="dishes__body_head">
            <img src="${pict}" alt="dish" class="dishes__body_pict" />
            <h3 class="dishes__body_title">${title}</h3>
          </div>
          <div class="dishes__body_sizes">
            ${
              size
                ? size
                    .map(({ name }) => name)
                    .map(
                      (name, i) =>
                        `<button class="${
                          i === 0 ? "active" : ""
                        }" id="${i}"> ${name}</button>`
                    )
                    .join("")
                : ""
            }
          </div>
          <h6>Описание:</h6>
          <p class="dishes__body_desc">
              ${desc}
          </p>
          <br>
          <h6>
            Цены и ассортименты продуктов на сайте указаны для выбранного вами
            региона и могут отличаться в конкретном предприятии. Наличие продуктов
            и цену уточняйте в выбранном предприятии.
          </h6>
          <br>
          <h6> Cумма </h6>
          <span class="dishes__body_price"> ${
            !size ? "от " + price + " &#8381;" : `от ${size[0].price}  &#8381;`
          } </span>
        </section>
        `;
    this.$modalWindow.classList.toggle("active");
    this.$price = document.querySelector(".dishes__body_price");
    this.sizeList = size || null;
  }

  // HANDLERS --
  modalWindowHandler(e) {
    switch (true) {
      case e.target.matches(".dishes__body_exit"):
        this.$modalWindow.classList.toggle("active");
        break;
      case !!e.target.closest("button"):
        this.$price.innerHTML = `от ${
          this.sizeList[+e.target.id].price
        } &#8381;`;
        this.setActivePriceButton(e.target);
        break;
      default:
        return;
    }
  }

  setActivePriceButton(target) {
    document
      .querySelectorAll(".dishes__body_sizes button")
      .forEach((button) => button.classList.remove("active"));
    target.classList.add("active");
  }

  // LISTENERS --
  addListenerToModalWindow() {
    this.$modalWindow.addEventListener(
      "click",
      this.modalWindowHandler.bind(this)
    );
  }
}
