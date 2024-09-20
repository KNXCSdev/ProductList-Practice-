const buttons = document.querySelectorAll(".btn");

buttons.forEach((button, index) => {
  let quantity = 0;
  button.addEventListener("click", function () {
    if (quantity === 0) {
      const block = button.closest(".deserts-block");
      const img = block.querySelector(".desert-img");

      button.innerHTML = `
        <img src="assets/images/icon-decrement-quantity.svg" alt="decrease" class="dec decrement" />
        <span class="quantity">1</span>
        <img src="assets/images/icon-increment-quantity.svg" alt="increase" class="inc increment" />
      `;
      img.classList.add("borderchange");
      button.classList.add("clicked");

      quantity = 1;
      addToCart(index + 1);

      const incButton = button.querySelector(".inc");
      const decButton = button.querySelector(".dec");
      const quantityDisplay = button.querySelector(".quantity");

      incButton.addEventListener("click", function (event) {
        event.stopPropagation();
        quantity += 1;
        quantityDisplay.textContent = quantity;
        addToCart(index + 1);
      });

      decButton.addEventListener("click", function (event) {
        event.stopPropagation();
        if (quantity > 1) {
          quantity -= 1;
          quantityDisplay.textContent = quantity;
          removeFromCart(index + 1);
        } else {
          resetButton(button, block);
          removeFromCart(index + 1);
          quantity = 0;
        }
      });
    }
  });
});

function resetButton(button, block) {
  button.innerHTML = `
    <img src="assets/images/icon-decrement-quantity.svg" alt="" class="dec" style="display: none;" />
    <img src="assets/images/icon-add-to-cart.svg" class="btn-cart" />
    Add to Cart
    <img src="assets/images/icon-increment-quantity.svg" alt="" class="inc" style="display: none;" />
  `;
  button.classList.remove("clicked");

  const img = block.querySelector(".desert-img");
  img.classList.remove("borderchange");
}

const products = [
  { id: 1, name: "Waffle with Berries", price: 6.5 },
  { id: 2, name: "Vanilla Bean Crème Brûlée", price: 7.0 },
  { id: 3, name: "Macaron Mix of Five", price: 8.0 },
  { id: 4, name: "Classic Tiramisu", price: 5.5 },
  { id: 5, name: "Pistachio Baklava", price: 4.0 },
  { id: 6, name: "Lemon Meringue Pie", price: 5.0 },
  { id: 7, name: "Red Velvet Cake", price: 4.5 },
  { id: 8, name: "Salted Carmel Brownie", price: 4.5 },
  { id: 9, name: "Vanilla Panna Cotta", price: 6.5 },
];

let cart = [];

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);

  const existingProduct = cart.find((item) => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}

function removeFromCart(productId) {
  const existingProduct = cart.find((item) => item.id === productId);

  if (existingProduct.quantity > 1) {
    existingProduct.quantity -= 1;
  } else {
    cart = cart.filter((item) => item.id !== productId);
  }

  updateCart();
}

function updateCart() {
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartCount = document.querySelector(".cart-count");
  const totalAmount = document.querySelector(".total-amount");

  cartItemsContainer.innerHTML = "";

  let total = 0;
  let itemCount = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    itemCount += item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <p class="name">${item.name}</p>
      
      <div class="item-quantity">
      <p class="quant">${item.quantity}x</p>

          <p class="proce">@$${item.price.toFixed(2)}</p>
          <p class="fix">$${itemTotal.toFixed(2)}</p>
          <button onclick="removeFromCart(${item.id})" class="removee">Remove</button>

      </div>
      
      
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  cartCount.textContent = itemCount;
  totalAmount.textContent = `$${total.toFixed(2)}`;
}

const confirmOrderButton = document.querySelector(".confirm-order");
const orderConfirmationContainer = document.querySelector(".order-confirmation-container");

confirmOrderButton.addEventListener("click", function () {
  const orderConfirmationBlock = document.createElement("div");
  orderConfirmationBlock.classList.add("order-confirmation");
  orderConfirmationBlock.textContent = "Zamówiono";

  orderConfirmationContainer.appendChild(orderConfirmationBlock);

  cart = [];
  updateCart();
});
