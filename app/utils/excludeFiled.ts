// Exclude field(s) way

function exclude<T, Key extends keyof T>(entity: T, keys: Key[]): Omit<T, Key> {
  return Object.fromEntries(
    Object.entries(entity).filter(([key]) => !keys.includes(key)),
  );
}

export default exclude;
