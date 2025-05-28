let cart=JSON.parse(localStorage.getItem('cart'));
if(!cart){
    cart=[{
         productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
         quantity:1,
         deliveryOptionId: '3'
    }]
}

function saveToLocalStorge(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(productId){
    const newCart = [];

    cart.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    })

   

    cart = newCart;
    saveToLocalStorge();
}

function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;
    cart.forEach((cartItem)=>{
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }

    });
    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToLocalStorge();

}