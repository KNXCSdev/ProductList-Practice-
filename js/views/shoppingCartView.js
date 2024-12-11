import View from "./view.js";

class ShoppingCartView extends View {
  _parentElement = document.querySelector(".orders");
  _summaryContainer = document.querySelector(".summary");
  _btnOrder = document.querySelector(".btn__order");

  addHandlerDelete(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const clicked = +e.target.closest(".btn__delete")?.dataset.id;
      if (!clicked) return;
      handler(clicked);
    });
  }

  updateAddToCartButtons(id) {
    // Find the "Add to Cart" button associated with this product ID
    const btnAddToCart = document.querySelector(`.btn__add[data-id="${id}"]`);
    if (btnAddToCart) {
      // Remove the btn__clicked class
      btnAddToCart.classList.remove("btn__clicked");
      // Reset button content
      btnAddToCart.innerHTML = `
        <img src="assets/images/icon-add-to-cart.svg" alt="Add To cart" />
        <span>Add to Cart</span>
      `;
    }
  }

  updateAllButtons() {
    document.querySelectorAll(".btn__add").forEach((btn) => {
      btn.classList.remove("btn__clicked");
      btn.innerHTML = `
      <img src="assets/images/icon-add-to-cart.svg" alt="Add To cart" />
      <span>Add to Cart</span>
    `;
    });
  }

  generateOrder(data) {
    this._data = data;
    console.log(this._data);
    if (!this._data || this._data.length === 0) {
      this._summaryContainer.classList.add("hidden");
    } else this._summaryContainer.classList.remove("hidden");

    const totalCost = this._data.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const markup = `
          <div class="total">
        <p class="total__text">Order Total</p>
        <p class="total__cost">$${totalCost.toFixed(2)}</p>
      </div>
      <div class="delivery">
        <p class="delivery__carbon">
          <img src="assets/images/icon-carbon-neutral.svg" alt="Carbon-neutral Delivery" />
          This is a <b>carbon-neutral</b> delivery
        </p>
        <button class="btn btn__order">Confirm Order</button>
      </div>
    `;
    this._summaryContainer.innerHTML = "";
    this._summaryContainer.insertAdjacentHTML("beforeend", markup);
  }

  _generateMarkup() {
    if (!this._data || this._data.length === 0) {
      document.querySelector(".orders").classList.add("hidden");
      document.querySelector(".cart__none").classList.remove("hidden");
      document.querySelector(".cart--quantity").textContent = 0;
      return `
        <img src="assets/images/illustration-empty-cart.svg" alt="Empty cart image" />
        <p class="cart__empty">Your added items will appear here</p>
      `;
    }

    document.querySelector(".orders").classList.remove("hidden");
    document.querySelector(".cart__none").classList.add("hidden");
    document.querySelector(".cart--quantity").textContent = this._data.length;
    this._parentElement.innerHTML = "";

    return `
      ${this._data
        .map(
          (item) => `
          <div class="info">
            <div class="info__order">
              <h3 class="tertiary-heading">${item.name}</h3>
              <div class="info__prices">
                <p class="info--quantity">${item.quantity}x</p>
                <p class="info--price-all">@ $${item.price.toFixed(2)}</p>
                <p class="info--price">$${(item.quantity * item.price).toFixed(2)}</p>
              </div>
            </div>
            <button class="btn__delete" data-id="${item.id}">
              <img src="assets/images/icon-remove-item.svg" alt="Remove item" />
            </button>
          </div>  
      `
        )
        .join("")}
      
    `;
  }
}

export default new ShoppingCartView();
