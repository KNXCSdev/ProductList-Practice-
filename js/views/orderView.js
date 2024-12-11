import View from "./view.js";

class orderView extends View {
  _parentElement = document.querySelector(".order__all");
  _cartElement = document.querySelector(".btn--new");
  _backgroundElement = document.querySelector(".background");
  _confirmation = document.querySelector(".confirmation");

  addHandlerShowConfirmation(handler) {
    document.querySelector(".cart").addEventListener("click", (e) => {
      const clicked = e.target.classList.contains("btn__order");
      if (!clicked) return;
      document.querySelector(".background").classList.remove("hidden");
      document.querySelector(".confirmation").classList.remove("hidden");
      handler();
    });
  }

  addHandlerStartNewOrder(handler) {
    this._cartElement.addEventListener("click", (e) => this._resetBackground(e, handler));
    this._backgroundElement.addEventListener("click", (e) => this._resetBackground(e, handler));
  }

  _resetBackground(e, handler) {
    const clicked = e.target.classList.contains("btn--new");
    const clickedBg = e.target.classList.contains("background");
    if (!clicked && !clickedBg) return;

    this._backgroundElement.classList.add("hidden");
    this._confirmation.classList.add("hidden");

    // Call the handler function
    handler();
  }

  _generateMarkup() {
    if (!this._data) return (this._parentElement.innerHTML = "");
    const totalCost = this._data.reduce((sum, item) => sum + item.quantity * item.price, 0);
    document.querySelector(".order__price").textContent = `$${totalCost.toFixed(2)}`;
    return this._data
      .map(
        (data) => `
             <div class="order__item">
             <img src="${data.image.desktop}" alt="${data.name}" />
             <div class="order__info">
               <h4 class="order__heading">${data.name}</h4>
               <div class="order__quantity">
                 <p class="info--quantity">${data.quantity}x</p>
                 <p class="info--price-all">@ $${(data.quantity * data.price).toFixed(2)}</p>
               </div>
             </div>
             <p class="info--price">$${data.price.toFixed(2)}</p>
             </div>
    `
      )
      .join("");
  }
}

export default new orderView();
