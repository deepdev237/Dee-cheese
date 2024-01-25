
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

function SignUp (username, password) {
    // Get the user from local storage
    let user = localStorage.getItem('user');

    // If there are no user, create an empty array
    if (user === null) {
        user = [];
    } else {
        // If the user is not null, parse it as JSON
        user = JSON.parse(user);
    }

    // Add the new user to the user array
    user.push({ username, password });

    // Save the user back to local storage
    localStorage.setItem('user', JSON.stringify(user));

    // Return the new user
    return { username, password };
}

function getUser() {
    let user = localStorage.getItem('user');

    if (user === null) {
        user = [];
        localStorage.setItem('user', JSON.stringify(user));
    } else {
        // If the user is not null, parse it as JSON
        user = JSON.parse(user);
    }

    return user;
}

function Login(username, password) {
    let user = getUser();

    if (user.username === username && user.password === password) {
        return true;
    }

    // set loggedIn to true
    localStorage.setItem('loggedIn', true);

    return false;
}

function Logout() {
    localStorage.setItem('loggedIn', false);
}

window.onload = function () {

    console.log("onload");
    // get the money balance from the localStorage and set it to display only if logged in
    let loggedIn = localStorage.getItem("loggedIn");
    let user = JSON.parse(localStorage.getItem("user"));

    if (loggedIn === null) {
        loggedIn = "false";
        localStorage.setItem("loggedIn", loggedIn);
    }

    if (loggedIn === "true") {
        document.querySelector("#moneyBalance").innerHTML = getMoney();
    }
    // if not logged in, hide the money balance
    if (loggedIn === "false") {
        document.querySelector("#moneyBalance").style.display = "none";
    }
    // if not logged in and there is a user in localStorage change <a href="account.html">Account</a> innerHTML to Login
    if (loggedIn === "false" && user !== null) {
        let account = document.querySelector(".account");
        let accountLink = account.querySelector("a");
        accountLink.innerHTML = "Login";
    }
    // if not logged in and there is no user in localStorage change <a href="account.html">Account</a> innerHTML to Sign Up
    if (loggedIn === "false" && user === null) {
        let account = document.querySelector(".account");
        console.log(account);
        let accountLink = account.querySelector("a");
        console.log(accountLink);
        accountLink.innerHTML = "Sign Up";
    }
    // if logged in and there is a user in localStorage change <a href="account.html">Account</a> innerHTML to the username
    if (loggedIn === "true" && user !== null) {
        let account = document.querySelector(".account");
        let accountLink = account.querySelector("a");

        let user = JSON.parse(user);
        accountLink.innerHTML = user.username;
    }
}