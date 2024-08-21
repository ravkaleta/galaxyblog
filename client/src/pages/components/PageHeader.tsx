const PageHeader = ({ text }: { text: string }) => {
  return (
    <h2 className='w-full text-white text-4xl mb-4 font-extrabold text-center'>
      {text}
    </h2>
  )
}

export default PageHeader
