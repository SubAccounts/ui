import { persistentAtom } from "@nanostores/persistent";

export function createSimplePersistentAtom<T>(initialValue: T, name: string) {
  return persistentAtom<T>(name, initialValue, {
    encode: JSON.stringify,
    decode: JSON.parse,
  });
}
