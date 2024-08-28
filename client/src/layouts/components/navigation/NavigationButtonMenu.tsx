import { Menu } from 'react-feather'

interface props {
  handleMenuVisibility: () => void
}

const NavigationButtonMenu = ({ handleMenuVisibility }: props) => {
  return (
    <button
      onClick={handleMenuVisibility}
      className='flex sm:hidden items-end justify-center border p-2 rounded-md bg-black bg-opacity-30'
    >
      <Menu size='24px' />
    </button>
  )
}

export default NavigationButtonMenu
