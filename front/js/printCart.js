const localStorageContent = localStorage.getItem('cart');
const cart = JSON.parse(localStorageContent);
console.log(cart);
let totalQuantity=0;
let totalPrice=0;
//recuperation des details grace a l'id
const fetchProduct = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`);
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}

//affichage panier
async function displayCart() {
    //récuperation des info du produit
    const products = await Promise.all(cart.map(item => fetchProduct(item.id)));
    const cartItems = document.querySelector("#cart__items");
    products.forEach((product, i) => {
        //creation des objets du panier
        //<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        const article = document.createElement("article");
        article.setAttribute("class", "cart__item");
        article.setAttribute("data-id", cart[i].id);
        article.setAttribute("data-color", cart[i].color);
        //<div class="cart__item__img">
        const imgContainer = document.createElement("div");
        imgContainer.setAttribute("class", "cart__item__img");
        article.appendChild(imgContainer);
        //<img src="../../back/images/kanap01.jpeg" alt="Photographie d'un canapé">
        const img = document.createElement("img");
        img.setAttribute("src", product.imageUrl);
        img.setAttribute("alt", product.altTxt);
        imgContainer.appendChild(img);
        //<div class="cart__item__content">
        const contentContainer = document.createElement("div");
        contentContainer.setAttribute("class", "cart__item__content");
        article.appendChild(contentContainer);
        //<div class="cart__item__content__description">
        const descriptionContainer = document.createElement("div");
        descriptionContainer.setAttribute("class", "cart__item__content__description");
        contentContainer.appendChild(descriptionContainer);
        //<h2>Nom du produit</h2>
        const h2 = document.createElement("h2");
        h2.innerText = product.name;
        descriptionContainer.appendChild(h2);
        //<p>Vert</p>
        const color = document.createElement("p");
        color.innerText = cart[i].color;
        descriptionContainer.appendChild(color);
        //<p>42,00 €</p>
        const price = document.createElement("p");
        price.innerText = product.price+" €";
        descriptionContainer.appendChild(price);
        //<div className="cart__item__content__settings">
        const settingsContainer = document.createElement("div");
        settingsContainer.setAttribute("class", "cart__item__content__settings");
        contentContainer.appendChild(settingsContainer);
        //<div class="cart__item__content__settings__quantity">
        const quantityContainer = document.createElement("div");
        quantityContainer.setAttribute("class", "cart__item__content__settings__quantity");
        settingsContainer.appendChild(quantityContainer);
        //<p>Qté : </p>
        const quantityLabel = document.createElement("p");
        quantityLabel.innerText = "Qté :";
        quantityContainer.appendChild(quantityLabel);
        //<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        const itemQuantity = document.createElement("input");
        itemQuantity.setAttribute("type", "number");
        itemQuantity.classList.add("itemQuantity");
        itemQuantity.setAttribute("name", "itemQuantity");
        itemQuantity.setAttribute("pattern","[0-9]");
        itemQuantity.setAttribute("title","La quantité soit être un nombre entier compris entre 1 et 100");
        itemQuantity.setAttribute("min", "1");
        itemQuantity.setAttribute("max", "100");
        itemQuantity.setAttribute("value", cart[i].quantity);
        quantityContainer.appendChild(itemQuantity);
        //<div class="cart__item__content__settings__delete">
        const deleteContainer = document.createElement("div");
        deleteContainer.setAttribute("class", "cart__item__content__settings__delete");
        settingsContainer.appendChild(deleteContainer);
        //<p class="deleteItem">Supprimer</p>
        const deleteButton = document.createElement("p");
        deleteButton.setAttribute("class", "deleteItem");
        deleteButton.innerText = "Supprimer";
        deleteContainer.appendChild(deleteButton);
        //calcul de la quantité et du prix total
        totalQuantity += parseInt(cart[i].quantity);
        totalPrice += product.price * cart[i].quantity;
        cartItems.appendChild(article);
    });
    //affichage quantité et prix
    document.getElementById("totalQuantity").innerHTML = totalQuantity;
    document.getElementById("totalPrice").innerHTML = totalPrice;
}

displayCart();
//suppression d'un element
document.addEventListener("click", function(e) {
    //On vérifie si l'on a appuyé sur le bouton Supprimer
    if (e.target && e.target.classList.contains("deleteItem")) {
        const item = e.target.closest('article');
        const itemId = item.dataset.id;
        const itemColor = item.dataset.color;
        //modifier localStorage
        const index = cart.findIndex(item => item.id === itemId && item.color === itemColor);
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        //modifier qté prix
        const itemPrice =parseInt(e.target.parentElement.parentElement.parentElement.querySelector(".cart__item__content__description > p:nth-child(3)").innerText);
        console.log(document.getElementById("totalPrice").innerHTML);
        const itemQuantity = item.querySelector('input[name="itemQuantity"]').value;
        totalQuantity = document.getElementById("totalQuantity").innerHTML-itemQuantity;
        totalPrice = document.getElementById("totalPrice").innerHTML-itemPrice*itemQuantity;
        document.getElementById("totalQuantity").innerHTML = totalQuantity;
        document.getElementById("totalPrice").innerHTML = totalPrice;
        //suppression affichage item
        item.remove();
    }
});

//modification d'un element
document.addEventListener("change", function(e) {
    if (e.target && e.target.classList.contains("itemQuantity")) {
        if (e.target && e.target.classList.contains("itemQuantity")) {
            const item = e.target.closest('article');
            const itemId = item.dataset.id;
            const itemColor = item.dataset.color;
            const index = cart.findIndex(item => item.id === itemId && item.color === itemColor);
            const oldQuantity = cart[index].quantity;
            const newQuantity = e.target.value;

            if (!(/^[0-9]+$/.test(newQuantity) ) || newQuantity > 100 || newQuantity < 0) {
                alert("La quantité doit être comprise entre 1 et 100");
                e.target.value=oldQuantity;
                //mettre ancienne donée a la place
            } else {
                //modifier le localStorage
                cart[index].quantity = newQuantity;
                localStorage.setItem("cart", JSON.stringify(cart));
                //modifier qté prix
                const itemPrice = parseInt(e.target.parentElement.parentElement.parentElement.querySelector(".cart__item__content__description > p:nth-child(3)").innerText);
                totalQuantity = parseInt(document.getElementById("totalQuantity").innerHTML) - oldQuantity +parseInt(newQuantity);
                totalPrice = parseInt(document.getElementById("totalPrice").innerHTML) + itemPrice * (-oldQuantity +parseInt(newQuantity));
                document.getElementById("totalQuantity").innerHTML = totalQuantity;
                document.getElementById("totalPrice").innerHTML = totalPrice;
            }
        }
    }

});


