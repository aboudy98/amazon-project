

export const cart = JSON.parse(localStorage.getItem('cart')) || [];


export function addToCart(productId){
    

    let matchingItem;
    
    cart.forEach((item)=>{
        if(productId === item.productId){
            matchingItem = item;
        }

    })
    if(matchingItem){
        matchingItem.quantity +=1
        console.log(matchingItem);
        
        
    }else{
        cart.push({
            productId,
            quantity:1,
            deliveryOptionId:1
        })
        
    }
    
    
    localStorage.setItem('cart',JSON.stringify(cart));
}