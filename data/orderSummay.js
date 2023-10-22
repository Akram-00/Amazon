

export function itemPrices(cart,products){
    let total = 0;

    // Loop through the items in the cart
    for (const cartItem of cart) {
        // Find the product with the same ID in the products array
        const product = products.find((p) => p.id === cartItem.productId);

        // If a matching product is found, add its price to the total
        if (product) {
            total += product.priceCents * cartItem.quantity;
        }
    }

    // Return the total price
    return total;
}

export function shippingHandling(selectedDate){
    let today = new Date();
    let timediff = selectedDate - today;
    let daysCount = Math.floor(timediff/1000*60*60*24); // no of days
    const price = 0;
    // option - 1 ( after 1 day )   selectedDate - today = 1 price = 999
    if(daysCount === 1){
        price += 999;
    }
    // option - 2 ( after 4 days)   selectedDate - today = 4 price = 499
    else if(daysCount === 4){
        price +=499;
    }
    // option - 3 ( after 9 days)   selectedDate - today = 5 price = 0
    else if(daysCount === 9){
        price +=0;
    }
    return price;
}

