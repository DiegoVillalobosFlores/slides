export default function shortenKeys<T>(keys: Record<string, (...arg: any) => string>) {
  return Object.entries(keys).reduce((acc, [key, method]) => ({...acc, [key[0]]: method}), {} as Record<string, (...arg: any) => string>)
}