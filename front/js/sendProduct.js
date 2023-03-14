const addToCart = document.getElementById('addToCart');
addToCart.addEventListener('click',function (){
    const color = document.getElementById("colors").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    let cart;
    // Vérifie s'il y a déjà un panier dans localStorage
    if (localStorage.getItem('cart')) {
        // Si oui, récupère le panier et le stocke dans la variable "cart"
        cart = JSON.parse(localStorage.getItem('cart'));
    } else {
        // Sinon, crée un panier vide
        cart = [];
    }
    if (color === "") {
        alert("Vous devez sélectionner une couleur avant d'ajouter le produit au panier.");
        return;
    }
    console.log(quantity)
    if (quantity <= 0 || quantity >100 || quantity%1!==0 ) {
        alert("Vous devez sélectionner un nombre d'article compris entre 1 et 100.");
        return;
    }
    // Déclare une variable pour savoir si le produit est déjà dans le panier
    let itemAlreadyInCart = false;
    // Parcourt tous les éléments du panier
    for (let i = 0; i < cart.length; i++) {
        // Vérifie s'il y a un produit avec le même id et la même couleur que celui que l'on souhaite ajouter
        if (cart[i].id == id && cart[i].color == color) {
            // Si c'est le cas, incrémente la quantité du produit correspondant dans le panier
            if(cart[i].quantity + quantity<=100){
                cart[i].quantity += quantity;
                itemAlreadyInCart = true;
            }else{
                alert("La somme Total  d'un même article ne peut dépasser 100.");
                return;
            }
            break;
        }
    }
    // Vérifie que le produit à ajouter n'est pas déjà présent dans le panier
    if (!itemAlreadyInCart) {
        cart.push({
            id: id,
            color: color,
            quantity: quantity
        });
    }
    alert("L'article à été ajouté au panier.");
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);
});
