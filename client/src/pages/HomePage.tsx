import BlogList from '../components/BlogList'
import PageContainer from './components/PageContainer'

const HomePage = () => {
  return (
    <PageContainer header='Recent blogs' className='w-full '>
      <BlogList />
    </PageContainer>
  )
}

export default HomePage
