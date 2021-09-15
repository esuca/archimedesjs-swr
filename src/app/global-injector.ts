// doing this in a separate file rather than in the app.module.ts file
// avoids circular dependency warnings
import { Injector } from "@angular/core";

export let globalInjector: Injector;

export function setGlobalInjector(injector: Injector) {
  if (globalInjector) {
    // just being cautious here, this shouldn't happen
  } else {
    globalInjector = injector;
  }
}
