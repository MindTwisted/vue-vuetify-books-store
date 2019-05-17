export const priceWithDiscount = (price, discount) => {
    return price * ((100 - discount) / 100);
};

export const formatPrice = (price) => {
    return `${price.toFixed(2)}$`;
};
