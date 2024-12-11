export const state = {
  products: [],
  cart: [],
};

export async function shopData() {
  try {
    const data = await fetch("data.json");
    const res = await data.json();
    state.products = res;
  } catch (err) {
    console.error(err);
  }
}

export function addToCart(id) {
  // Find the product in the products array
  const product = state.products.find((prod) => prod.id === id);
  if (!product) return;

  // Check if the product is already in the cart
  const cartItem = state.cart.find((item) => item.id === id);

  if (cartItem) return;
  // Otherwise, add it to the cart with quantity 1
  else state.cart.push({ ...product, quantity: 1 });
}

export function incrementQuantity(id) {
  const cartItem = state.cart.find((item) => item.id === id);
  console.log(cartItem);
  if (cartItem) cartItem.quantity += 1;
}

export function decrementQuantity(id) {
  const cartItem = state.cart.find((item) => item.id === id);
  console.log(cartItem);
  if (cartItem && cartItem.quantity >= 2) {
    cartItem.quantity -= 1;
  } else {
    // Remove item from cart if quantity reaches 0

    state.cart = state.cart.filter((item) => item.id !== id);
  }
}

export function deleteItem(id) {
  const cartItem = state.cart.find((item) => item.id === id);
  state.cart = state.cart.filter((item) => item.id !== cartItem.id);
  console.log(state.cart);
}
