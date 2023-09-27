export let cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
},
{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1
},
{
    productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
    quantity:2
}
];

export function addToCart(productId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem; // does nothing replaces the same element
        }
    });

    if (matchingItem) {//  a sameElement then just increase the quantity
        matchingItem.quantity += 1;
    } else {
        cart.push({// new element then add it to the cart
            productId: productId,
            quantity: 1
        });
    }
}

export function removeFromCart(productId){
    const newCart=[];
    cart.forEach((cartItem)=>{
        if(cartItem.productId!==productId){
            newCart.push(cartItem);
        }
    });

    cart=newCart;
}



