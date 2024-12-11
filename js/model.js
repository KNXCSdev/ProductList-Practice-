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

  if (cartItem) {
    // If the product is already in the cart, increase the quantity
    cartItem.quantity += 1;
  } else {
    // Otherwise, add it to the cart with quantity 1
    state.cart.push({ ...product, quantity: 1 });
  }
  console.log(state.cart);
}
