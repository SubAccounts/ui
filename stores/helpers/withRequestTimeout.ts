import { atom } from "nanostores";

export const requests = atom<Record<string, number>>({});

export async function withRequestTimeout(
  key: string,
  callback: () => boolean | Promise<boolean>,
) {
  const _requests = requests.get();
  let canLoad = false;

  if (!_requests[key]) {
    canLoad = true;
  } else {
    const time = Date.now();

    if (time - _requests[key] > 20_000) {
      canLoad = true;
    }
  }

  if (canLoad) {
    const value = await callback();

    if (value) {
      requests.set({
        ...requests.get(),
        [key]: Date.now(),
      });
    }
  }
}
