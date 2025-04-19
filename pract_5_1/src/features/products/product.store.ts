import { create } from "zustand";
import { mockShips, Spaceship } from "@/api/mockShips";

interface ProductStore {
    ships: Spaceship[];
    loading: boolean;
    error: string | null;
    selectedShip: Spaceship | null;
    fetchShips: () => Promise<void>;
    selectShip: (id: string) => void;
    // filterByStatus: (status: 'available' | 'on-order') => Spaceship[];
  }
  
  export const useProductStore = create<ProductStore>((set, get) => ({
    ships: [],
    loading: false,
    error: null,
    selectedShip: null,
    
    fetchShips: async () => {
      set({ loading: true });
      try {
        // Имитация API запроса
        await new Promise(resolve => setTimeout(resolve, 800));
        set({ ships: mockShips, loading: false });
      } catch {
        set({ error: 'Ошибка загрузки', loading: false });
      }
    },
    
    selectShip: (id: string) => {
      const ship = get().ships.find(s => s.id === id) || null;
      set({ selectedShip: ship });
    },
    
}));