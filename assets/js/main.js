let title=document.getElementById('title');
let priceInputs=document.getElementsByClassName('priceInputs');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let category=document.getElementById('category');
let count=document.getElementById('count');
let createButton=document.getElementById('createButton');
let cardSection=document.getElementById('cardSection');
let deleteAllButton=document.getElementById('deleteAllButton');
let buttonSearchMethod=document.getElementsByClassName('buttonSearchMethod');
let searchByTitle=document.getElementById('searchByTitle');
let searchByCategory=document.getElementById('searchByCategory');
let inputs=document.querySelectorAll('#productDetails input');
let searchBar=document.getElementById('searchBar');
// total function
function countTotal(){
    if(price.value && price.value!=0 && price.value!=''){
        let result=+price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML=result;
        total.style.backgroundColor='green';
    }else{
        total.innerHTML='';
        total.style.backgroundColor="rgb(220, 53, 69)"
    }
}
// crate item function
let productsArray;
function createItem(){
    if(localStorage.getItem('products')){
        productsArray=JSON.parse(localStorage.getItem('products'));
    }else{
        productsArray=[];
    }
    if (count.value){
        let details={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        category:category.value,
        count:count.value,
        }
        productsArray.push(details),
        localStorage.setItem('products',JSON.stringify(productsArray));
    }
}
// show items function
function showItems(){
    cardSection.innerHTML=''
    if(localStorage.getItem('products')){
        let products=JSON.parse(localStorage.getItem('products'));
        for (let i=0;i<products.length;i++){
            let product=products[i];
            let cardStand=document.createElement('div');
            cardStand.classList.add("cardStand" ,"col-12","col-md-6" ,"col-lg-4", "col-xl-3");
            cardStand.innerHTML=`
                <div class="card row my-2 mx-1 p-2">
                        <h5 class="col-12 text-center m-0">${product['title']}</h5>
                        <p class="col-12 text-center">${product['category']||'-------'} id:<span>${i}</span></p>
                        <p class="fs-4 col-12 text-center pb-2 m-0">Total:${product['total']}$</p>
                        <div class="totalShowDetails row mx-auto">
                                <p class=" col-6 text-center my-2">price:${product['price']}$</p>
                            <p class="col-6 text-center my-2">Taxes:${product['taxes']}$</p>
                            <p class="col-6 text-center my-2">ADS:${product['ads']}$</p>
                            <p class="col-6 text-center my-2">Dis:${product['discount']}$</p>
                        </div>
                        <p class="unitsLeftShow col-12 text-center mt-1 p-auto">${product['count']||'No'} Units Left </p>
                        <section class='buttonEditsSection row mx-auto'>
                            <button class="upgradeButton col-6">Upgrade</button>
                            <button class="sellButton col-6">Sell</button>
                            <button class="deleteItemButton col-12 mt-3">Delete All</button>
                            </section>
                            </div>
                            `;
            cardSection.appendChild(cardStand)
        }
        let sellButtons = document.querySelectorAll('.sellButton');
        sellButtons.forEach(btn => btn.addEventListener('click', () => {
        sell.call(btn); 
        showItems();
        }));

        let upgradeButtons = document.querySelectorAll('.upgradeButton');
        upgradeButtons.forEach(btn => btn.addEventListener('click', () => {
            upgrade.call(btn);
        }));

        let deleteButtons = document.querySelectorAll('.deleteItemButton');
        deleteButtons.forEach(btn => btn.addEventListener('click', () => {
            deleteItem.call(btn);
            showItems();
        }));
    }
}
// delete all items function
function deleteAll(){
    if(window.confirm('Delete all items press ok to continue')){
        localStorage.clear();
        productsArray=[];
        let deleteAlertSection=document.getElementById('deleteAlertSection');
        deleteAlertSection.innerHTML=`
            <div class="alert alert-danger">
                <p>All items are Deleted!</p>
            </div>
        `;
        setTimeout(function(){
            deleteAlertSection.innerHTML=''
        },5000)
    }
}
//sell function
function sell(){
    let products=JSON.parse(localStorage.getItem('products'));
    let parentNode=this.parentElement.parentElement;
    let idNode=parentNode.getElementsByTagName('p')[0];
    let id=idNode.getElementsByTagName('span')[0].innerHTML;
    let product=products[id];
    product['count']--;
    products.splice(id,1,product);
    localStorage.setItem('products',JSON.stringify(products));
}
// upgrade function
function upgrade(){
    let products=JSON.parse(localStorage.getItem('products'));
    let parentNode=this.parentElement.parentElement;
    let idNode=parentNode.getElementsByTagName('p')[0];
    let id=idNode.getElementsByTagName('span')[0].innerHTML;
    let product=products[id];
    let inputsNames=['title','price','taxes','ads','discount','category','count']
    for (let i=0;i<inputs.length;i++){
        inputs[i].value=product[inputsNames[i]];
    }
}
// Delete All function
function deleteItem(){
    let products=JSON.parse(localStorage.getItem('products'));
    let parentNode=this.parentElement.parentElement;
    let idNode=parentNode.getElementsByTagName('p')[0];
    let id=idNode.getElementsByTagName('span')[0].innerHTML;
    products.splice(id,1);
    localStorage.setItem('products',JSON.stringify(products))
}
// clear inputs
function clearInputs(){
    for(let i=0;i<inputs.length;i++){
        inputs[i].value='';
    }
}
// create completed alert function
function createAlert(){
    if(count.value){
    let createAlertSection=document.getElementById('createAlertSection');
    createAlertSection.innerHTML=`
        <div class="alert alert-success">
            <p>The item was created successfully!</p>
            <p>Title:<h3>${title.value}</h3></p>
            <p>Category:<h3>${category.value}</h3></p>
        </div>
    `;
    }
    setTimeout(function(){createAlertSection.innerHTML=''},5000)
}
// search method selected
function searchMethodSelected(){
    if(this.innerHTML=='Search By Title'){
        this.classList.add('buttonSelectedSearchMethod');
        if(this.nextElementSibling.classList.contains('buttonSelectedSearchMethod')){
            this.nextElementSibling.classList.remove('buttonSelectedSearchMethod')
        }
    }
    if(this.innerHTML=='Search by Category'){
        this.classList.add('buttonSelectedSearchMethod');
        if(this.previousElementSibling.classList.contains('buttonSelectedSearchMethod')){
            this.previousElementSibling.classList.remove('buttonSelectedSearchMethod')
        }
    }
}
// search function
function search(){
    let target;
    if (searchByTitle.classList.contains('buttonSelectedSearchMethod')){;
        target='title';
    }else if(searchByCategory.classList.contains('buttonSelectedSearchMethod')){
        target='category'
    }
    if (target &&localStorage.getItem('products')){
        let products=JSON.parse(localStorage.getItem('products'));
        let searchContent=searchBar.value.toLowerCase();
        for(let product=0;product<products.length;product++){
            let detailTarget=products[product][target];
            let searchContentLength=searchContent.length;
            let filter=detailTarget.slice(0,searchContentLength).toLowerCase();
            let card=cardSection.getElementsByClassName('card')[product];
            if (filter.includes(searchContent)){
                card.style.display='';
            }else{
                card.style.display='none';
            }
        }
    }
}
// calling functions
onload=showItems;
createButton.addEventListener('click',createItem);
for(let i=0;i<priceInputs.length;i++){
    priceInputs[i].addEventListener('keyup',countTotal);
}
createButton.addEventListener('click',showItems);
createButton.addEventListener('click',createAlert)
createButton.addEventListener('click',clearInputs);

deleteAllButton.addEventListener('click',deleteAll);
deleteAllButton.addEventListener('click',showItems);
for(let i=0;i<buttonSearchMethod.length;i++){
    buttonSearchMethod[i].addEventListener('click',searchMethodSelected)
}
searchBar.addEventListener('keyup',search)