import { Search } from 'react-feather'
import useField from '../hooks/useField'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import blogRequest from '../requests/blogRequest'
import BlogList from '../components/BlogList'

const SearchPage = () => {
  const search = useField('text')

  const result = useQuery({
    queryKey: ['foundBlogs'],
    queryFn: () => blogRequest.getSearched(search.input.value, 10),
  })

  useEffect(() => {
    const delay = setTimeout(() => {
      result.refetch()
    }, 500)

    return () => clearTimeout(delay)
  }, [search.input.value])

  return (
    <div className='flex flex-col items-center w-11/12 mt-8 lg:mt-0 lg:w-9/12 text-white'>
      <div className='w-96 mb-8'>
        <input
          placeholder='Search...'
          className='w-5/6 bg-transparent border-b border-gray-600 px-4 py-1 outline-none'
          {...search.input}
        />
        <Search className='inline-block w-1/6 hover:scale-110' />
      </div>
      {result.data && <BlogList blogs={result.data} />}
    </div>
  )
}

export default SearchPage
