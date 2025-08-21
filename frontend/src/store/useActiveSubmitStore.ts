import { create } from 'zustand'

type useActiveSubmitStore = {
  isActiveSubmit: boolean,
  setisActiveSubmit: (active: boolean) => void
}

export const useActiveSubmitStore = create<useActiveSubmitStore>((set) => ({
  isActiveSubmit: true,
  setisActiveSubmit: (active) => set({ isActiveSubmit: active })
}))