



// eza masalan 3na cart lal customer l 3ade w cart lal bussniss customer lbyeshteru bkameyet , feena nktub function ya3mlena two seprate cart as below code
export function Cart(localStorageKey){
     const cart = {
    cartItems:undefined,
    updateDeliveryOption:function(productId, deliveryOptionId){
    let matchingItem;
    this.cartItems.forEach((cartItem)=>{
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }

    });
    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToLocalStorge();

}, loadFromStorage:function(){
  //this here means cart (object name)  
    this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

if(!this.cartItems){
    this.cartItems=[{
         productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
         quantity:1,
         deliveryOptionId: '3'
    }]
}
},
 saveToLocalStorge:function() {
    localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
},
removeFromCart:function(productId){
    const newCart = [];

    this.cartItems.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    })

   

    this.cartItems.cart = newCart;
    saveToLocalStorge();
}



}
return cart;
}
const cart = Cart('cart-oop');
const bussnissCart = cart('bussniss-cart');
cart.loadFromStorage();
console.log(cart);







