export const useCurrencyFormatter = (number: number) => {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    roundingMode: "trunc",
  }).format(number);

  return formatter;
};
