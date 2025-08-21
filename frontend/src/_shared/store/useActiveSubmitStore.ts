import { create } from 'zustand'

type useActiveSubmitStore = {
  isActiveSubmit: boolean,
  setisActiveSubmit: (newState: boolean) => void
}

export const useActiveSubmitStore = create<useActiveSubmitStore>((set) => ({
  isActiveSubmit: true,
  setisActiveSubmit: (newState) => set({ isActiveSubmit: newState })
}))