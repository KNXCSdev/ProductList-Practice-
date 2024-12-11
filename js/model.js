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
  const product = state.products.find((prod) => prod.id === id);
  if (product) {
    model.state.cart.push({ ...product, quantity: 1 });
    console.log(model.state.cart);
  }
}
