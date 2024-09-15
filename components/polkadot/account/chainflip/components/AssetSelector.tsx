import React from "react";
import { ButtonGroup, Button } from "@nextui-org/react";

import { titleH3 } from "@/components/primitives";
import {
  Assets,
  AssetsNames,
} from "@/components/polkadot/account/chainflip/assets";

type TokenSelectorProps = {
  value: Assets;
  onChange: (asset: Assets) => void;
  action: string;
  disabled: boolean;
};

export const AssetSelector: React.FC<TokenSelectorProps> = ({
  value,
  onChange,

  disabled,
}) => {
  return (
    <>
      <h3 className={titleH3({ size: "sm" })}>Token</h3>
      <div className="flex gap-4">
        <ButtonGroup color="primary" variant="bordered">
          {[Assets.ETH, Assets.USDC].map((asset) => (
            <Button
              disabled={disabled}
              key={asset}
              // color={value === asset ? "gradient" : "default"}
              // className={buttonStyles({
              //   color: value === asset ? "primary" : "default",
              //   size: "sm",
              //   variant: "bordered",
              //   isDisabled: disabled,
              // })}
              variant={value === asset ? "solid" : "bordered"}
              onClick={() => onChange(asset)}
            >
              {AssetsNames[asset]}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </>
  );
};
