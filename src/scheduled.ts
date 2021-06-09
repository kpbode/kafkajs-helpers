import { milliseconds } from "./types";

/**
 * Waits for the specified time and emits a value by using the given provider.
 * @param timeout The time in milliseconds to wait.
 * @param provider The function to use as a provider for the value to emit.
 */
export async function scheduled<T>(timeout: milliseconds, provider: () => T): Promise<T> {
   return new Promise<T>((resolve) => {
      setTimeout(() => {
         resolve(provider());
      }, timeout);
   });
}
