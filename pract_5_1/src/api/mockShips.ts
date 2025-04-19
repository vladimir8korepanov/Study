export interface Spaceship {
    id: string;
    name: string;
    price: number;
    image: string;
    crew: string;
    engine: 'ion' | 'plasma' | 'warp';
    status: 'available' | 'on-order';
    description: string;
}

export const mockShips: Spaceship[] = [
    {
        id: 'i-567',
        name: 'Ak-158m',
        price: 2500000,
        image:'/assets/Ak-158m.jpeg',
        crew: '3',
        engine: 'ion',
        status: 'available',
        description: 'Истребитель с повышенным ходом и увеличенным боезапасом'
    },
    {
        id: '334643',
        name: 'Mk-352',
        price: 4500000,
        image:'/assets/Mk-352.png',
        crew: '6',
        engine: 'plasma',
        status: 'available',
        description: 'Свехтяжелый истребитель конвоя'
    },
    {
        id: '43455m',
        name: 'PO-1',
        price: 3000000,
        image:'/assets/PO-1.png',
        crew: '6',
        engine: 'plasma',
        status: 'available',
        description: 'Иследовательский корабль повышенной боевой готовности'
    },
    {
        id: '000123',
        name: 'YAK-6546',
        price: 150000,
        image:'/assets/YAK-6546.png',
        crew: '3',
        engine: 'warp',
        status: 'on-order',
        description: 'Первый малый истребитель типа-дебафф'
    },

];