export const priceFormat = (price : number | string) => {
    return Intl.NumberFormat("en-NP", {style: "currency",currency: "Npr",}).format(Number(price));
}