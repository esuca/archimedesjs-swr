import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

export type Key = string;

export interface CacheManagerType {
  get(key: Key): any;
  set(key: Key, value: any): any;
  keys(): string[];
  has(key: Key): boolean;
  delete(key: Key): void;
  clear(): void;
}

@Injectable({ providedIn: "root" })
export class NewCacheManager implements CacheManagerType {
  public cache: Map<string, Observable<any>>;

  constructor() {
    this.cache = new Map();
  }

  get(key: Key): any {
    return this.cache.get(key);
  }

  set(key: Key, value: any): any {
    this.cache.set(key, value);
  }

  keys() {
    return Array.from(this.cache.keys());
  }

  has(key: Key) {
    return this.cache.has(key);
  }

  clear() {
    this.cache.clear();
  }

  delete(key: Key) {
    this.cache.delete(key);
  }
}
