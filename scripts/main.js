const cart = document.querySelector('.cart-container');

// Show cart when clicked
function showCart(e) {
    const cart = document.querySelector('.cart');
    if(cart.style.display === 'none') {
        cart.style.display = 'flex'
    } else {
        cart.style.display = 'none'
    }
}






cart.addEventListener('click', showCart)