import { isString } from '../typeCheck'

export const parseString = (str: unknown, varName: string): string => {
  if (!isString(str)) {
    throw new Error(`Incorrect ${varName}: ` + str)
  }
  return str
}
