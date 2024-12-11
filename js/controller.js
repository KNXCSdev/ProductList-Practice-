import * as model from "./model.js";
import productsView from "./views/productsView.js";
import shoppingCartView from "./views/shoppingCartView.js";

async function controlProducts() {
  await model.shopData();
  productsView.render(model.state.products);
}

function controlAddToCart(id) {
  model.addToCart(id); //id will be read from handler() in productsView

  //Generate Orders
  shoppingCartView.render(model.state.cart);

  //Generate Order Total,Confirm Order Button
  shoppingCartView.generateOrder(model.state.cart);
}

function init() {
  productsView.addHandlerRender(controlProducts);
  productsView.addHandlerClick(controlAddToCart);
}
init();
