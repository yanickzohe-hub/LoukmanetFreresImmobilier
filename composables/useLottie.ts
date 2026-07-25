const cache = new Map<string, object>()

export function useLottie() {
  async function load(path: string): Promise<object | null> {
    if (cache.has(path)) return cache.get(path)!
    try {
      const data = await import(`~/animations/${path}`)
      cache.set(path, data.default || data)
      return cache.get(path)!
    } catch {
      console.warn(`Lottie animation not found: ${path}`)
      return null
    }
  }

  return { load }
}
