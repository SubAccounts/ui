import React from "react";

import { titleH3 } from "@/components/primitives";
import {
  Assets,
  AssetsNames,
} from "@/components/polkadot/account/chainflip/assets";
import { Tabs } from "@/components/ui/buttons/Tabs";

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
        <Tabs
          disabled={disabled}
          options={[
            [Assets.ETH.toString(), AssetsNames[Assets.ETH]],
            [Assets.USDC.toString(), AssetsNames[Assets.USDC]],
          ]}
          value={value.toString()}
          onChange={(e) => onChange(+e)}
        />
      </div>
    </>
  );
};
