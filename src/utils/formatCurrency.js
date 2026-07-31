// src/utils/formatCurrency.js
export const formatNaira = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0, // Set to 2 if you want to include kobo (.00)
  }).format(amount);
};