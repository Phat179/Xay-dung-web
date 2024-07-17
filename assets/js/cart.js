let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listProductsHTML = document.querySelector('.pro-container');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');

let listProducts = [];
let carts = [];
document.querySelector('#mobile .icon-cart').addEventListener('click', () => {
    body.classList.toggle('showCart');
});

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
});

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
});

const addDataToHTML = () => {
    listProductsHTML.innerHTML = '';
    if(listProducts.length > 0){
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('pro');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
            <div onclick="window.location.href='sproduct.html'">
            <img src="${product.image}" alt="">
                <div class="des">
                    <span>adidas</span>
                    <h5>${product.name}</h5>
                    <div class="star">
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                    </div>
                    <h4>$${product.price}</h4>
                </div>
                </div>
                <i id="cart" class="material-icons addCart">shop</i>`;
                listProductsHTML.appendChild(newProduct);
        })
    }
    iconCartSpan.innerText = totalQuantity; 
    document.querySelector('#mobile .icon-cart span').innerText = totalQuantity; 
}

listProductsHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart')){
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
})

const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if (carts.length <= 0) {
        carts = [{
            product_id: product_id,
            quantity: 1
        }];
    } else if (positionThisProductInCart < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        carts[positionThisProductInCart].quantity++;
    }
    addCartToHTML();
    addCartToMemory();
}


const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
}

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity += cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct];
            newCart.innerHTML = `
                <div class="image">
                    <img src="${info.image}" width="80px" height="auto" alt="">
                </div>
                <div class="name">${info.name}</div>
                <div class="totalPrice">$${info.price * cart.quantity}</div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">+</span>
                </div>`;
            listCartHTML.appendChild(newCart);
        })
    }
    iconCartSpan.innerText = totalQuantity;
    document.querySelector('#mobile .icon-cart span').innerText = totalQuantity;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id; // Adjusted to find dataset.id from the correct element
        let type = positionClick.classList.contains('plus') ? 'plus' : 'minus';
        changeQuantity(product_id, type);
    }
})

const changeQuantity = (product_id, type) => {
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        switch (type) {
            case 'plus':
                carts[positionItemInCart].quantity++;
                break;
            case 'minus':
                if (carts[positionItemInCart].quantity > 1) {
                    carts[positionItemInCart].quantity--;
                } else {
                    carts.splice(positionItemInCart, 1);
                }
                break;
            default:
                break;
        }
    }
    addCartToMemory();
    addCartToHTML();
}

const initApp = () => {
    fetch('assets/json/products.json')
    .then(Response => Response.json())
    .then(data => {
        listProducts = data;
        console.log();
        addDataToHTML();

        if(localStorage.getItem('cart')){
            carts = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
initApp();