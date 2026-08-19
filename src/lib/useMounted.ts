"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * True only after client hydration. Used to defer rendering of
 * localStorage-backed state (cart/wishlist counts) until the client
 * snapshot is available, avoiding a hydration mismatch without the
 * setState-in-effect anti-pattern.
 */
export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
