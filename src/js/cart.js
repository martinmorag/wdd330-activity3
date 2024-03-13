import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();

/*document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.remove-item').forEach(item => {
    item.addEventListener('click', () => {
      const itemId = item.dataset.id;
      let cartItems = getLocalStorage("so-cart");

      // Check if cartItems is an array, if not initialize as an empty array
      if (!Array.isArray(cartItems)) {
        cartItems = [];
      }
      
      // Remove item from cartItems array based on itemId
      cartItems = cartItems.filter(cartItem => cartItem.Id !== itemId);
      
      // Update localStorage with updated cartItems
      setLocalStorage("so-cart", cartItems);
      
      // Re-render cart contents
      renderCartContents();
    });
  });
});*/
