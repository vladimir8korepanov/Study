import { atom } from 'jotai';

interface User {
  name: string;
  isGuest: boolean;
}

export const userAtom = atom<User>({
  name: 'Гость',
  isGuest: true
});

export const loginAtom = atom(
  null,
  (_get, set, name: string) => { // _get убрал
    set(userAtom, { name, isGuest: false });
  }
);

export const logoutAtom = atom(
  null,
  (_get, set) => { // тут тоже
    set(userAtom, { name: 'Гость', isGuest: true });
  }
);