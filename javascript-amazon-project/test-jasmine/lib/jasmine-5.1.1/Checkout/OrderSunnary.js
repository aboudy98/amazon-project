import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions,getDeliveryOption } from './deliveryOption.js'
import { cart } from '../CartTest/Cart.js';
import { products } from '../CartTest/products.js';




 function renderOrderSummery() {
    let cartSummaryHtml = '';
  
    
    cart.forEach((item) => {
        const productId = item.productId;
        let matchingProduct;
       
        

        products.forEach((product) => {
            if (product.id === productId) {
                matchingProduct = product;


            }
        })
        const deliveryOptionId = item.deliveryOptionId;
        let deliveryOption;
        deliveryOptions.forEach((options) => {
            if (options.id === deliveryOptionId) {
                deliveryOption = options;
            }

        })
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd , MMMM D');
        console.log("Hello"+cartSummaryHtml);
        
        cartSummaryHtml +=
            `
    <div class="cart-item-container
    js-item-container 
    js-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${(matchingProduct.priceCents / 100).toFixed(2)}
                </div>
                <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                  <span>
                    Quantity: <span class="quantity-label">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link"
                  data-product-id="${matchingProduct.id} js-delete-link-${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionHtml(matchingProduct, item)}
                
              </div>
            </div>
          </div>
    `


    });
    function deliveryOptionHtml(matchingProduct, item) {
        let html = '';
        deliveryOptions.forEach((option) => {
            const today = dayjs();
            const deliveryDate = today.add(option.deliveryDays, 'days');
            const dateString = deliveryDate.format('dddd , MMMM D');
            const priceString = option.priceCents === 0 ? 'Free'
                : `$${option.priceCents}`;
            const isChecked = option.id === item.deliveryOptionId;

            html +=
                `
    <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" 
    data-delivery-option-id = "${option.id}">

                  <input type="radio"
                  ${isChecked ? 'checked' : ''}
                    class="delivery-option-input "
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} - Shipping
                    </div>
                  </div>
                </div>
                
    `
        })
        return html;
    }
    console.log(cartSummaryHtml);
    

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;

    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', () => {

            const productId = link.dataset.productId;
            removeFromCart(productId);
            const container = document.querySelector(`.js-item-container-${productId}`);
            container.remove();
            renderPaymentSummery();


        })
    })

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const { productId, deliveryOptionId } = element.dataset;// hay it mean get productId ftom element.dataset.productId and get deliveryOptionId from element.dataset.deliveryOptionId
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummery();
            renderPaymentSummery();

        })
    })
}

renderOrderSummery();


/////////////////////////chechout pagr...............////////////////

function renderPaymentSummery() {
    let productPriceCents = 0;
    let matchingItemsCheckout ;
    let shippingPriceCents = 0;
    products.forEach((product) => {

        cart.forEach((item) => {
            if (item.productId === product.id) {
                matchingItemsCheckout = product;
                productPriceCents += matchingItemsCheckout.priceCents * item.quantity;
                const deliveryOption = getDeliveryOption(item.deliveryOptionId);
                shippingPriceCents = shippingPriceCents+deliveryOption.priceCents;
                
                
            
            }
        })

    })

    const totalBeforeTax = shippingPriceCents + productPriceCents;
    const taxCents = totalBeforeTax * 0.1;
    const total = taxCents + totalBeforeTax;

    const paymentSummeryHtml = `
     <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (3):</div>
          <div class="payment-summary-money">$${(productPriceCents/100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${(shippingPriceCents/100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${(totalBeforeTax/100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${(taxCents/100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${(total/100).toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>
    `
   
   document.querySelector('.js-payment-summary').innerHTML = paymentSummeryHtml;




}
renderPaymentSummery();


