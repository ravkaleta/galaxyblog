import { Link, useNavigate } from 'react-router-dom'
import useField from '../../hooks/useField'
import { useEffect, useRef, useState, KeyboardEvent } from 'react'
import { useQuery } from '@tanstack/react-query'
import blogRequest from '../../requests/blogRequest'
import { Search } from 'react-feather'

interface props {
  className?: string
}

const SearchBar = ({ className = '' }: props) => {
  const navigate = useNavigate()
  const search = useField('text')
  const [isVisible, setVisibility] = useState(false)
  const foundBlogsRef = useRef<HTMLDivElement>(null)

  const result = useQuery({
    queryKey: ['searchBarBlogs'],
    queryFn: () => blogRequest.getSearched(search.input.value, 10),
    enabled: false,
  })

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (search.input.value.length > 2) {
      const delay = setTimeout(() => {
        result.refetch()
        setVisibility(true)
      }, 500)

      return () => clearTimeout(delay)
    } else {
      setVisibility(false)
    }
  }, [search.input.value])

  const handleClickOutside = (event: MouseEvent) => {
    if (
      foundBlogsRef.current &&
      !foundBlogsRef.current.contains(event.target as Node)
    ) {
      setVisibility(false)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      navigate(`/search?query=${encodeURIComponent(search.input.value)}`)
    }
  }

  return (
    <div className={`w-48 ${className}`}>
      <input
        placeholder='Search...'
        className='w-5/6 bg-transparent border-b border-gray-600 px-4 py-1 outline-none'
        {...search.input}
        onKeyDown={handleKeyDown}
        onFocus={() => setVisibility(true)}
      />
      <Search className='inline-block w-1/6' />
      {isVisible && (
        <div ref={foundBlogsRef} className='absolute'>
          {result.data &&
            result.data.map((blog) => (
              <Link
                to={`/blog/${blog.id}`}
                key={blog.id}
                className='flex flex-col relative w-64 h-20 bg-black border-t border-x last:border-b border-gray-600 shadow-xl bg-cover 
                  after:absolute after:w-full after:h-full after:bg-gradient-to-b after:from-black after:from-5% after:via-black/40 after:to-black after:to-95%'
                style={{ backgroundImage: `url(/api/images/${blog.imageUrl})` }}
              >
                <p className='m-2 text-sm line-clamp-2 z-10'>{blog.title}</p>
                <p className='absolute bottom-0 right-0 text-sm m-2 z-10'>
                  by{' '}
                  <span className='text-secondary-500'>{blog.authorName}</span>
                </p>
              </Link>
            ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
