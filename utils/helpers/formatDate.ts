import format from "date-fns/format";

export const formatDate = (
  base?: string | null | number | Date,
  options: {
    defaultValue?: string;
    format: string;
  } = {
    defaultValue: "n/a",
    format: "dd/MM/yyyy HH:mm:ss",
  },
): string => {
  if (!base) {
    return options.defaultValue || "";
  }

  const date = new Date(base);

  return format(date, options.format);
};
