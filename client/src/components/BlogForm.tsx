import { SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react'
import blogRequest from '../requests/blogRequest'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotification } from '../providers/useContexts'
import { Blog } from '../types'
import { AxiosError } from 'axios'
import useAutosizeTextArea from '../hooks/useAutosizeTextArea'
import { useDropzone } from 'react-dropzone'
import { File } from 'react-feather'
import { useNavigate } from 'react-router-dom'

interface BlogFormProps {
  blog?: Blog
}

interface CustomFile extends File {
  preview: string
}

const BlogForm = ({ blog }: BlogFormProps) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [images, setImages] = useState<CustomFile[]>([])

  const titleAreaRef = useRef<HTMLTextAreaElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useAutosizeTextArea(titleAreaRef.current!, title)
  useAutosizeTextArea(textAreaRef.current!, text)

  useEffect(() => {
    if (blog) {
      setTitle(blog.title)
      setText(blog.text)
    }
  }, [blog])

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    setImages(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    )
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/jpg': [], 'image/png': [] },
    maxFiles: 1,
  })

  useEffect(() => {
    return () => images.forEach((image) => URL.revokeObjectURL(image.preview))
  }, [])

  const { setTempNotification } = useNotification()

  const addBlogMutation = useMutation({
    mutationFn: blogRequest.add,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData<Blog[]>(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs ? blogs.concat(newBlog) : [newBlog]
      )
      setTempNotification('success', 'Succesfully added new blog', 5)
      navigate(`/blog/${newBlog.id}`)
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setTempNotification('error', error.response?.data, 5)
      } else {
        setTempNotification('error', error.message, 5)
      }
    },
  })

  const updateBlogMutation = useMutation({
    mutationFn: (args: { objId: string; obj: FormData }) =>
      blogRequest.update(args.objId, args.obj),
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData<Blog[]>(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs?.map((b) => (b.id !== updatedBlog.id ? b : updatedBlog))
      )
      setTempNotification('success', 'Succesfully updated blog', 5)
      navigate(`/blog/${updatedBlog.id}`)
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setTempNotification('error', error.response?.data, 5)
      } else {
        setTempNotification('error', error.message, 5)
      }
    },
  })

  const saveBlog = async (event: SyntheticEvent) => {
    event.preventDefault()
    const formData = new FormData()
    if (images[0]) {
      formData.append('image', images[0])
      console.log(formData)
    }
    formData.append('title', title)
    formData.append('text', text)
    if (blog) {
      updateBlogMutation.mutate({ objId: blog.id, obj: formData })
    } else {
      addBlogMutation.mutate(formData)
    }
  }

  return (
    <form onSubmit={saveBlog} className='w-full flex flex-col items-center'>
      <textarea
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder='Title'
        ref={titleAreaRef}
        rows={1}
        className='overflow-hidden bg-transparent resize-none w-full text-white text-4xl font-extrabold 
        text-center pt-2 pb-4 outline-none focus:bg-white focus:bg-opacity-5
        border border-gray-500'
      />
      <span role='textbox'></span>

      <div
        {...getRootProps({
          className: `bg-white ${isDragActive ? 'bg-opacity-10' : 'bg-opacity-5'} hover:bg-opacity-10 ${!images[0] && !blog && 'p-5'}  m-6 border-2 border-dashed border-gray-500 rounded-3xl 
            text-gray-300 text-md lg:text-xl flex flex-col items-center justify-center`,
        })}
      >
        <input {...getInputProps()} />

        {images[0] ? (
          <img
            src={images[0].preview}
            className='rounded-3xl max-w-xs sm:max-w-md md:max-w-xl xl:max-w-3xl max-h-[36rem] md:max-h-[56rem] lg:max-h-[64rem]'
            onLoad={() => {
              URL.revokeObjectURL(images[0].preview)
            }}
          />
        ) : blog && blog.imageUrl ? (
          <img
            src={`/api/images/${blog.imageUrl}`}
            className='rounded-3xl max-w-xs sm:max-w-md md:max-w-xl xl:max-w-3xl max-h-[36rem] md:max-h-[56rem] lg:max-h-[64rem]'
          />
        ) : (
          <>
            <File className='h-1/3 w-1/3' />
            <p className='hidden lg:block text-center'>
              Drag 'n' drop some file here, or click to select file <br />
              Only one file ( .png, .jpeg, .jpg )
            </p>
            <p className='lg:hidden text-center'>
              Click to upload file <br />
              Only one file ( .png, .jpeg, .jpg )
            </p>
          </>
        )}
      </div>

      <div className='w-full'>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder='Add text here...'
          ref={textAreaRef}
          rows={1}
          className='overflow-hidden bg-transparent p-4 resize-none w-full text-white text-xl text-balance outline-none focus:bg-white focus:bg-opacity-5
          border border-gray-500'
        />
      </div>

      <button
        className='w-36 mt-10 text-center py-2 rounded-md text-white 
        bg-gradient-to-br from-primary-800 to-secondary-800 lg:hover:scale-110 transition-transform ease-in-out duration-700'
        type='submit'
      >
        Save
      </button>
    </form>
  )
}

export default BlogForm
