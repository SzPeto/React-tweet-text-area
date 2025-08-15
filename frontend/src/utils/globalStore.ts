let isFirstStart = true

export const getIsFirstStart = () => isFirstStart
export const setIsFirstStart = (newState: boolean) => {
  isFirstStart = newState
}