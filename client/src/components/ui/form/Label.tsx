import { PropsWithChildren } from 'react'

interface LabelProps extends PropsWithChildren {
  htmlFor: string
}

const Label = ({ children, htmlFor }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className='flex-1 text-lg text-center text-white whitespace-nowrap mx-2 sr-only'
    >
      {children}
    </label>
  )
}

export default Label
