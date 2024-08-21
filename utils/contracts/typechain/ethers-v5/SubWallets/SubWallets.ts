/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export declare namespace SubWallets {
  export type SubWalletStruct = {
    owner: string;
    encryptedAccount: string;
    network: string;
    accountAddress: string;
  };

  export type SubWalletStructOutput = [string, string, string, string] & {
    owner: string;
    encryptedAccount: string;
    network: string;
    accountAddress: string;
  };
}

export interface SubWalletsInterface extends utils.Interface {
  functions: {
    "getAccounts()": FunctionFragment;
    "getAccountsByAddress(address)": FunctionFragment;
    "storeEncryptedAccount(string,string,string)": FunctionFragment;
    "subWallets(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getAccounts"
      | "getAccountsByAddress"
      | "storeEncryptedAccount"
      | "subWallets"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getAccounts",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getAccountsByAddress",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "storeEncryptedAccount",
    values: [string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "subWallets",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "getAccounts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAccountsByAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "storeEncryptedAccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "subWallets", data: BytesLike): Result;

  events: {
    "SubWalletStored(address,string,string,string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "SubWalletStored"): EventFragment;
}

export interface SubWalletStoredEventObject {
  owner: string;
  encryptedAccount: string;
  network: string;
  accountAddress: string;
}
export type SubWalletStoredEvent = TypedEvent<
  [string, string, string, string],
  SubWalletStoredEventObject
>;

export type SubWalletStoredEventFilter = TypedEventFilter<SubWalletStoredEvent>;

export interface SubWallets extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SubWalletsInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getAccounts(
      overrides?: CallOverrides
    ): Promise<[SubWallets.SubWalletStructOutput[]]>;

    getAccountsByAddress(
      _owner: string,
      overrides?: CallOverrides
    ): Promise<[SubWallets.SubWalletStructOutput[]]>;

    storeEncryptedAccount(
      _encryptedAccount: string,
      _network: string,
      _accountAddress: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    subWallets(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, string] & {
        owner: string;
        encryptedAccount: string;
        network: string;
        accountAddress: string;
      }
    >;
  };

  getAccounts(
    overrides?: CallOverrides
  ): Promise<SubWallets.SubWalletStructOutput[]>;

  getAccountsByAddress(
    _owner: string,
    overrides?: CallOverrides
  ): Promise<SubWallets.SubWalletStructOutput[]>;

  storeEncryptedAccount(
    _encryptedAccount: string,
    _network: string,
    _accountAddress: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  subWallets(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, string, string, string] & {
      owner: string;
      encryptedAccount: string;
      network: string;
      accountAddress: string;
    }
  >;

  callStatic: {
    getAccounts(
      overrides?: CallOverrides
    ): Promise<SubWallets.SubWalletStructOutput[]>;

    getAccountsByAddress(
      _owner: string,
      overrides?: CallOverrides
    ): Promise<SubWallets.SubWalletStructOutput[]>;

    storeEncryptedAccount(
      _encryptedAccount: string,
      _network: string,
      _accountAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;

    subWallets(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, string] & {
        owner: string;
        encryptedAccount: string;
        network: string;
        accountAddress: string;
      }
    >;
  };

  filters: {
    "SubWalletStored(address,string,string,string)"(
      owner?: string | null,
      encryptedAccount?: null,
      network?: null,
      accountAddress?: null
    ): SubWalletStoredEventFilter;
    SubWalletStored(
      owner?: string | null,
      encryptedAccount?: null,
      network?: null,
      accountAddress?: null
    ): SubWalletStoredEventFilter;
  };

  estimateGas: {
    getAccounts(overrides?: CallOverrides): Promise<BigNumber>;

    getAccountsByAddress(
      _owner: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    storeEncryptedAccount(
      _encryptedAccount: string,
      _network: string,
      _accountAddress: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    subWallets(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getAccounts(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getAccountsByAddress(
      _owner: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    storeEncryptedAccount(
      _encryptedAccount: string,
      _network: string,
      _accountAddress: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    subWallets(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
