import { scheduled } from "./scheduled";
import { milliseconds } from "./types";

/**
 * Waits for the specified time and returns no value.
 * @param timeout The time in milliseconds to wait.
 */
export async function wait(timeout: milliseconds): Promise<void> {
   return scheduled(timeout, () => undefined);
}
