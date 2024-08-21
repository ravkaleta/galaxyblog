import { PropsWithChildren } from 'react'
import PageHeader from './PageHeader'

interface Props extends PropsWithChildren {
  header?: string
  className?: string
}

const PageContainer = ({ children, header, className }: Props) => {
  return (
    <div className='flex flex-col items-center justify-center flex-1'>
      {header && <PageHeader text={header} />}
      <div
        className={`w-full lg:w-4/5 flex flex-col items-center justify-center ${className}`}
      >
        {children}
      </div>
    </div>
  )
}

export default PageContainer
