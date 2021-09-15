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
  subscribe(listener: CacheListener): () => void;
}

export type CacheListener = () => void;

@Injectable({ providedIn: "root" })
export class NewCacheManager implements CacheManagerType {
  private cache: Map<string, Observable<any>>;
  private subs: CacheListener[];

  constructor() {
    this.cache = new Map();
    this.subs = [];
  }

  get(key: Key): any {
    return this.cache.get(key);
  }

  set(key: Key, value: any): any {
    this.cache.set(key, value);
    // this.notify()
  }

  keys() {
    return Array.from(this.cache.keys());
  }

  has(key: Key) {
    return this.cache.has(key);
  }

  clear() {
    this.cache.clear();
    this.notify();
  }

  delete(key: Key) {
    this.cache.delete(key);
    this.notify();
  }

  revalidate(key: Key) {
    const value = this.get(key);
  }

  subscribe(listener: CacheListener) {
    if (typeof listener !== "function") {
      throw new Error("Expected the listener to be a function.");
    }

    let isSubscribed = true;
    this.subs.push(listener);

    return () => {
      if (!isSubscribed) return;
      isSubscribed = false;
      const index = this.subs.indexOf(listener);
      if (index > -1) {
        this.subs[index] = this.subs[this.subs.length - 1];
        this.subs.length--;
      }
    };
  }

  // Notify Cache subscribers about a change in the cache
  private notify() {
    for (let listener of this.subs) {
      listener();
    }
  }
}
