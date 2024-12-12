import { setFnCommand } from "./utils";

/**
 * Displays a list of options for a question and waits for the user to select an option by entering a number.
 * @param options - Array of questions with options and associated callbacks.
 */
const responsesLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

export function radio(options: {
  command?: string
  question: string
  responses: string[]
  callback: (selectedOption: string) => void
}): {
  run: () => void
} {
  if (!Array.isArray(options.responses) || typeof options.callback !== 'function') {
    throw new Error(
      'Invalid input: responses must be an array and callback must be a function.',
    )
  }

  if (options.responses.length > responsesLetters.length) {
    throw new Error(
      `Invalid input: too many responses, maximum is ${responsesLetters.length}.`,
    )
  }

  const resetResponses = () => {
    responsesLetters.forEach((letter) => {
      Object.defineProperty(window, letter, {
        get() {
          return undefined
        },
        value: undefined,
        writable: true,
        configurable: true,
      })
    })
  }

  const run = () => {
    console.log(options.question)

    options.responses.forEach((response, index) => {
      console.log(`(${responsesLetters[index]}): ${response}`)

      setFnCommand(responsesLetters[index], () => {
        options.callback(response)
        resetResponses()
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
