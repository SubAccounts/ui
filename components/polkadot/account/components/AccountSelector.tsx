import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

import { PolkadotAccountBalance } from "@/components/polkadot/PolkadotAccountBalance";

type AccountSelectorProps = {
  disabled: boolean;
  value: string;
  onChange: (value: string) => void;
  disabledKeys: string[];
  options: {
    address: string;
  }[];
};

export const AccountSelector: React.FC<AccountSelectorProps> = ({
  disabled,
  value,
  onChange,
  disabledKeys,
  options,
}) => {
  return (
    <Select
      disabled={disabled}
      disabledKeys={disabledKeys}
      items={options}
      label="Destination account"
      placeholder="Select account"
      renderValue={(selectedItems) => {
        return selectedItems.map((item) =>
          item?.data ? (
            <div key={item.key} className="flex justify-between">
              <span>{item.data.address}</span>
              <span>
                <PolkadotAccountBalance account={item.data.address} />
              </span>
            </div>
          ) : null,
        );
      }}
      value={value}
      variant="bordered"
      onChange={(e) => onChange(e.target.value)}
    >
      {(account) => (
        <SelectItem key={account.address} value={account.address}>
          <div className="flex justify-between">
            <span>{account.address}</span>
            <span>
              <PolkadotAccountBalance account={account.address} />
            </span>
          </div>
        </SelectItem>
      )}
    </Select>
  );
};
