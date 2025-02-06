
function LoadCategories()
{
    fetch("https://fakestoreapi.com/products/categories")
    .then(function(response){
         return response.json();
    })
    .then(function(categories){
         categories.unshift("all");
         categories.map(function(category){
            var option = document.createElement("option");
            option.text = category.toUpperCase();
            option.value = category;
            document.getElementById("lstCategories").appendChild(option);
         })
    })
}

function LoadProducts(url){
    document.querySelector("main").innerHTML = "";
    fetch(url)
    .then(function(response){
         return response.json();
    })
    .then(function(products){

        products.map(function(product){

            var div = document.createElement("div");
            div.className = "card m-2 p-2";
            div.style.width = "200px";
            div.innerHTML = `
              <img class="card-img-top" src=${product.image} height="120">
              <div class="card-header" style="height:120px">
                 ${product.title}
              </div>
              <div class="card-body">
                 <dl>
                    <dt> Price </dt>
                    <dd> ${product.price} </dd>
                    <dt> Rating </dt>
                    <dd> ${product.rating.rate} <span class="bi bi-star-fill text-success"> </span> </dd>
                 </dl>
              </div>
              <div class="card-footer">
                  <button onclick="AddClick(${product.id})" class="bi bi-cart3 btn btn-warning"> Add to Cart </button>
              </div>
            `;
            document.querySelector("main").appendChild(div);


        })

    })
}


function bodyload(){
    LoadCategories();
    LoadProducts("https://fakestoreapi.com/products");
    GetCartCount();
}

function CategoryChange(){
    var categoryName = document.getElementById("lstCategories").value;
    if(categoryName==="all") {
        LoadProducts("https://fakestoreapi.com/products");
    } else {
        LoadProducts(`https://fakestoreapi.com/products/category/${categoryName}`);
    }
}
var cartItems = [];
function GetCartCount(){
    document.getElementById("lblCount").innerHTML = cartItems.length;
}
function AddClick(id){
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then(function(response){
        return response.json();
    })
    .then(function(product){
        cartItems.push(product);
        GetCartCount();
        alert(`${product.title}\nAdded to Cart`);
    })
}
function ShowCart(){
    document.querySelector("tbody").innerHTML = "";
    cartItems.map(function(item){
        var tr = document.createElement("tr");
        var tdTitle = document.createElement("td");
        var tdPrice = document.createElement("td");
        var tdPreview = document.createElement("td");

        tdTitle.innerHTML = item.title;
        tdPrice.innerHTML = item.price;
        tdPreview.innerHTML = `<img src=${item.image} width="50" height="50">`;

        tr.appendChild(tdTitle);
        tr.appendChild(tdPreview);
        tr.appendChild(tdPrice);

        document.querySelector("tbody").appendChild(tr);
    })
}
function SearchClick(){
    var category  = document.getElementById("txtSearch").value;
    LoadProducts(`https://fakestoreapi.com/products/category/${category}`);
}
function RatingChange(){
    document.querySelector("main").innerHTML = "";
    var rating = document.getElementById("optRating");
    if(rating.checked) {
        fetch(`https://fakestoreapi.com/products`)
        .then(function(response){
            return response.json();
        })
        .then(function(products){
            var filteredProducts = products.filter(function(product){
                 return product.rating.rate>4.5;
            });
            filteredProducts.map(function(product){
                var div = document.createElement("div");
                div.className = "card m-2 p-2";
                div.style.width = "200px";
                div.innerHTML = `
                <img class="card-img-top" src=${product.image} height="120">
                <div class="card-header" style="height:120px">
                    ${product.title}
                </div>
                <div class="card-body">
                    <dl>
                        <dt> Price </dt>
                        <dd> ${product.price} </dd>
                        <dt> Rating </dt>
                        <dd> ${product.rating.rate} <span class="bi bi-star-fill text-success"> </span> </dd>
                    </dl>
                </div>
                <div class="card-footer">
                    <button onclick="AddClick(${product.id})" class="bi bi-cart3 btn btn-warning"> Add to Cart </button>
                </div>
                `;
                document.querySelector("main").appendChild(div);

            })
        })
    } else {
        LoadProducts(`https://fakestoreapi.com/products`);
    }
}