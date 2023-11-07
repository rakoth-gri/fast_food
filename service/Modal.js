// SERVICE МОДАЛКИ БЛЮДА -----
// *****************************************
export default class Modal {
  constructor(container) {
    this.$container = container;
    this.$price = null;
    this.sizeList = null;
    this.addListenerToContainer();
  }

  // RENDERS --
  render({ title, price, size, pict, newDish, desc }) {
    this.$container.innerHTML = `
        <section class="dish__body">
          <span class="dish__body_exit">&times;</span>
          <img alt="${newDish || ""}" src="${
      newDish ? "img/new.png" : ""
    }" class="dish__body_new"/>
          <div class="dish__body_head">
            <img src="${pict}" alt="dish" class="dish__body_pict" />
            <h3 class="dish__body_title">${title}</h3>
          </div>
          <div class="dish__body_sizes">
            ${
              size
                ? size
                    .map(
                      ({ name }, i) =>
                        `<button class="${
                          i === 0 ? "active" : ""
                        }" id="${i}"> ${name}</button>`
                    )
                    .join("")
                : ""
            }
          </div>
          <h6>Описание:</h6>
          <p class="dish__body_desc">
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
          <span class="dish__body_price"> ${
            !size ? "от " + price + " &#8381;" : `от ${size[0].price}  &#8381;`
          } </span>
        </section>
        `;
    this.$container.classList.toggle("active");
    this.$price = document.querySelector(".dish__body_price");
    this.sizeList = size || null;
  }

  // HANDLERS --
  containerHandler(e) {
    switch (true) {
      case e.target.matches(".dish__body_exit"):
        this.$container.classList.toggle("active");
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
      .querySelectorAll(".dish__body_sizes button")
      .forEach((button) => button.classList.remove("active"));
    target.classList.add("active");
  }

  // LISTENERS --
  addListenerToContainer() {
    this.$container.addEventListener("click", this.containerHandler.bind(this));
  }
}
