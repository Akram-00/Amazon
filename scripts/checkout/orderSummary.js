import { cart, removeFromCart, updateQuantity, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDeliveryOptions } from "../../data/deliveryOptions.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { renderPayementSummary } from "./paymentSummary.js";
import isSatSun from "../utils/isweekEnd.js";


export function renderOrderSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {

    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOptions(deliveryOptionId)

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const datestring = deliveryDate.format('dddd, MMMM D');
    console.log(isSatSun(today))
    cartSummaryHTML += `
     <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date js-delivery-date">
                Delivery date : ${datestring}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}" >${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity"
                  data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                  <input type="number" class="quantity-input js-quantity-input-${matchingProduct.id}" value="${cartItem.quantity}">
                  <span class="save-input-link link-primary  js-save-input-link" data-product-id="${matchingProduct.id}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link"
                  data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
    `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = ``;


    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      );
      const datestring = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId

      html += `<div class="delivery-option js-delivery-option"
      data-product-id = "${matchingProduct.id}"
      data-delivery-option-id = "${deliveryOption.id}">
                  <input type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input">
                  <div>
                    <div class="delivery-option-date">
                     ${datestring}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
                </div>`
    });
    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
  updateCartQuantity();

  document.querySelectorAll('.js-delete-quantity-link').forEach((link) => {
    link.addEventListener('click', function () {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      
      renderOrderSummary();
      renderPayementSummary();
      updateCartQuantity();

    });
  });



  function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-checkout-header-middle-section').innerHTML = (cartQuantity === 0) ? ` ` : `${cartQuantity} items`;
  }
  document.querySelectorAll('.js-update-quantity').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');

    });
  });

  document.querySelectorAll('.js-save-input-link').forEach((link) => {
    link.addEventListener('click', () => {

      const productId = link.dataset.productId;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');

      const inputQuantity = document.querySelector(`.js-quantity-input-${productId}`).value;

      const newQuantity = Number(inputQuantity);

      if (newQuantity > 0 && newQuantity < 1000) {
        updateQuantity(productId, newQuantity);
        const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`)

        quantityLabel.innerHTML = newQuantity;
        updateCartQuantity();
      } else {
        alert("Invalid no of quantities");
      }

    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      //const productId = element.dataset.productId;
      //const deliveryOptionId = element.dataset.deliveryOptionId
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPayementSummary();
    })
  })
}

