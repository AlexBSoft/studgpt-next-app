import { create } from 'zustand'

export const useModelStore = create((set) => ({
  model: "gemini",
  setModel: (_model) => set((state) => ({ model: _model })),
}))
