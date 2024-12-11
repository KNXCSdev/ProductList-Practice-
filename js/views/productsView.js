import View from "./view.js";

class productView extends View {
  _parentElement = document.querySelector(".desserts");

  addHandlerRender(handler) {
    ["load"].forEach((ev) => window.addEventListener(ev, handler));
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn__add");
      if (!btn) return;
      const dataId = +btn.dataset.id;
      handler(dataId);
    });
  }

  _generateMarkup() {
    console.log(this._data);
    return this._data
      .map(
        (data) => `
    <div class="dessert" data-id='${data.id}'>
      <div class="dessert__img">
        <img
          loading="lazy"
          src="${data.image.desktop}"
          class="dessert__image"
          alt="${data.name}"
        />
        <button class="btn btn__add" data-id="${data.id}">
          <img src="assets/images/icon-add-to-cart.svg" alt="Add To cart" />
          <span>Add to Cart</span>
        </button>
      </div>
      <div class="dessert__description">
        <p class="dessert__name">${data.category}</p>
        <h2 class="dessert__title">${data.name}</h2>
        <p class="dessert__dollar">$<span class="dessert--price">${data.price.toFixed(2)}</span></p>
      </div>
    </div>
    `
      )
      .join("");
  }
}

export default new productView();
