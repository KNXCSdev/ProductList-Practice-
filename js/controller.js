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

function controlQuantity(id, action) {
  if (action === "increment") {
    model.incrementQuantity(id);
  } else if (action === "decrement") {
    model.decrementQuantity(id);
  }

  // Update the view
  shoppingCartView.render(model.state.cart);

  shoppingCartView.generateOrder(model.state.cart);
}

function controlDelete(id) {
  model.deleteItem(id);

  // Generate Orders
  shoppingCartView.render(model.state.cart);

  // Generate Order Total, Confirm Order Button
  shoppingCartView.generateOrder(model.state.cart);

  // Update "Add to Cart" button for the deleted item
  shoppingCartView.updateAddToCartButtons(id);
}

function init() {
  productsView.addHandlerRender(controlProducts);
  productsView.addHandlerClick(controlAddToCart);
  productsView.addHandlerQuantity(controlQuantity);

  shoppingCartView.addHandlerDelete(controlDelete);
}
init();
