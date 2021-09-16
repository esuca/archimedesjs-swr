import { CacheInvalidations, Query } from "@archimedes/arch"

export type Class<T = any> = new (...args: any[]) => T

export function InvalidateQueriesCache(queryNames: string[] = []) {
  return (target: Class) => {
    const metadata: Class[] | undefined = Reflect.getMetadata('design:paramtypes', target)

    if (metadata !== undefined) {
      const queriesInConstructor = metadata.filter(x => x.prototype instanceof Query).map(x => x.name)
      CacheInvalidations.set(
        target.name,
        [...queryNames, ...queriesInConstructor]
      )
    } else {
      console.warn('no metadata')
    }
  }
}

// https://medium.com/litslink/typescript-decorators-in-examples-c3afcd3c7ff8
// https://gist.github.com/remojansen/16c661a7afd68e22ac6e
