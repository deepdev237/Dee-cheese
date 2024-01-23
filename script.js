
let degree = 0;

function changeGradient() {
    degree = (degree + 1) % 360;
    const color1 = `hsl(${degree}, 100%, 50%)`;
    const color2 = `hsl(${(degree + 180) % 360}, 100%, 50%)`;
    document.getElementById('dynamic-bg').style.background = `linear-gradient(${degree}deg, ${color1}, ${color2})`;
}

setInterval(changeGradient, 1000 / 60); // Change every frame (60fps)

function getMoney() {
    return localStorage.getItem("moneyBalance");
}

function setMoney(amount) {
    localStorage.setItem("moneyBalance", amount);
    document.querySelector("#moneyBalance").innerHTML = amount;
}

function addMoney(amount) {
    let moneyBalance = getMoney();
    setMoney(parseInt(moneyBalance) + amount);
}

function removeMoney(amount) {
    let moneyBalance = getMoney();
    setMoney(parseInt(moneyBalance) - amount);
}

// get the money balance from the localStorage
let moneyBalance = getMoney();
if (moneyBalance == null) {
    setMoney(0);
} else {
    setMoney(moneyBalance);
}

function GetCart() {
    let cart = localStorage.getItem('cart');

    if (cart === null) {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
    } else {
        // If the cart is not null, parse it as JSON
        cart = JSON.parse(cart);
    }

    return cart;
}

function AddToCart(name, price, img, description) {
    // Get the cart from local storage
    let cart = GetCart();

    // Add the new item to the cart
    cart.push({ name, price, img, description, quantity: 1});

    // Save the cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
}

function RemoveFromCart(product) {
    let cart = GetCart();

    // Remove the product from the cart
    cart = cart.filter(p => p.name !== product.name);

    // Save the cart
    localStorage.setItem('cart', JSON.stringify(cart));
}

function UpdateCart() {
    let cart = GetCart();

    // Get the cart element
    let cartElement = document.querySelector('.cart');

    // Clear the cart element
    cartElement.innerHTML = '';

    // Loop through the cart
    for (let product of cart) {
        // Create a new cart item element
        let cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        // Create the image element
        let image = document.createElement('img');
        image.src = product.image;
        cartItem.appendChild(image);

        // Create the name element
        let name = document.createElement('h3');
        name.innerText = product.name;
        cartItem.appendChild(name);

        // Create the price element
        let price = document.createElement('p');
        price.innerText = '$' + product.price;
        cartItem.appendChild(price);

        // Create the quantity label
        let quantityLabel = document.createElement('label');
        quantityLabel.innerText = 'Quantity:';
        cartItem.appendChild(quantityLabel);

        // Create the quantity input
        let quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.name = 'quantity';
        quantityInput.value = product.quantity;
        quantityInput.min = 0;
        cartItem.appendChild(quantityInput);

        // Create the remove button
        let removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        cartItem.appendChild(removeButton);

        // Add the cart item to the cart
        cartElement.appendChild(cartItem);
    }

    UpdateTotal()
}

