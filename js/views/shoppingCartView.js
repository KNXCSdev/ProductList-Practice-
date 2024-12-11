import View from "./view.js";

class ShoppingCartView extends View {
  _parentElement = document.querySelector(".cart__order");

  _generateMarkup() {
    if (!this._data || this._data.length === 0) {
      return `
        <img src="assets/images/illustration-empty-cart.svg" alt="Empty cart image" />
        <p class="cart__empty">Your added items will appear here</p>
      `;
    }

    const totalCost = this._data.reduce((sum, item) => sum + item.quantity * item.price, 0);

    return `
      ${this._data
        .map(
          (item) => `
        <div class="orders">
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
        </div>
      `
        )
        .join("")}
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
  }
}

export default new ShoppingCartView();
