
let productHtml = '';
products.forEach((item)=>{
  console.log(item.id);
  
    productHtml+=`  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${item.image}g">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${item.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${item.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${item.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${item.priceCents/100}
          </div>

          <div class="product-quantity-container">
            <select class='js-select-value-${item.id}'>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${item.id}">
            
          </div>

          <button data-product-id="${item.id}"
          class="add-to-cart-button button-primary js-add-to-cart">
            Add to Cart
          </button>
        </div>
`




})

document.querySelector('.js-products-div').innerHTML = productHtml;

document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
    button.addEventListener('click',()=>{
        const productId = button.dataset.productId;//productId come from data-product-id in html
        const quantityPerProduct = document.querySelector(`.js-select-value-${productId}`).value;
        const addToCartHtml = '<img src="images/icons/checkmark.png">Added';
        document.querySelector(`.js-added-to-cart-${productId}`).innerHTML=addToCartHtml;

        setTimeout(()=>{
          document.querySelector(`.js-added-to-cart-${productId}`).innerHTML='';

        },3000)
        
        let matchingItem;
       cart.forEach((item)=>{
        if(item.productId === productId){
          matchingItem = item;

        }
       })

       if(matchingItem){
        matchingItem.quantity+=Number(quantityPerProduct); // the quantity of this item in cart increase because as we know two object point to the same reference if change value in one object it will automatically change in the second object and here we have object item = object cart
        

       }else{
        cart.push({
          productId,
          quantity:Number(quantityPerProduct)
        })
       }
       let cartQuantity=0;
       cart.forEach((item)=>{
        cartQuantity+=item.quantity;

       })
       document.querySelector('.js-quantity').textContent = `${cartQuantity}`
       
       
       saveToLocalStorge();
       
       
        
    });
    
    

    
})

