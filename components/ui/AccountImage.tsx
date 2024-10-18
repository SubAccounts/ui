import React from "react";
import { Image } from "@nextui-org/react";

import { SizedContainer } from "@/components/ui/SizedContainer";

const palette = [
  // Blue
  "#E3F2FD",
  "#BBDEFB",
  "#90CAF9",
  "#64B5F6",
  "#42A5F5",
  "#2196F3",
  "#1E88E5",
  "#1976D2",
  "#1565C0",
  "#0D47A1",
  // Green
  "#E8F5E9",
  "#C8E6C9",
  "#A5D6A7",
  "#81C784",
  "#66BB6A",
  "#4CAF50",
  "#43A047",
  "#388E3C",
  "#2E7D32",
  "#1B5E20",
  // Red
  "#FFEBEE",
  "#FFCDD2",
  "#EF9A9A",
  "#E57373",
  "#EF5350",
  "#F44336",
  "#E53935",
  "#D32F2F",
  "#C62828",
  "#B71C1C",
  // Yellow
  "#FFFDE7",
  "#FFF9C4",
  "#FFF59D",
  "#FFF176",
  "#FFEE58",
  "#FFEB3B",
  "#FDD835",
  "#FBC02D",
  "#F9A825",
  "#F57F17",
  // Purple
  "#F3E5F5",
  "#E1BEE7",
  "#CE93D8",
  "#BA68C8",
  "#AB47BC",
  "#9C27B0",
  "#8E24AA",
  "#7B1FA2",
  "#6A1B9A",
  "#4A148C",
];

const charMapping = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

const colorMap: Record<string, string> = {};

charMapping.forEach((char, index) => {
  colorMap[char] = palette[index % palette.length];
});

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

  ctx.fillStyle = color;

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
    const repeatedString = account.repeat(10).toUpperCase();
    const columns = 10;
    const rows = 5;
    const cellWidth = width / columns;
    const cellHeight = height / rows;

    canvas.width = columns * cellWidth;
    canvas.height = rows * cellHeight;

    let charIndex = 0;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        charIndex++;

        ctx.fillStyle = colorMap[repeatedString[charIndex]];

        ctx.fillRect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
      }
    }

    generateShapeFromString(
      ctx,
      account,
      width,
      height,
      colorMap[repeatedString[2]],
    );

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
      />
    </SizedContainer>
  );
};
