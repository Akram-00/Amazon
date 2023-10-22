function formatDate(date) {
    return new Date(date).toDateString();
}

// changing the dates according to today

export function deliveryOptionDate(days) {
    const today = new Date();

    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + days);

    let dateString = deliveryDate.toDateString();

    return dateString;
}

