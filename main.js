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
if (localStorage.getItem('products')){
    productsArray=JSON.parse(localStorage.getItem('products'))
}else{
    productsArray=[]
}
let createItem=function(){
    return function(){
        if (count.value){
            let details={
                title:title.value,
                price:price.value,
                taxes:taxes.value,
                ads:ads.value,
                discount:discount.value,
                total:total.innerHTML,
                count:count.value,
                category:category.value,
            }
            console.log(details)
            console.log(productsArray)
            productsArray.push(details);
            localStorage.setItem('products',JSON.stringify(productsArray));
        }
    }
}
createButton.addEventListener('click',createItem())