import { atom } from "nanostores";

type NavbarStore = {
  isOpen: boolean;
};

export const navbarStore = atom<NavbarStore>({
  isOpen: false,
});

export function toggleNavBar(value?: boolean) {
  navbarStore.set({
    isOpen: typeof value !== "undefined" ? value : !navbarStore.get().isOpen,
  });
}
