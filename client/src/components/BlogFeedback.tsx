import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Star } from 'react-feather'
import blogRatingRequest from '../requests/blogRatingRequest'

interface Props {
  blogId: string
}

const BlogFeedback = ({ blogId }: Props) => {
  const [oldRating, setOldRating] = useState<{
    id: string
    value: number
  } | null>(null)
  const [newRatingValue, setNewRatingValue] = useState(0)

  const [isClicked, setClicked] = useState(false)

  const queryClient = useQueryClient()
  const userRating = useQuery({
    queryKey: ['userRating', blogId],
    queryFn: () => blogRatingRequest.getUserRating(blogId),
  })

  useEffect(() => {
    if (userRating.data && userRating.data.value) {
      setOldRating({ id: userRating.data.id, value: userRating.data.value })
    }
  }, [userRating.data])

  const addBlogRatingMutation = useMutation({
    mutationFn: (args: {
      blogId: string
      ratingId?: string
      ratingValue: number
    }) => {
      if (args.ratingId) {
        return blogRatingRequest.update(
          args.blogId,
          args.ratingId,
          args.ratingValue
        )
      }
      return blogRatingRequest.add(args.blogId, args.ratingValue)
    },
    onSuccess: (newBlogRating) => {
      queryClient.invalidateQueries({ queryKey: ['blog', blogId] })
      setOldRating({ id: newBlogRating.id, value: newBlogRating.value })
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const handleRatingBlog = (newValue: number) => {
    if (oldRating && newValue === oldRating.value) {
      return
    }
    const newRating: {
      blogId: string
      ratingId?: string
      ratingValue: number
    } = { blogId, ratingValue: newValue }
    if (oldRating) {
      newRating.ratingId = oldRating.id
    }
    addBlogRatingMutation.mutate(newRating)
    setClicked(true)
    setTimeout(() => {
      setClicked(false)
    }, 400)
  }

  return (
    <div className='flex mt-8'>
      {Array.from({ length: 5 }).map((_, index) => {
        const isActive = newRatingValue > 0 && index + 1 <= newRatingValue
        const isOldActive = oldRating && index + 1 <= oldRating.value
        const color = isActive ? 'white' : isOldActive ? 'gray' : 'transparent'

        const scale =
          (index + 1 <= newRatingValue ? 105 + 5 * index : 100) / 100
        return (
          <Star
            key={index}
            style={{ transform: `scale(${scale})` }}
            className={`transition-transform duration-300 ease-in-out ${isClicked ? 'animate-pulse' : ''}`}
            size='35px'
            onPointerEnter={() => setNewRatingValue(index + 1)}
            onPointerLeave={() => setNewRatingValue(0)}
            onClick={() => handleRatingBlog(index + 1)}
            fill={`${color}`}
          />
        )
      })}
    </div>
  )
}

export default BlogFeedback
