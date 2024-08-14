import { ChangeEvent, HTMLInputTypeAttribute, useState } from 'react'

const useField = (type: HTMLInputTypeAttribute, startingValue = '') => {
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
