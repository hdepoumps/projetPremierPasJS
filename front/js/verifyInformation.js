const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const address = document.querySelector('#address');
const city = document.querySelector('#city');
const email = document.querySelector('#email');
let errors = {}; // déclaration d'une variable globale pour stocker les messages d'erreur

document.getElementById('order').addEventListener("click", function(event) {
    event.preventDefault();
    const firstNameValue = firstName.value;
    const lastNameValue = lastName.value;
    const addressValue = address.value;
    const cityValue = city.value;
    const emailValue = email.value;
    let hasError = false;
    //vérifications des champs de texte
    if (!firstNameValue) {
        firstName.setCustomValidity("Veuillez remplir ce champ");
        errors.firstName = "Veuillez remplir ce champ";
        hasError = true;
    } else if (!/^[a-zA-Z\u00C0-\u017F\s-']+$/.test(firstNameValue)) {
        firstName.setCustomValidity("Le prénom n'est pas valide");
        errors.firstName = "Le prénom n'est pas valide";
        hasError = true;
    } else {
        firstName.setCustomValidity("");
        errors.firstName = "";
    }
    if (!lastNameValue) {
        lastName.setCustomValidity("Veuillez compléter ce champ");
        errors.lastName = "Veuillez remplir ce champ";
        hasError = true;
    } else if (!/^[a-zA-Z\u00C0-\u017F\s-']+$/.test(lastNameValue)) {
        lastName.setCustomValidity("Le nom n'est pas valide");
        errors.lastName="Le nom n'est pas valide";
        hasError = true;
    }else{
        lastName.setCustomValidity("");
        errors.lastName = "";
    }

    if (!addressValue) {
        address.setCustomValidity("Veuillez remplir ce champ");
        errors.adress = "Veuillez remplir ce champ";
        hasError = true;
    }else if(!/^[a-zA-Z0-9\u00C0-\u017F\s-']+$/.test(addressValue)){
        address.setCustomValidity("L'adresse n'est pas valide");
        errors.adress ="L'adresse n'est pas valide";
        hasError = true;
    }else{
        address.setCustomValidity("");
        errors.adress = "";
    }
    if (!cityValue) {
        city.setCustomValidity("Veuillez remplir ce champ");
        errors.city = "Veuillez remplir ce champ";
        hasError = true;
    } else if (!/^[a-zA-Z\u00C0-\u017F\s-']+$/.test(cityValue)) {
        city.setCustomValidity("La ville n'est pas valide");
        errors.city ="La ville n'est pas valide";
        hasError = true;
    }else{
        city.setCustomValidity("");
        errors.city ="";
    }
    if (!emailValue) {
        email.setCustomValidity("Veuillez remplir ce champs");
        errors.email = "Veuillez remplir ce champ";
        hasError = true;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue)) {
        email.setCustomValidity("l'email n'est pas valide");
        errors.email ="L'email n'est pas valide";
        hasError = true;
    }else{
        email.setCustomValidity("");
        errors.email ="";

    }
    //on vérifie qu'il n'y a pas d'erreur
    if (!hasError){
        const contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value
        };
        const products = cart.map(item => item.id);
        fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ contact, products })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // redirection vers la page de confirmation avec l'ID de commande
                window.location.replace(`confirmation.html?id=${data.orderId}`);
            })
            .catch(error => {
                console.error(error);
            });
    } else {
        // affichage des messages d'erreur sur les champs du formulaire
        email.reportValidity();
        city.reportValidity();
        address.reportValidity();
        lastName.reportValidity();
        firstName.reportValidity();
    }
});
