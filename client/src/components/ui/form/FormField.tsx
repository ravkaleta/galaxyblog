import { PropsWithChildren } from 'react'

const FormField = ({ children }: PropsWithChildren) => {
  return <div className='flex items-center justify-center'>{children}</div>
}

export default FormField
