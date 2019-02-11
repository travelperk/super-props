import { TOKEN } from "./utils";

export default function thrower(shouldIntercept) {
  if (!shouldIntercept) return;
  const originalConsoleError = console.error;
  console.error = function(...args) {
    if (
      args[0] &&
      typeof args[0].includes === "function" &&
      args[0].includes(TOKEN)
    )
      throw new Error(...args);
    originalConsoleError(...args);
  };
}
