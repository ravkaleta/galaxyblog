import { PropsWithChildren, useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'react-feather'

interface props extends PropsWithChildren {
  header: string
  className?: string
}

const HorizontalList = ({ children, header, className = '' }: props) => {
  const listRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    listRef.current!.scrollBy({
      top: 0,
      left: -600,
      behavior: 'smooth',
    })
  }

  const scrollRight = () => {
    listRef.current!.scrollBy({
      top: 0,
      left: 600,
      behavior: 'smooth',
    })
  }

  return (
    <div className={`w-full ${className}`}>
      <div className='w-full flex justify-between border-b border-gray-500'>
        <h2 className='ml-6 lg:ml-24 p-2 text-white text-3xl lg:text-4xl font-extrabold'>
          {header}
        </h2>
        <div className='hidden lg:block mr-4 text-white gap-x-2 p-2'>
          <ArrowLeft
            size='35px'
            onClick={scrollLeft}
            className='inline-block hover:scale-110'
          />
          <button disabled></button>
          <ArrowRight
            size='35px'
            onClick={scrollRight}
            className='inline-block hover:scale-110'
          />
        </div>
      </div>
      <div
        ref={listRef}
        className={`flex overflow-x-scroll customScrollBar mt-2`}
      >
        {children}
      </div>
    </div>
  )
}

export default HorizontalList
