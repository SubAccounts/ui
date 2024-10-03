// 161PPkS7ma6p2mQESe2HKAyQD4hNQNmwjYFo9czoxYottNB5
import { Keyring } from "@polkadot/keyring";

const k = new Keyring();

const acc = k.addFromAddress("161PPkS7ma6p2mQESe2HKAyQD4hNQNmwjYFo9czoxYottNB5");

console.log(acc.address, acc.toJson());