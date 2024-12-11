import View from "./view.js";

class ProductView extends View {
  _parentElement = document.querySelector(".desserts");

  addHandlerRender(handler) {
    ["load"].forEach((ev) => window.addEventListener(ev, handler));
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      // Check for the Add to Cart button click
      const btn = e.target.closest(".btn__add");
      if (btn && !btn.classList.contains("btn__clicked")) {
        const dataId = +btn.dataset.id;

        handler(dataId);

        // Replace button content for quantity controls
        btn.innerHTML = `
          <img src="assets/images/icon-decrement-quantity.svg" alt="Decrement quantity" class='btn--decrement' data-click='0'/>
          <span class="btn--quantity">1</span>
          <img src="assets/images/icon-increment-quantity.svg" alt="Increment quantity" class='btn--increment' data-click='0'/> 
        `;
        btn.classList.add("btn__clicked");
      }
    });
  }

  addHandlerQuantity(handler) {
    // Handle Increment and Decrement
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn__add");
      if (!btn) return; // Return if it's not the correct button

      // Handle Increment
      if (e.target.classList.contains("btn--increment")) {
        const dataId = +e.target.closest(".btn__add").dataset.id;
        let quantity = +btn.querySelector(".btn--quantity").textContent;

        quantity++;
        btn.querySelector(".btn--quantity").textContent = quantity; // Update the displayed quantity

        // Call handler to update the model
        handler(dataId, "increment");
      }

      // Handle Decrement
      if (e.target.classList.contains("btn--decrement")) {
        const dataId = +e.target.closest(".btn__add").dataset.id;
        let quantity = +btn.querySelector(".btn--quantity").textContent;
        console.log(quantity);
        if (quantity <= 1) {
          btn.innerHTML = `
          <img src="assets/images/icon-add-to-cart.svg" alt="Add To cart" />
          <span>Add to Cart</span>
          `;
          btn.classList.remove("btn__clicked");
          handler(dataId, "decrement");
        } else {
          quantity--;
          btn.querySelector(".btn--quantity").textContent = quantity;
          handler(dataId, "decrement");
        }
      }
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
        <div class="btn btn__add" data-id="${data.id}">
          <img src="assets/images/icon-add-to-cart.svg" alt="Add To cart" />
          <span>Add to Cart</span>
        </div>
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

export default new ProductView();
