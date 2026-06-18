import React, { type ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { BarChart3, FileEdit, LogOut, TrendingUp } from 'lucide-react'
import { useAuth } from '../context/authContext'
import Navbar from './navbar'

interface SidebarProps {
  children: ReactNode;
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
    isActive
      ? 'bg-[#F8FAFF] text-[#384EC7]  border-l-8 shadow-2xl border-[#384EC7]'
      : 'hover:text-[#384EC7] '
  }`;

const Sidebar: React.FC<SidebarProps> = ({children}) => {
    const {logout}=useAuth()
    const navigate=useNavigate()
    const handlelogout=()=>
    {
        logout()
        navigate('/login')
    }
  return (
     <>
          <div className="flex min-h-screen bg-white">
        <aside className='w-64 bg-white border-r border-[#E5E7EB] flex flex-col'>
            <div className='h-16 flex items-center px-6 '>
                <h1 className='text-4xl font-bold'>
            <span className='text-[#1B5DEF]'>Prep</span>
            <span className='text-[#1B5DEF]'>Route</span></h1> 

            </div>
            <nav className='flex-1 p-4 text-[#6B7180] space-y-2'>
                <NavLink to='/dashboard' className={navLinkClass}>
                <TrendingUp size={18}/>
                Dashboard    
                </NavLink>

                <NavLink to='/test-creation' className={navLinkClass}>
                <FileEdit size={18}/>
                test-creation
                </NavLink>

                <NavLink to='/test-tracking' className={navLinkClass}>
                <BarChart3 size={18}/>
                test tracking    
                </NavLink>
                
            </nav>
            <div className="p-4 border-t border-[#E5E7EB]">
                <button onClick={handlelogout} className='w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-500 hover:text-white'>
                    <LogOut size={18}/>
                    Logout
                </button>
            </div>
        </aside>
        <Navbar  children={children}/>
        </div>
     
     </>
  )
}

export default Sidebar