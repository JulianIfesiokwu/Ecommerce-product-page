const cart = document.querySelector('.cart-container');
const thumbnailImages = document.querySelectorAll('.image');
const addToCartBtn = document.querySelector('.add-to-cart');
const cartList = document.querySelector('.cart-list')
const cartStatus = document.querySelector('.cart-status');
const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')
const itemQuantity = document.querySelector('.counter')
const quantityPill = document.querySelector('.quantity-pill')
// For lightbox
const lightBoxButton = document.querySelector('.large__display');
const closeLightBoxBtn = document.querySelector('.close-button')

// Show cart when clicked
function showCart(e) {
    const cart = document.querySelector('.cart');
    if(cart.style.display === 'none') {
        cart.style.display = 'flex'
    } else {
        cart.style.display = 'none'
    }
}

function deleteItem(e) {
    const itemToRemove = e.target.closest('.item');
    // Remove cart status if cart has a child    
    if(cartList.hasChildNodes) {
        cartStatus.style.display = 'none';
        itemToRemove.remove()
        decreaseQuantity()
    } else {
        cartStatus.style.display = 'initial';
        itemToRemove.remove()
    }

}

// Get product info
function addProduct() {
    // Create product container
    const item = document.createElement('li')
    item.classList.add('item')

    // create product img tag
    const productImage = document.createElement('img');
    productImage.classList.add('product-image');
    productImage.setAttribute('src', `./images/image-product-1-thumbnail.jpg`);
    productImage.setAttribute('alt', `Fall Limited Edition Sneakers`)

    // Create container for product information
    const productDetails = document.createElement('div')
    productDetails.classList.add('product-details')

    // Create product name
    const productName = document.createElement('p')
    productName.classList.add('product-name')
    productName.textContent = `Fall Limited Edition Sneakers`

    // Create product amount details
    const productAmount = document.createElement('p')
    productAmount.classList.add('amount')
    productAmount.textContent = `$125.00 x`

    // create quantity details
    const quantity = document.createElement('span')
    quantity.classList.add('quantity')
    quantity.textContent = 3

    // create quantity totals
    const totals = document.createElement('span')
    totals.classList.add('total')
    totals.textContent = ` $375.00`

    // append quantity and total to amount
    productAmount.append(quantity, totals)
    // append product name and product quantity to product details
    productDetails.append(productName, productAmount)
    // Add trash can
    const trashCan = document.createElement('img')
    trashCan.classList.add('delete')
    trashCan.setAttribute('src', `./images/icon-delete.svg`)
    trashCan.setAttribute('alt', `delete product`)
    // add event listener to trash can
    trashCan.addEventListener('click', deleteItem)
    // append all 3 children to item
    item.append(productImage, productDetails, trashCan)
    // append to cart-list
    cartList.appendChild(item)
}

// Add item to cart
function addItemToCart() {
    // Remove cart status if cart has a child    
    if(cartList.hasChildNodes) {
        cartStatus.style.display = 'none';
        // add item
        // addProduct()
        increaseQuantity()
    } else {
        cartStatus.style.display = 'initial';
    }

}

function removeCartItem() {
    console.log(cartList.childElementCount)
}

function increaseQuantity() {
    itemQuantity.textContent = +itemQuantity.textContent + 1
    quantityPill.textContent = +quantityPill.textContent + 1
    addProduct()
}

function decreaseQuantity() {
    if(itemQuantity.textContent >= 1) {
        itemQuantity.textContent = +itemQuantity.textContent - 1
        quantityPill.textContent = +quantityPill.textContent - 1
        removeCartItem()
    } else {
        quantityPill.textContent = '0'
    }
}

function updateLargeImage(e) {
    let identifier = e.target.id
    const allLargeImages = document.querySelectorAll('.large__display__img')
    allLargeImages.forEach((largeImage) => {

        if( largeImage.id === identifier ) {
            largeImage.classList.replace('product-hidden','product-active')
        } 
        if( largeImage.id !== identifier ) {
            largeImage.classList.replace('product-active', 'product-hidden')
        } 
    })
}

function startLightBox() {
    // display overlay
    const overlay = document.querySelector('.overlay')
    overlay.style.display = 'block'
    // display lightbox
    const lightBox = document.querySelector('.lightbox')
    lightBox.style.display = 'block'
}

function closeLightBox() {
    // hide overlay
    const overlay = document.querySelector('.overlay')
    overlay.style.display = 'none'
    // hide lightbox
    const lightBox = document.querySelector('.lightbox')
    lightBox.style.display = 'none'
}

addToCartBtn.addEventListener('click', addItemToCart)
thumbnailImages.forEach((thumbnailImage) => {
    thumbnailImage.addEventListener('click', (e) => {
        // Loop through and remove any active class on any image
        thumbnailImages.forEach((thumbnailImage) => {
            thumbnailImage.classList.remove('active');
        })

        // Change large product image and add active class to image clicked
        thumbnailImage.classList.add('active')
        updateLargeImage(e)
        // console.log(e.target)

    })
})

cart.addEventListener('click', showCart)

nextBtn.addEventListener('click', increaseQuantity)
prevBtn.addEventListener('click', decreaseQuantity)
lightBoxButton.addEventListener('click', startLightBox)
closeLightBoxBtn.addEventListener('click', closeLightBox)