import { setFnCommand } from "./utils";

/**
 * Defines a question and its possible answers with associated callbacks.
 * Logs the question to the console and waits for a defined answer.
 * @param options - Object containing question and possible answers with callbacks.
 */
export function definedAnswer(options: {
  command?: string
  question: string
  answers: Record<string, (answer: string) => void>
}): {
  run: () => void
} {
  if (!options.question || !options.answers) {
    throw new Error('Invalid arguments provided to definedAnswer method.')
  }

  const run = () => {
    console.log(options.question)

    Object.keys(options.answers).forEach((key) => {
      Object.defineProperty(window, key, {
        get: () => {
          // Remove all defined answers to prevent further triggering
          Object.keys(options.answers).forEach((k) => {
            delete (window as any)[k]
          })

          // Run the appropriate callback
          const callback = options.answers[key]
          if (callback) {
            callback(key)
          }
        },
        configurable: true,
      })
    })
  }

  if (options.command) {
    setFnCommand(options.command, run)
  }

  return {
    run,
  }
}
