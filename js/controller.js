import * as model from "./model.js";
import productsView from "./views/productsView.js";
import shoppingCartView from "./views/shoppingCartView.js";

async function controlProducts() {
  await model.shopData();
  productsView.render(model.state.products);
}

function controlAddToCart(id) {
  const product = model.state.products.find((prod) => prod.id === id);

  if (!product) return;

  const cartItem = model.state.cart.find((item) => item.id === id);

  if (!cartItem) {
    model.state.cart.push({ ...product, quantity: 1 });
  } else {
    cartItem.quantity++;
  }

  shoppingCartView.render(model.state.cart);
}

function init() {
  productsView.addHandlerRender(controlProducts);
}
init();
