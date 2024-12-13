import { REPLBrowser } from '../src'

console.log(1)

REPLBrowser.log({
  command: 'TEST',
  onCommandTyped: () => {
    console.log('TEST')
  }
}).run()