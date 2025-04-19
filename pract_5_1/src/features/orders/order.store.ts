import { makeAutoObservable } from 'mobx';
import { CartItem } from '../cart/cart.slice';

interface Order {
    id: string;
    date: Date;
    items: CartItem[];
    total: number;
    customerName: string;
    status: "обработка" | "отправлено" | "доставлено";
}

class OrderStore {
    orders: Order[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    createOrder(cartItem: CartItem[], customerName: string) {
        const newOrder: Order = {
            id: Math.random().toString(36).substring(2, 9),
            date: new Date(),
            items: [...cartItem],
            total: cartItem.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            customerName,
            status: 'обработка'
        };
        

        this.orders.push(newOrder);
        return newOrder;
    }

    updateStatus(orderId: string, newStatus: Order['status']) {
        const order = this.orders.find(o => o.id === orderId);
        if (order) {
            order.status = newStatus;
        }
    }
}

export const orderStore = new OrderStore();