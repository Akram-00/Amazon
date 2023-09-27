export const cart=[];

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