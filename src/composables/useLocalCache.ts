export function useLocalCache() {
  const getItem = <T>(key: string, fallback: T): T => {
    const raw = localStorage.getItem(key)

    if (!raw) {
      return fallback
    }

    try {
      return JSON.parse(raw) as T
    } catch {
      return fallback
    }
  }

  const setItem = (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const removeItem = (key: string) => {
    localStorage.removeItem(key)
  }

  return {
    getItem,
    setItem,
    removeItem
  }
}

