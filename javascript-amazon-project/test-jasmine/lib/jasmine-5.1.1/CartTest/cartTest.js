import { addToCart,cart } from "./Cart.js";

describe('test suite: add to cart',()=>{

    it('add new products to the cart',()=>{

        spyOn(localStorage,'setItem');// hun mseta3mela to fake set local storage ya3ni ne7na bil test ma badna really set local storage fa mnsta3mel hay to fake set local storage

        //the below spyOn function: heda mock ya3ni fake version of our lcoal storage in this example because we cannot controle what exist inside our local storage we can use mock instead to create exactly what we need in our local storage
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        


        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);// this function used to know how many times localStorage.setItem have been called, here we expected it to call once so we gave it value 1
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        
    });


     it('add a existing product to the cart',()=>{
        spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity:1,
                delivaryOptionId:'1'
            }]);
        });
        console.log(localStorage.getItem('cart'));
        
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        console.log(cart);
        
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);// this function used to know how many times localStorage.setItem have been called, here we expected it to call once so we gave it value 1
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
       
    });
})