export const priceWithDiscount = (price, discount) => {
  return price * ((100 - discount) / 100);
};

export const formatPrice = (price) => {
  return `${price.toFixed(2)}$`;
};

export const avatarName = (name) => {
  return name.split(' ').map(word => word[0].toUpperCase()).slice(0, 2).join('');
};
