import { setFnCommand } from "./utils";

/**
 * Asks a series of questions in sequence and executes their callbacks.
 * @param options - Object containing an array of questions with callbacks and a final callback.
 */
export function asyncForm(options: {
  questions: [question: string, callback: (answer: string) => Promise<void>][]
  finally: (answers: string[]) => void
  command?: string
}): {
  run: () => Promise<void>
} {
  if (!Array.isArray(options.questions) || typeof options.finally !== 'function') {
    throw new Error('Invalid arguments provided to asyncForm method.')
  }

  const run = async () => {
    const answers: string[] = []

    for (const [question, callback] of options.questions) {
      if (typeof callback !== 'function') {
        throw new Error('Each question must be a string with a callback function.')
      }

      const answer = prompt(question)
      if (answer !== null) {
        answers.push(answer)
        await callback(answer)
      } else {
        console.log('User cancelled the prompt.')
        return
      }
    }

    options.finally(answers)
  }

  if (options.command) {
    setFnCommand(options.command, run)
  }

  return { run }
}
