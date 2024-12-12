import { asyncForm } from "./async-form.method"
import { definedAnswer } from "./defined-answers.method"
import { form } from "./form.method"
import { input } from "./input.method"
import { log } from "./log.method"
import { radio } from "./radio.method"

class REPLBrowser {
  static input = input
  static log = log
  static definedAnswer = definedAnswer
  static form = form
  static asyncForm = asyncForm
  static radio = radio
}

export { REPLBrowser }
