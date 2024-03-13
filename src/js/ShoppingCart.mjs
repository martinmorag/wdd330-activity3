import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <span class="remove-item" data-id="${item.Id}">X</span>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <div class="cart-card__quantity">
    <p class="item-quantity">qty: ${item.Quantity}</p>
    <div class="inc-and-dec">
      <button class="increase-button">Increase</button>
      <button class="decrease-button">Decrease</button>
    </div>
  </div>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }
  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
  
    // Ensure cartItems is an array, or create an array with a single element if it's not
    const itemsArray = Array.isArray(cartItems) ? cartItems : [cartItems];
  
    console.log("Items array:", itemsArray); // Add this line for debugging
  
    const htmlItems = itemsArray.map((item) => cartItemTemplate(item));
    document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");

    document.querySelectorAll('.remove-item').forEach(item => {
      item.addEventListener('click', () => {
        const itemId = item.dataset.id;
        let cartItems = getLocalStorage(this.key);

        if (!Array.isArray(cartItems)) {
          cartItems = [];
        }

        cartItems = cartItems.filter(cartItem => cartItem.Id !== itemId);
        setLocalStorage(this.key, cartItems);

        // Re-render cart contents after removing item
        this.renderCartContents();
      });
    });

    document.querySelectorAll('.increase-button').forEach((button, index) => {
      button.addEventListener('click', () => {
        this.increaseQuantity(index);
      });
    });

    document.querySelectorAll('.decrease-button').forEach((button, index) => {
      button.addEventListener('click', () => {
        this.decreaseQuantity(index);
      });
    });
  }

  increaseQuantity(index) {
    let cartItems = getLocalStorage(this.key);
    cartItems[index].Quantity += 1;
    setLocalStorage(this.key, cartItems);
    this.renderCartContents();
  }

  decreaseQuantity(index) {
    let cartItems = getLocalStorage(this.key);
    if (cartItems[index].Quantity > 1) {
      cartItems[index].Quantity -= 1;
    }
    setLocalStorage(this.key, cartItems);
    this.renderCartContents();
  }
}