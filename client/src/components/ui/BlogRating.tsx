import { Star } from 'react-feather'

interface props {
  avgRating: number
  starSize?: string
}

const BlogRating = ({ avgRating, starSize = '20px' }: props) => {
  return (
    <div className='text-white'>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`inline-block`}
          size={starSize}
          fill={`${index + 1 <= avgRating ? 'white' : 'transparent'}`}
        />
      ))}
    </div>
  )
}

export default BlogRating
