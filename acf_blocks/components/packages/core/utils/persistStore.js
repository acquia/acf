// Save state
export const saveState = (key, store) => {
  try {
    const serializedState = JSON.stringify(store)
    localStorage.setItem(key, serializedState)
  } catch (e) {
    return undefined
  }
}

// Load state
export const loadState = key => {
  try {
    const serializedState = localStorage.getItem(key)

    if (serializedState === null) {
      return undefined
    }

    return JSON.parse(serializedState)
  } catch (e) {
    return undefined
  }
}
