import type { RootState, AppDispatch } from "@/stores/redux.store";
import type { Spaceship } from "@/api/mockShips";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__?: () => unknown;
    }
}

declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '@/features/cart/cart.slice' {
    interface CartItem extends Spaceship {
        quantity: number;
    }
}

declare module 'react-redux' {
    // export interface DefaultRootState extends RootState {}
    export type DefaultRootState = RootState;
    export function useDispatch(): AppDispatch;
}