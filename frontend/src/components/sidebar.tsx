import React, { Children, type ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { BarChart3, FileEdit, Flame, LayoutDashboard, LogOut, TrendingUp } from 'lucide-react'
import { useAuth } from '../context/authContext'
import Navbar from './navbar'

interface SidebarProps {
  children: ReactNode;
}
const Sidebar: React.FC<SidebarProps> = ({children}) => {
    const {user,logout}=useAuth()
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
            <span className='text-blue-600'>Prep</span>
            <span className='text-blue-600'>Route</span></h1> 

            </div>
            <nav className='flex-1 p-4 space-y-2'>
                <NavLink to='/dashboard'
                className={({isActive})=>`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive ? 'bg-blue-600 text-white': 'hover:text-slate-700 hover:bg-slate-100'}`}>
                <TrendingUp size={18}/>
                Dashboard    
                </NavLink>

                <NavLink to='/test-creation'
                className={({isActive})=>`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive ? 'bg-blue-600 text-white': 'hover:text-slate-700 hover:bg-slate-100'}`}>
                <FileEdit size={18}/>
                test-creation
                </NavLink>

                <NavLink to='/test-tracking'
                className={({isActive})=>`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive ? 'bg-blue-600 text-white': 'hover:text-slate-700 hover:bg-slate-100'}`}>
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