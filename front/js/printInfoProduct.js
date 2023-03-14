const url = new URL(window.location.href);
const id = url.searchParams.get("id");

// Envoie une requête HTTP GET à l'URL spécifiée pour récupérer les informations sur le produit d'identifiant id
fetch("http://localhost:3000/api/products/"+id)

    // Une fois la réponse disponible, appelle la fonction avec la réponse en argument
    .then(function(res) {
        if (res.ok) {
            // Parse le contenu de la réponse en JSON et retourne la valeur
            return res.json();
        }
    })

    // Une fois la valeur (le contenu JSON parsé) disponible, appelle la fonction avec la valeur en argument
    .then(function(value) {
        console.log(value)
        // Met à jour les informations du produit avec l'URL du produit
        document.querySelector(".item__img")
            .innerHTML ="<img src=\""+value.imageUrl+"\" alt=\""+value.altTxt+"\">";
        document.getElementById("title")
            .innerText = value.name;
        document.getElementById("price")
            .innerText = value.price;
        document.getElementById("description")
            .innerText = value.description;

        // Crée une liste d'options pour la sélection de couleur du produit
        let color="<option value=\"\">--SVP, choisissez une couleur --</option>";
        for (let colorNumber of value.colors) {
            color += "<option value=\""+colorNumber+"\">"+colorNumber+"</option>";
        }
        document
            .getElementById("colors")
            .innerHTML=color;
    })
    .catch(function(err) {
        // Une erreur est survenue
    });

