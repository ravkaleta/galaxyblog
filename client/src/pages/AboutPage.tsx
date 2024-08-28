import PageHeader from './components/PageHeader'

const AboutPage = () => {
  return (
    <div className='w-11/12 mt-10 lg:mt-0 lg:w-8/12'>
      <PageHeader text='About the website' />
      <div className='pt-2 text-white text-xl'>
        <p className='text-center'>
          Galaxy Blog is a classic blogging platform where users can create and
          share their posts, as well as comment on and rate entries from other
          users. The website is designed to be a space for expression and
          interaction, providing a simple yet effective way for users to engage
          with content and each other.
        </p>
        <p className='mt-10 text-center'>
          This project serves as a training ground for me to apply and refine my
          skills with newly learned technologies, particularly TypeScript. I am
          also focusing on mastering the art of project structuring, ensuring
          that the website's architecture is robust and scalable for future
          development. Galaxy Blog is not just a functional website but also a
          reflection of my learning journey and commitment to building a
          well-organized and maintainable codebase.
        </p>
      </div>
    </div>
  )
}

export default AboutPage
