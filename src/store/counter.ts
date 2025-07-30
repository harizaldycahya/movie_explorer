import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CounterStore = {
  count: number
  increment: () => void
  decrement: () => void
}

export const useCounter = create<CounterStore>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
    }),
    {
      name: 'counter-storage', // name of the key in localStorage
    }
  )
)