import { ChangeEvent, HTMLInputTypeAttribute } from 'react'

interface InputProps {
  type: HTMLInputTypeAttribute
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  id?: string
  placeholder?: string
}

const Input = (props: InputProps) => {
  return (
    <input
      className='w-72 text-white focus:outline-none bg-transparent border-b p-1 '
      {...props}
    />
  )
}

export default Input
