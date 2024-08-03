import { ChangeEvent, useState } from 'react'

const useField = (type: string, startingValue = '') => {
  const [value, setValue] = useState(startingValue)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    input: {
      type,
      value,
      onChange,
    },
    reset,
  }
}

export default useField
