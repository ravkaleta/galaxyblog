import { PropsWithChildren } from 'react'

interface ButtonProps extends PropsWithChildren {
  type: 'button' | 'submit' | 'reset'
  className?: string
  onClick?: () => void
}

const Button = ({
  children,
  type = 'button',
  className = '',
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`bg-secondary-700 hover:bg-secondary-800 text-secondary-50 hover:text-secondary-100 transition-all rounded-md shadow-sm w-full h-10 max-w-64 font-bold ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
