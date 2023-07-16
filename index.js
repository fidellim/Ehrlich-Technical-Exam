// Toggle Hamburger Menu
const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileMenuContent = document.querySelector('.mobile-menu-content');

hamburgerMenu.addEventListener('click', () => {
    mobileMenuContent.classList.toggle('show');
});

// Shopping Cart Class
class ShoppingCart {
  constructor() {
    this.modalContainer = document.getElementById('shopping-cart-modal');
    this.modalProductsContainer = document.querySelector('#shopping-cart-modal .products');
    this.closeButton = document.querySelector('#shopping-cart-modal .btn-close');
    this.isCartModalOpen = false;
    this.shoppingCartItems = [];

    this.addToCartButtons = document.querySelectorAll('.button-buy');
    this.shoppingCartIconDesktop = document.querySelector('.desktop-nav .shopping-cart-icon');
    this.shoppingCartIconMobile = document.querySelector('.mobile-nav .shopping-cart-icon');

    this.closeButton.addEventListener('click', this.closeShoppingCartModal.bind(this));
    this.addToCartButtons.forEach((button) => {
      button.addEventListener('click', this.handleAddToCart.bind(this));
    });
    this.shoppingCartIconDesktop.addEventListener('click', this.toggleShoppingCartModal.bind(this));
    this.shoppingCartIconMobile.addEventListener('click', this.toggleShoppingCartModal.bind(this));
  }

  updateShoppingCartModal() {
    this.modalProductsContainer.innerHTML = '';

    if (this.shoppingCartItems.length === 0) {
      const emptyCartMessage = document.createElement('p');
      emptyCartMessage.classList.add('empty-cart');
      emptyCartMessage.textContent = 'Your shopping cart is empty.';
      this.modalProductsContainer.appendChild(emptyCartMessage);
    } else {
        let totalProducts = 0;
        let totalPrice = 0;  
            
        this.shoppingCartItems.forEach((item) => {
            const cartItem = document.createElement('div');
            const cartItemContent = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItemContent.classList.add('cart-item-content');

            const itemImage = document.createElement('img');
            itemImage.src = item.imageSrc;
            itemImage.alt = item.title;
            cartItem.appendChild(itemImage);

            const itemTitle = document.createElement('h3');
            itemTitle.textContent = item.title;
            cartItemContent.appendChild(itemTitle);

            const itemQuantity = document.createElement('p');
            itemQuantity.textContent = `Quantity: ${item.quantity}`;
            cartItemContent.appendChild(itemQuantity);

            const itemPrice = document.createElement('p');
            itemPrice.textContent = `Price: $${item.price}`;
            cartItemContent.appendChild(itemPrice);

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
            this.removeItemFromCart(item);
            });
            cartItemContent.appendChild(deleteButton);
            cartItem.appendChild(cartItemContent);

            this.modalProductsContainer.appendChild(cartItem);
            
            totalProducts += item.quantity;
            totalPrice += parseFloat(item.price);
        });
      
        const totalProductsElement = document.createElement('a');
        totalProductsElement.setAttribute('href', '#');
        totalProductsElement.classList.add('total-products');
        totalProductsElement.textContent = `My Bag (${totalProducts})`;

        const totalPriceElement = document.createElement('p');
        totalPriceElement.classList.add('total-price');
        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
        
        const totalDetails = document.createElement('div');
        totalDetails.classList.add("total-details");
        
        totalDetails.appendChild(totalProductsElement);
        totalDetails.appendChild(totalPriceElement);
        this.modalProductsContainer.appendChild(totalDetails);
    }
  }

  removeItemFromCart(item) {
    const index = this.shoppingCartItems.findIndex((cartItem) => cartItem.title === item.title);
    if (index > -1) {
      this.shoppingCartItems.splice(index, 1);
      this.updateShoppingCartModal();
    }
  }

  handleAddToCart(event) {
    const button = event.target;
    const recentlyBoughtItem = button.closest('.recently-bought-item');

    const itemImageSrc = recentlyBoughtItem.querySelector('img').src;
    const itemTitle = recentlyBoughtItem.querySelector('.item-desc').textContent;
    const itemPrice = recentlyBoughtItem.querySelector('.price').textContent;

    const existingItem = this.shoppingCartItems.find((item) => item.title === itemTitle);
    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.price = parseFloat(existingItem.price) * existingItem.quantity;
    } else {
      const item = {
        imageSrc: itemImageSrc,
        title: itemTitle,
        quantity: 1,
        price: parseFloat(itemPrice.replace(/[^\d.-]/g, '')).toFixed(2),
      };

      this.shoppingCartItems.push(item);
    }

    this.openShoppingCartModal();
  }

  toggleShoppingCartModal() {
    this.isCartModalOpen = !this.isCartModalOpen;

    if (this.isCartModalOpen) {
      this.openShoppingCartModal();
    } else {
      this.closeShoppingCartModal();
    }
  }

  openShoppingCartModal() {
    this.updateShoppingCartModal();
    this.modalContainer.style.display = 'block';
  }

  closeShoppingCartModal() {
    this.modalContainer.style.display = 'none';
  }
}

// Create an instance of the ShoppingCart class
const shoppingCart = new ShoppingCart();