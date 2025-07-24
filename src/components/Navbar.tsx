import { Icons } from './Icons'

export const Navbar = () => {

  return (
    <nav className="bg-[rgb(var(--color-primary))] px-4 py-2 sticky top-0 z-50">
      <div className="max-w-8xl max-h-[64px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className='cursor-pointer'>
            <Icons name="menu" color='#fff' width={32} height={32} />
          </div>
          <h3> Checkpoint</h3>
        </div>

        <div className="hidden md:block">
          <div 
            className="bg-white rounded-full p-2 flex items-center justify-center m-w-[32px] cursor-pointer hover:bg-gray-100 transition-colors"
            title="Account Settings"
          >
            <Icons name="account" color='rgb(var(--color-primary))' width={24} height={24} />
          </div>
        </div>
      </div>
    </nav>
  )
}
