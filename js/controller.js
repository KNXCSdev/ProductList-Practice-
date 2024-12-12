import * as model from "./model.js";
import OrderView from "./views/orderView.js";
import ProductsView from "./views/productsView.js";
import ShoppingCartView from "./views/shoppingCartView.js";

async function controlProducts() {
  await model.loadProducts();
  ProductsView.render(model.state.products);

  ProductsView.restoreButtonStates(model.state.cart);

  updateCartViews();
}

function controlAddToCart(id) {
  model.addToCart(id); //id will be read from handler() in productsView

  //Generate Orders
  //Generate Order Total,Confirm Order Button
  updateCartViews();
}

function controlQuantity(id, action) {
  if (action === "increment") model.incrementQuantity(id);
  else if (action === "decrement") model.decrementQuantity(id);

  // Update the view
  updateCartViews();
}

function controlDelete(id) {
  model.deleteItem(id);

  // Generate Orders

  // Generate Order Total, Confirm Order Button
  updateCartViews();

  // Update "Add to Cart" button for the deleted item
  ShoppingCartView.updateAddToCartButtons(id);
}

function controlConfirmation() {
  OrderView.render(model.state.cart);
}

function controlShopping() {
  model.deleteCart();

  //RERENDER CART
  //RERENDER BUTTON TO HIDE IT
  updateCartViews();

  ShoppingCartView.updateAllButtons();

  //Render OrderView because if not all deleted items from the cart Array will still be seen
  OrderView.render();
}

function updateCartViews() {
  const cartState = model.state.cart; // Centralized data source
  ShoppingCartView.render(cartState); // Render updated cart
  ShoppingCartView.generateOrder(cartState); // Render totals and buttons
}

function init() {
  ProductsView.addHandlerRender(controlProducts);
  ProductsView.addHandlerClick(controlAddToCart);
  ProductsView.addHandlerQuantity(controlQuantity);

  ShoppingCartView.addHandlerDelete(controlDelete);
  OrderView.addHandlerShowConfirmation(controlConfirmation);
  OrderView.addHandlerStartNewOrder(controlShopping);
}
init();
