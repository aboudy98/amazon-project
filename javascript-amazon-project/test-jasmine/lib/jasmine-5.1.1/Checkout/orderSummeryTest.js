
// lerror le 3am yetla3 hun 5asu bil importing fe sha8let 3emela 8alat bil import 

describe('test suite: render order summary Integration test',()=>{
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

    // for example if you want to run a function before each of our test tou should use beforeEach hook
    beforeEach(() =>{
        // to test how the order summary work first you need to create div with the name of js-order-summary in test.html
        document.querySelector('.js-test-container').innerHTML=`
        <div class="js-order-summary"></div>
        `;
            spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity:1,
                delivaryOptionId:'1'
            },
            {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity:1,
                delivaryOptionId:'1'
            }
        ]);
        
        });
        console.log("my local storage cart"+localStorage.getItem('cart'))
        
        
        renderOrderSummery();

    })
// we have also afterEach hook that run code after each test


    it('display the cart',()=>{
        // the code in before each run before this test ya3ni 3teber enu lcode bel beforeEach mawjoud hun
        
        // now you need to select all element in the class name js-item-continer wich is located orderSunnary.js in html element added by the java script
        expect(
            document.querySelectorAll('.js-item-container').length
        ).toEqual(2);

        // to check if the quantity displayed in the page is correct we write the below code:
       expect( document.querySelector(`.js-product-quantity-${productId1}"`).innerText).toContain('Quantity: 2');// .toContain check if the js-product-quantity-prroductId1 contain the string Quantity: 2

       // to remove the html after the test 
       document.querySelector('.js-test-container').innerHTML=''
    });

    // this test to make sure the delete button behave correctly
    it('remove product from the cart',()=>{

       // the code in before each run before this test ya3ni 3teber enu lcode bel beforeEach mawjoud hun

        document.querySelector(`.js-delete-link-${productId1}`).click();// this will make us to click the button
        // the above code will cause an error because when we generate htm element on the ordersummary we put this html in a div with the class name js-payment-summary and this element is not exist in our test so to fix it we need to add this element to our test so we need to create js-payment-summary div in romve button link test
          expect(
            document.querySelectorAll(`.js-item-container-${productId1}`).length
        ).toEqual(1);

        expect(
            document.querySelectorAll(`.js-item-container-${'15b6fc6f-327a-4ec4-896f-486349e85a3d'}`)
        ).not.toEqual(null);// this to check if the second product wich we didnot delete it if it is still exist

         // to remove the html after the test 
       document.querySelector('.js-test-container').innerHTML=''
});
});