import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type EncodedSubAccount = {
  owner: string;
  encodedData: string;
  address: string;
  network: string;
};
