export function numberFormat(
  value: number | string | bigint,
  options: {
    minimumFractionDigits: number;
    maximumFractionDigits: number;
  } = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
): string {
  return new Intl.NumberFormat("en-EN", {
    minimumFractionDigits: options.minimumFractionDigits,
    maximumFractionDigits: options.maximumFractionDigits,
  })
    .format(typeof value === "string" ? +value : value)
    .replaceAll(",", " ");
}
