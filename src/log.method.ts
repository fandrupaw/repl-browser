import { setFnCommand } from "./utils"

/**
 * Creates a global variable with a getter that triggers a callback when typed in the browser console.
 * @param options - Object containing the command name and the callback function.
 */
export function log(options: {
  command?: string
  onCommandTyped: (command: string) => void
}): {
  run: (command: string) => void
} {
  if (typeof options.onCommandTyped !== 'function') {
    throw new Error(
      "Invalid arguments: 'command' must be a string and 'onCommandTyped' must be a function.",
    )
  }

  const run = (command: string) => {
    setFnCommand(command, options.onCommandTyped)
  }

  return { run }
}
