import { Link, useNavigate } from 'react-router-dom'

import { Icons } from './Icons'
import { DropdownMenu, DropdownMenuItem } from './ui/DropdownMenu'
import { Avatar } from './ui/Avatar'
import { useAppSelector } from '../store/hooks'
import { useLogoutMutation } from '../store/api/auth'
import { getInitials } from '../utils/strings'

export const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate('/login', { replace: true });
    } catch (error) {
      // Even if logout fails, navigate to login
      navigate('/login', { replace: true });
    }
  };

  return (
    <nav className="bg-[rgb(var(--color-primary))] px-4 py-2 sticky top-0 z-50">
      <div className="max-w-8xl max-h-[64px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className='cursor-pointer'>
            <Icons name="menu" color='#fff' width={32} height={32} />
          </div>
          <h3 className='text-white'> Checkpoint</h3>
        </div>

        <nav className="hidden md:flex space-x-6">
          <Link to="/dashboard" className="text-white hover:text-neutral-900 transition-colors">
            Dashboard
          </Link>
          <Link to="/history" className="text-white hover:text-neutral-900 transition-colors">
            History
          </Link>
        </nav>
        <div className="md:block">
          <DropdownMenu
            align="end"
            trigger={
              <div className="bg-white rounded-full p-1 cursor-pointer hover:bg-gray-100 transition-colors">
                <Avatar
                  src={user?.profileImage}
                  alt={user?.name}
                  initials={getInitials(user?.name || '')}
                  size="sm"
                  className="bg-purple-100 text-purple-600"
                />
              </div>
            }
          >
            <DropdownMenuItem onClick={handleLogout}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
