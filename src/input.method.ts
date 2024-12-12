import { setFnCommand } from "./utils"

/**
 * Creates a global getter for the command and sets up the input functionality.
 * @param options - Object containing message, command, and onReply callback.
 */
export function input(options: {
  message: string
  command?: string // Command variable to create globally
  onReply: (message: string) => void
}): {
  run: () => void
} {
  const runInput = () => {
    const userResponse = prompt(options.message)
    if (userResponse !== null) {
      options.onReply(userResponse)
    } else {
      console.info('User cancelled the prompt.')
    }
  }

  if (options.command) {
    setFnCommand(options.command, runInput)
  }

  return { run: runInput }
}
