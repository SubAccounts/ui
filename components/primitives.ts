import { tv } from "tailwind-variants";

const colors = {
  violet: "from-[#FF1CF7] to-[#b249f8]",
  yellow: "from-[#FF705B] to-[#FFB457]",
  blue: "from-[#5EA2EF] to-[#0072F5]",
  cyan: "from-[#00b7fa] to-[#01cfea]",
  green: "from-[#6FEE8D] to-[#17c964]",
  // blue: "from-[#2196F3] to-[#03A9F4]",
  pink: "from-[#FF72E1] to-[#F54C7A]",
  foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
};

const colorsNames: (
  | "violet"
  | "yellow"
  | "blue"
  | "cyan"
  | "green"
  // | "blue"
  | "pink"
  | "foreground"
)[] = ["violet", "yellow", "blue", "cyan", "green", "pink", "foreground"];

export const title = tv({
  base: "tracking-tight inline font-semibold",
  variants: {
    color: colors,
    size: {
      sm: "text-3xl lg:text-4xl",
      md: "text-[2.3rem] lg:text-5xl leading-9",
      lg: "text-4xl lg:text-6xl",
    },
    fullWidth: {
      true: "w-full block",
    },
  },
  defaultVariants: {
    size: "md",
  },
  compoundVariants: [
    {
      color: colorsNames,
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
});

export const titleH2 = tv({
  base: "tracking-tight inline font-semibold text-3xl lg:text-4xl text-left w-full",
});

export const titleH3 = tv({
  base: "tracking-tight inline font-semibold",
  variants: {
    color: colors,
    size: {
      sm: "text-xl lg:text-2xl",
      md: "text-2xl lg:text-3xl",
      lg: "text-3xl lg:text-4xl",
    },
    fullWidth: {
      true: "w-full block",
    },
  },
  defaultVariants: {
    size: "md",
  },
  compoundVariants: [
    {
      color: colorsNames,
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
});

export const subtitle = tv({
  base: "w-full md:w-1/2 my-2 block max-w-full overflow-ellipsis",
  variants: {
    breakSpaces: {
      true: "whitespace-break-spaces",
    },
    color: {
      current: "text-default-600",
      inherit: "inherit",
    },
    fullWidth: {
      true: "!w-full",
    },
    truncate: {
      true: "truncate",
    },
    size: {
      lg: "text-lg lg:text-xl",
      md: "text-md lg:text-lg",
      sm: "text-sm lg:text-md",
    },
  },
  defaultVariants: {
    breakSpaces: false,
    fullWidth: true,
    size: "lg",
    truncate: false,
    color: "current",
  },
});
