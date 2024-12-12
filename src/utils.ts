export function setFnCommand(command: string, fn: (command: string) => void): void {
  if (typeof command !== 'string') {
    throw new Error('Command must be a string.')
  }

  if (/\s/.test(command) || /^\d/.test(command)) {
    throw new Error('Command value cannot contain spaces or start with a number.')
  }

  if (command in window) {
    console.warn('Command already exists in the global scope, redefining it.')
  }

  Object.defineProperty(window, command, {
    get: () => {
      fn(command)
    },
    configurable: true, // Allow redefinition
  })
}
