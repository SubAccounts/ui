import React from "react";
import { Image } from "@nextui-org/react";

import { SizedContainer } from "@/components/SizedContainer";

function hexToHSL(hex: string): { h: number; s: number; l: number } {
  // HEX to RGB
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  // min max RGB
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max === min) {
    // gray
  } else {
    let d = max - min;

    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s, l: l };
}

const hue2rgb = (p: number, q: number, t: number): number => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 3) return q;
  if (t < 1 / 2) return p + (q - p) * 6 * (2 / 3 - t);

  return p;
};

const toHex = (x: number): string => {
  const hex = Math.round(x * 255).toString(16);

  return hex.length == 1 ? "0" + hex : hex;
};

function hslToHex(h: number, s: number, l: number): string {
  // HSL to RGB
  h /= 360;

  let r, g, b;

  if (s == 0) {
    r = g = b = l; // gray
  } else {
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function getComplementaryColor(hex: string): string {
  // HEX to HSL
  const hsl = hexToHSL(hex);

  // Hue rotate 180 deg
  hsl.h = (hsl.h + 180) % 360;

  // HSL to HEX
  return hslToHex(hsl.h, hsl.s, hsl.l);
}

function textToColor(text: string) {
  let hash = 0;

  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";

  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;

    color += ("00" + value.toString(16)).substr(-2);
  }

  return color;
}

function generateShapeFromString(
  ctx: CanvasRenderingContext2D,
  text: string,
  width: number,
  height: number,
  color: string,
) {
  const shapeTypes = ["circle", "square", "triangle"];
  const shapeIndex = text.charCodeAt(3) % shapeTypes.length;
  const shape = shapeTypes[shapeIndex];

  const size = 200 + (text.charCodeAt(5) % 100);

  ctx.fillStyle = getComplementaryColor(color);

  switch (shape) {
    case "circle":
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, size / 2, 0, 2 * Math.PI);
      ctx.fill();
      break;
    case "square":
      ctx.fillRect((width - size) / 2, (height - size) / 2, size, size);
      break;
    case "triangle":
      ctx.beginPath();
      ctx.moveTo(width / 2, (height - size) / 2);
      ctx.lineTo((width - size) / 2, (height + size) / 2);
      ctx.lineTo((width + size) / 2, (height + size) / 2);
      ctx.closePath();
      ctx.fill();
      break;
  }
}

function generateImage(account: string, ratio: string) {
  const _ratio = ratio.split("/");
  const width = 1000;
  const height = (width / +_ratio[0]) * +_ratio[1];
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const repeatedString = account.repeat(10);
    const columns = 10;
    const rows = 5;
    const cellWidth = width / columns;
    const cellHeight = height / rows;

    canvas.width = columns * cellWidth;
    canvas.height = rows * cellHeight;

    let charIndex = 0;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        // Take 6 symbols
        const subStr =
          repeatedString[charIndex] +
          repeatedString[charIndex + 1] +
          repeatedString[charIndex + 2] +
          repeatedString[charIndex + 3] +
          repeatedString[charIndex + 4] +
          repeatedString[charIndex + 5];

        ctx.fillStyle = textToColor(subStr);

        ctx.fillRect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);

        charIndex = (charIndex + 6) % repeatedString.length;
      }
    }

    generateShapeFromString(ctx, account, width, height, textToColor(account));

    return canvas.toDataURL("image/png");
  }

  return "";
}

type AccountImageProps = {
  account: string;
  ratio: string;
};

export const AccountImage: React.FC<AccountImageProps> = ({
  account,
  ratio,
}) => {
  const [imageString, set_imageString] = React.useState<string>("");

  React.useEffect(() => {
    if (account) {
      set_imageString(generateImage(account, ratio));
    }
  }, [account]);

  return (
    <SizedContainer ratio={ratio}>
      <Image
        classNames={{
          img: "w-full object-cover",
          wrapper: "overflow-hidden",
        }}
        radius="lg"
        shadow="sm"
        src={imageString}
        width="100%"
      />
    </SizedContainer>
  );
};
