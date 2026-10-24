"use client";

/** Effets « riches » uniquement sur ordinateur (souris) et si l'utilisateur n'a pas demandé moins d'animations */
export const canUseRichMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
