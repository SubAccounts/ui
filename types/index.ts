import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type EncodedSubWallet = {
  owner: string;
  encodedData: string;
  address: string;
  network: string;
};
