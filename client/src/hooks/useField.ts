import { ChangeEvent, useState } from 'react'

const useField = (type: string) => {
  const [value, setValue] = useState('')

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

export default useField
