fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        console.log(value);
        const sectionItems = document.querySelector("#items");
        for (let canap of value){
            const a=document.createElement("a");
            a.setAttribute("href","./product.html?id=" + canap._id);
            const article= document.createElement("article");
            a.appendChild(article);
            const img =document.createElement("img");
            img.setAttribute("src",canap.imageUrl);
            img.setAttribute("alt",canap.altTxt );
            article.appendChild(img);
            const h3 =document.createElement("h3");
            h3.setAttribute("class","productName");
            h3.innerText=canap.name;
            article.appendChild(h3);
            const p=document.createElement("p");
            p.setAttribute("class","productDescription");
            p.innerText=canap.description;
            article.appendChild(p);
            sectionItems.appendChild(a);
        }
    })
    .catch(function(err) {
        // Une erreur est survenue
    });