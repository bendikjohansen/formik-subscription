export const findDifferences = <T>(first: T, second: T) =>
  !second ? first :
  Object.entries(first)
    .filter(([key, value]) => (second as any)[key] !== value)
    .reduce((result, [key, value]) => ({
      ...result,
      [key]: value
    }), {}) as Partial<T>;