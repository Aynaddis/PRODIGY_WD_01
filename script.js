// Navbar
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
}

// Scroll Reveal
const sr = ScrollReveal ({
    origin: 'top',
    distance: '40px',
    duration: 2000,
    reset: true
});

sr.reveal(`.home-text, .home-img,
            .about-img, .about-text,
            .box, .s-box,
            .btn, .connect-text,
            .contact-box`, {
    interval: 200
});

// Comment Form Submission
document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Display an alert
    alert('Thank you for your comment! We will get back to you soon.');

   
    this.reset();
});

// Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || []; // Load cart from localStorage or initialize as empty array
const cartIcon = document.getElementById('cart-icon');
const cartDropdown = document.getElementById('cart-dropdown');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.querySelector('.cart-count');
const emptyCartMessage = document.querySelector('.empty-cart-message');
const cartTotalPrice = document.getElementById('cart-total-price');

// Function to update the cart dropdown and count
function updateCartUI() {
    // Update cart count
    cartCount.textContent = cart.length;

    // Update cart items in dropdown
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartTotalPrice.textContent = '0.00';
    } else {
        emptyCartMessage.style.display = 'none';
        let totalPrice = 0;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.price}`;

            // remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-item');
            removeButton.addEventListener('click', () => {
                cart.splice(index, 1); // Remove item from cart
                localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
                updateCartUI(); // Refresh the UI
            });

            li.appendChild(removeButton);
            cartItemsContainer.appendChild(li);

            // Calculate total price
            totalPrice += parseFloat(item.price.replace('$', ''));
        });

        // Update total price
        cartTotalPrice.textContent = totalPrice.toFixed(2);
    }
}

// event listener to cart icon to toggle dropdown
cartIcon.addEventListener('click', () => {
    cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
});

// event listeners to all cart icons
document.querySelectorAll('.bx-cart-alt').forEach(icon => {
    icon.addEventListener('click', function() {
        const box = this.closest('.box');
        const itemName = box.querySelector('h2').innerText;
        const itemPrice = box.querySelector('span').innerText;

        // Add item to cart
        cart.push({ name: itemName, price: itemPrice });

        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update the cart UI
        updateCartUI();

        // Display alert
        alert(`${itemName} has been added to your cart!`);
    });
});

// Initialize cart UI on page load
updateCartUI();