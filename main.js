let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let createButton=document.getElementById('createButton');
let focusOn=document.getElementById('focus');
let deviceInfo=document.getElementsByClassName('deviceInfo');
let priceInputs=document.getElementsByClassName('price');
let deleteAllButton=document.getElementById('deleteAll');
let tbody=document.getElementById('tbody');
let searchByTitleButton=document.getElementById('searchByTitle');
let searchByCategoryButton=document.getElementById('searchByCategory');
let searchBar=document.getElementById('searchBar');
// light on/off input function
let lightOn=function(){
    return function(){
        focusOn.style.display='block';
        focusOn.innerHTML=this.placeholder;
        this.parentElement.appendChild(focusOn);
        this.placeholder='';
        this.style.cssText=`
        transform:scale(1.05);
        background-color:wheat`
    }
}
let lightOff=function(){
    return function(){
        focusOn.style.display='none';
        this.placeholder=focusOn.innerHTML;
        this.style.cssText=`transform:scale(1)`
    }
}
for (let i=0;i<deviceInfo.length;i++){
    deviceInfo[i].addEventListener('focus',lightOn())
    deviceInfo[i].addEventListener('blur',lightOff())
}
// total counting function
let totalCount=function(){
    return function(){
        if(price.value!=null &price.value!=''){
            let theTotal=Number(price.value)+Number(taxes.value)+Number(ads.value)-Number(discount.value);
            total.innerHTML=theTotal;
            total.style.backgroundColor='green';
            return theTotal;
        }else{
            total.innerHTML='';
            total.style.backgroundColor='red'
        }
    }
}
for (let i=0;i<priceInputs.length;i++){
    priceInputs[i].addEventListener('keyup',totalCount())
}
// create item function
let productsArray;
let createItem=function(){
    return function(){
        if (localStorage.getItem('products')){
            productsArray=JSON.parse(localStorage.getItem('products'))
        }else{
            productsArray=[]
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
            productsArray.push(details);
            localStorage.setItem('products',JSON.stringify(productsArray));
        }
    }
}
// show items function
let showItem=function(){
    return function(){
        tbody.innerHTML='';
        if (localStorage.getItem('products')){
            let products=JSON.parse(localStorage.getItem('products'));
            for (let i=0;i<products.length;i++){
                let product=products[i];
                let key=Object.keys(product);
                for (let j=0;j<product['count'];j++){
                    let tr=document.createElement('tr');
                    tbody.appendChild(tr);
                    let td=document.createElement('td');
                    tr.appendChild(td);
                    td.innerText=i;
                    for (let k=0;k<key.length-1;k++){
                        let td=document.createElement('td');
                        tr.appendChild(td);
                        let productKey=key[k]
                        td.innerHTML=product[productKey]
                    }
                    for (let o=0;o<3;o++){
                        let td=document.createElement('td');
                        tr.appendChild(td);
                        if(o==0){
                            let upgradeItemButton=document.createElement('button');
                            td.appendChild(upgradeItemButton);
                            upgradeItemButton.innerHTML='Upgrade';
                            upgradeItemButton.classList.add('upgrade');
                            upgradeItemButton.addEventListener('click',function(){
                                this.style.backgroundColor='#50c878';
                                this.style.letterSpacing='2px';
                                }
                            )
                            upgradeItemButton.addEventListener('click',upgradeItem());
                            upgradeItemButton.addEventListener('click',totalCount())
                            upgradeItemButton.addEventListener('click',deleteItem());
                            upgradeItemButton.addEventListener('click',showItem());


                        }
                        if (o==1){
                            let deleteItemButton=document.createElement('button');
                            td.appendChild(deleteItemButton);
                            deleteItemButton.innerHTML='Delete';
                            deleteItemButton.classList.add('delete');
                            deleteItemButton.addEventListener('click',deleteItem());
                            deleteItemButton.addEventListener('click',showItem());

                        }
                        if(o==2){
                            let deleteIdButton=document.createElement('button');
                            td.appendChild(deleteIdButton);
                            deleteIdButton.innerHTML='DeleteId';
                            deleteIdButton.classList.add('delete');
                            deleteIdButton.addEventListener('click',deleteId());
                            deleteIdButton.addEventListener('click',showItem())
                        }
                    }    
                }
            }
        }
    }
}
// clean inputs function
let cleanInputs=function(){
    return function(){
        for (let i=0;i<deviceInfo.length;i++){
            deviceInfo[i].value=''
        }
        total.innerHTML='';

    }
}
// delete all items function
let deleteAll=function(){
    return function(){
        localStorage.clear();
        productsArray=[];
    }
}
// delete Item function
let deleteItem=function(){
    return function(){
        let parentNode=this.parentElement.parentElement;
        let id=parentNode.getElementsByTagName('td')[0].innerHTML;
        let products=JSON.parse(localStorage.getItem('products'));
        let product=products[id];
        product['count']--;
        products[id]=product;
        if(product['count']==0){
            products.splice(id,1)
        }
        localStorage.setItem('products',JSON.stringify(products));
    }
}
// delete id 
let deleteId=function(){
    return function(){
        let parentNode=this.parentElement.parentElement;
        let id=parentNode.getElementsByTagName('td')[0].innerHTML;
        let products=JSON.parse(localStorage.getItem('products'));
        products.splice(id,1);
        localStorage.setItem('products',JSON.stringify(products));
        productsArray=[]
    }
}
//upgrade function
let upgradeItem=function(){
    return function(){
        let parentNode=this.parentElement.parentElement;
        let id=parentNode.getElementsByTagName('td')[0].innerHTML;
        let products=JSON.parse(localStorage.getItem('products'));
        let product=products[id];
        let key=Object.keys(product);
        key.splice(5,1);
        for (let i=0;i<deviceInfo.length;i++){
            let detail=key[i];
            deviceInfo[i].value=product[detail];
        }
    }
}
// search selected method function
let searchMethod=function(){
    return function(){
        if (this.innerHTML=="Search By Title"){
            this.classList.add('searchSelectedMethod');
            if(this.nextElementSibling.classList.contains('searchSelectedMethod')){
                this.nextElementSibling.classList.remove('searchSelectedMethod');
            }
        }
        if (this.innerHTML=="Search By Category"){
            this.classList.add('searchSelectedMethod');
            if(this.previousElementSibling.classList.contains('searchSelectedMethod')){
                this.previousElementSibling.classList.remove('searchSelectedMethod');
            }
        }
    }
}
// search function
let search=function(){
    return function(){
        let shift=0;
        if (searchByTitleButton.classList.contains('searchSelectedMethod')){
            shift+=1;
        }else if(searchByCategoryButton.classList.contains('searchSelectedMethod')){
            shift+=7;
        }
        let tr=document.getElementsByTagName('tr');
        let filter=searchBar.value.toLowerCase();
        for (let i=1;i<tr.length;i++){
            let row=tr[i];
            let cube=row.getElementsByTagName('td')[shift];
            let cubeContent=cube.textContent.toLowerCase();
            if(cubeContent.includes(filter)){
                row.style.display=''
            }else{
                row.style.display='none'
            }
        }
    }
}
// activation
onload=showItem()
createButton.addEventListener('click',createItem());
createButton.addEventListener('click',showItem());
createButton.addEventListener('click',cleanInputs());
createButton.addEventListener('click',totalCount())
deleteAllButton.addEventListener('click',deleteAll());
deleteAllButton.addEventListener('click',showItem());
searchByTitleButton.addEventListener('click',searchMethod());
searchByCategory.addEventListener('click',searchMethod());
searchBar.addEventListener('keyup',search())