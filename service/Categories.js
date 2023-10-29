import Dishes from "./dishes.js";
// SERVICE КАТЕГОРИЙ -----
// ******************************************************

export class Categories {
  constructor({ categories, data, url, dishes }) {
    this.$categories = categories;
    this.$categoriesCardsImages = null;
    this.category = "drinks";
    // Вызываем конструктор с асинхронными методами
    this.dishes = new Dishes(url, dishes, this.category);
    // methods
    this.renderCategories(this.$categories, data);
    this.addListenerToSidebar();
  }

  // RENDERS --
  renderCategories(container, data) {
    container.insertAdjacentHTML(
      "beforeend",
      data
        .map(
          ({ id, pict, category, title }, i) => `
            <div class="categories__card" data-i="${i}">
                <img class="${`categories__card_pict ${
                  category === this.category && "active"
                }`}" alt="${category}" src="${pict}" data-category="${category}" data-i="${i}"/>
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
    console.log(category, i);
    this.setActiveCategoriesCardsImage(i);
    this.dishes.renderDishes(category, null);
  };

  // LISTENERS --
  addListenerToSidebar() {
    this.$categories.addEventListener("click", this.sidebarHandler);
  }

  setActiveCategoriesCardsImage(i) {
    this.$categoriesCardsImages.forEach((image) =>
      image.classList.remove("active")
    );
    this.$categoriesCardsImages[i].classList.add("active");
  }
}
