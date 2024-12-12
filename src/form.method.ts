import { setFnCommand } from "./utils";

/**
 * Asks a series of defined questions and executes callbacks for each answer.
 * @param options - Object containing questions with callbacks and a final callback.
 */
export function form(options: {
  questions: [question: string, callback: (answer: string) => void][]
  finally: (answers: string[]) => void
  command?: string
}): {
  run: () => void
} {
  if (!Array.isArray(options.questions) || typeof options.finally !== 'function') {
    throw new Error(
      'Invalid input: questions must be an array and finally must be a function.',
    )
  }

  const answers: string[] = []
  let index = 0

  const askNextQuestion = () => {
    if (index >= options.questions.length) {
      options.finally(answers)
      return
    }

    const [question, callback] = options.questions[index]
    const userResponse = prompt(question)

    if (userResponse !== null) {
      answers.push(userResponse)
      callback(userResponse)
    } else {
      console.log('User cancelled the prompt.')
    }

    index++
    askNextQuestion()
  }

  if (options.command) {
    setFnCommand(options.command, askNextQuestion)
  }

  return {
    run: askNextQuestion,
  }
}
