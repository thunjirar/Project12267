// Shopping Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add to cart function
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description || '',
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    showNotification(`${product.name} added to cart!`);
}

// Update cart UI elements
function updateCartUI() {
    // Update floating cart badge if exists
    const cartBadge = document.querySelector('.floating-cart-badge, .cart-badge');
    if (cartBadge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    // Update cart display on cart page
    if (window.location.pathname.includes('Cart.html')) {
        updateCartDisplay();
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Initialize add to cart buttons
function initializeAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart, .add-to-cart-btn, .product-add-btn, .add-to-cart-btn-custom');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product details from button or parent card
            const card = this.closest('.menu-card, .product-card, .bestseller-card');
            if (!card) return;
            
            const product = {
                id: this.dataset.productId || card.querySelector('h3').textContent.toLowerCase().replace(/\s+/g, '-'),
                name: card.querySelector('h3').textContent,
               price: parseInt(this.dataset.price) 
   || parseInt(card.querySelector('.product-price')?.textContent.replace(/[^\d]/g, '')) 
   || 0,
                image: card.querySelector('img').src,
                description: card.querySelector('p') ? card.querySelector('p').textContent : ''
            };
            
            addToCart(product);
        });
    });
}

// Initialize floating cart
function initializeFloatingCart() {
    const floatingCart = document.querySelector('.floating-cart-menu');
    if (floatingCart) {
        floatingCart.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'Cart.html';
        });
        
        // Add cart badge
        const badge = document.createElement('span');
        badge.className = 'floating-cart-badge';
        badge.style.cssText = `
            position: absolute;
            top: -5px;
            right: -5px;
            background: #ff4444;
            color: white;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 0.7rem;
            font-weight: bold;
            line-height: 1;
        `;
        floatingCart.appendChild(badge);
    }
}

// Cart page functions
function updateCartDisplay() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const subtotalElement = document.querySelector('.subtotal');
    const totalElement = document.querySelector('.total-amount');
    const cartCountElement = document.querySelector('.cart-count');
    const subtotalTextElement = document.getElementById('cart-subtotal-text');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        if (subtotalElement) subtotalElement.textContent = '0 THB';
        if (totalElement) totalElement.textContent = '50 THB';
        if (cartCountElement) cartCountElement.textContent = '0 items';
        if (subtotalTextElement) subtotalTextElement.textContent = 'Subtotal (0 items)';
        return;
    }
    
    let subtotal = 0;
    cartItemsContainer.innerHTML = '';
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItemHTML = `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="cart-item-price">${item.price} THB</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" onclick="updateQuantity(${index}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <div class="cart-item-total">${itemTotal} THB</div>
                <button class="remove-item" onclick="removeItem(${index})">×</button>
            </div>
        `;
        cartItemsContainer.innerHTML += cartItemHTML;
    });
    
    const delivery = 50;
    const total = subtotal + delivery;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (subtotalElement) subtotalElement.textContent = `${subtotal} THB`;
    if (totalElement) totalElement.textContent = `${total} THB`;
    if (cartCountElement) cartCountElement.textContent = `${totalItems} items`;
    if (subtotalTextElement) subtotalTextElement.textContent = `Subtotal (${totalItems} items)`;
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartUI();
}

function removeItem(index) {
    const itemName = cart[index].name;
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartUI();
    showNotification(`${itemName} removed from cart`);
}

// Custom form add to cart
function initializeCustomForm() {
    const customForm = document.getElementById('custom-bread-form');
    const addToCartBtn = document.querySelector('.add-to-cart-btn-custom');
    
    if (!customForm || !addToCartBtn) return;
    
    addToCartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get selected options
        const selectedBase = document.querySelector('input[name="base"]:checked');
        const selectedFlavor = document.querySelector('input[name="flavor"]:checked');
        const selectedTopping = document.querySelector('input[name="topping"]:checked');
        const note = document.querySelector('textarea[name="note"]').value;
        
        if (!selectedBase || !selectedFlavor) {
            showNotification('Please select both base and flavor options');
            return;
        }
        
        // Calculate total price
        let totalPrice = 0;
        if (selectedBase) totalPrice += parseInt(selectedBase.dataset.price);
        if (selectedFlavor) totalPrice += parseInt(selectedFlavor.dataset.price);
        if (selectedTopping) totalPrice += parseInt(selectedTopping.dataset.price);
        
        // Create custom product
        const customProduct = {
            id: 'custom-' + Date.now(),
            name: 'Custom Bread',
            price: totalPrice,
            image: 'images/custom-bread.png',
            description: `${selectedBase.nextElementSibling.textContent.trim()}, ${selectedFlavor.nextElementSibling.textContent.trim()}${selectedTopping ? ', ' + selectedTopping.nextElementSibling.textContent.trim() : ''}`,
            quantity: 1
        };
        
        addToCart(customProduct);
        
        // Reset form
        customForm.reset();
    });
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('.menu-sweet-search input');
    const searchBtn = document.querySelector('.search-icon');
    const clearBtn = document.querySelector('.clear-icon');
    const productCards = document.querySelectorAll('.menu-products-grid .product-card');

    if (!searchInput) return;

    if (clearBtn) {
        clearBtn.style.display = 'none';
    }

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            const productDesc = card.querySelector('p').textContent.toLowerCase();

            if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
                card.style.display = ''; 
            } else {
                card.style.display = 'none'; 
            }
        });

        if (clearBtn) {
            clearBtn.style.display = searchTerm.length > 0 ? 'inline-block' : 'none';
        }
    }

    searchInput.addEventListener('keyup', filterProducts);
    
    if (searchBtn) searchBtn.addEventListener('click', filterProducts);
    
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            searchInput.value = ''; 
            filterProducts(); 
            searchInput.focus(); 
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateCartUI();
    initializeAddToCartButtons();
    initializeFloatingCart();
    initializeCustomForm();
    initializeSearch(); // เรียกใช้งานระบบค้นหา
    
    // Cart page specific initialization
    if (window.location.pathname.includes('Cart.html')) {
        updateCartDisplay();
        
        // Continue shopping button
        const continueBtn = document.querySelector('.continue-shopping-btn');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                window.location.href = 'Menu.html';
            });
        }
        
        // Checkout button
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                window.location.href = 'Checkout.html';
            });
        }
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);