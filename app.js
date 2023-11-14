// async function getData(){
//    let cards=document.querySelectorAll(".product-box")
//    let res = await fetch('https://dummyjson.com/products')
//    let data = await res.json()

//    console.log(data.products)
//    cards.forEach((ele,i)=>{
//      ele.getElementsByTagName("img")[0].src = data.products[i].images[0];
//      ele.getElementsByTagName("h2")[0].innerHTML = data.products[i].title;
//      ele.getElementsByTagName("span")[0].innerHTML = "Price:$"+data.products[i].price;


//    })
// }

// getData()

// let dynamic_count = document.querySelector("dynamic-count")

// function addtocart(){
//    console.log(first)
// }


const productEl = document.querySelector(".shop-content")
const cartItemsEl = document.querySelector(".listCart")
const subtotalEl = document.querySelector(".dynamic_count")

// let cart =[]
async function renderProducts(){
   // let cards=document.querySelectorAll(".product-box")
   let res = await fetch('https://dummyjson.com/products')
   let data = await res.json()
  

   data.products.forEach((pro)=>{
      productEl.innerHTML +=`
      <div class="product-box">
      <img src="${pro.images[0]}" alt="" class="product-img" />
                        <div class="seprate-div">
                            <h2 class="product-title">${pro.title}</h2>
                            <div class="rup-cart">
                                <span class="product-price">${pro.price}</span>
                                <button onclick="addtocart(${pro.id})">Add to cart</button>
                            </div>
                        </div>
                        </div>  
      `
   })
   cart(data.products)
}
renderProducts()



let  cart=[]
async function addtocart(id){
   let res = await fetch('https://dummyjson.com/products')
   let data = await res.json()

   if(cart.some((item)=>item.id === id)){
      // alert("Product already exist")
      changeNoOfUnit("plus",id)
   }
   else{

      const itemId=data.products.find((el)=>el.id === id)
      cart.push({...itemId,numberOfUnit:1})
   }
   updateCart()
}


function updateCart(){
   renderCartItems()
   renderSubTotal()
}

function renderSubTotal(){
   let totalPrice=0,totalItem=0
   cart.forEach((item)=>{
      totalPrice +=item.price *  item.numberOfUnit
      totalItem +=item.numberOfUnit
   })

   subtotalEl.innerHTML =`
   Item (${totalItem} items) is added to cart:$${totalPrice.toFixed(2)}
   `
}


function renderCartItems(){
   console.log(cart)
   cartItemsEl.innerHTML=""
   cart.forEach((item)=>{
            cartItemsEl.innerHTML +=`
    
      <div class="item">
          <div class="image" onclick="removeItemFromCart(${item.id})">
              <img src="${item.images[0]}" />
          </div>
          <div class="name">${item.brand}</div>
          <div class="totalPrice">${item.price}</div>
          <div class="quantity">
              <span class="minus" onclick="changeNoOfUnit('minus',${item.id})">-</span>
              <span>${item.numberOfUnit}</span>
              <span class="plus" onclick="changeNoOfUnit('plus',${item.id})">></span>

          </div>
      </div>
  </div>
      `
   })
}

function changeNoOfUnit(action, id){
   cart = cart.map((item)=>{
      let numberOfUnit = item.numberOfUnit

      if(item.id === id){
         if(action === "minus" && numberOfUnit>1){
            numberOfUnit--
         }else if(action==="plus"){
            numberOfUnit++
         }
      }
      return { ...item,numberOfUnit}
   })
   updateCart()
}


function removeItemFromCart(id){
   console.log(id)
  cart= cart.filter((item)=>item.id !== id)
  updateCart()
}
