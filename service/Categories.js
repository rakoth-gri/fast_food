import Dishes from "./Dishes.js";
// SERVICE КАТЕГОРИЙ -----
// ******************************************************

export class Categories {
  constructor({ categoriesContainer, data, url, dishesContainer }) {
    this.$container = categoriesContainer;
    this.$categoriesCardsImages = null;
    this.category = "drinks";
    // Вызываем конструктор с асинхронными методами
    this.dishes = new Dishes(url, dishesContainer, this.category);
    // methods
    this.render(this.$container, data);
    this.addListenerToContainer();
  }

  // RENDERS --
  render(container, data) {
    container.insertAdjacentHTML(
      "beforeend",
      data
        .map(
          ({ id, pict, category, title }, i) => `
            <div class="categories__card" data-i="${i}">
                <img class="${`categories__card_pict ${
                  category === this.category && "active"
                }`}" alt="${category}" src="${pict}" data-category="${category}" data-i="${i}" loading="lazy"/>
                <figcaption class="categories__card_desc" data-i="${i}"> ${title} </figcaption>    
            </div>
        `
        )
        .join("")
    );
    this.$categoriesCardsImages = document.querySelectorAll(
      ".categories__card_pict"
    );
  }

  // HANDLERS --
  sidebarHandler = (e) => {
    const { category, i } = e.target.dataset;
    this.setActiveCategoriesCardsImage(i);
    this.dishes.render(category, null);
  };

  // LISTENERS --
  addListenerToContainer() {
    this.$container.addEventListener("click", this.sidebarHandler);
  }

  setActiveCategoriesCardsImage(i) {
    this.$categoriesCardsImages.forEach((image) =>
      image.classList.remove("active")
    );
    this.$categoriesCardsImages[i].classList.add("active");
  }
}
