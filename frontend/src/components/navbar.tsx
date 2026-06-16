import { Bell } from 'lucide-react'
import React, { type ReactNode } from 'react'
import { useAuth } from '../context/authContext'

interface SidebarProps {
  children: ReactNode;
}
const Navbar: React.FC<SidebarProps> = ({children}) => {
const {user}=useAuth()
  return (
    <>
    <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b  border-[#E5E7EB] px-6 flex items-center justify-end">
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-slate-100">
              <Bell size={18} />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1B5DEF] text-white flex items-center justify-center font-semibold">
                {user?.name?.[0] || user?.userId?.[0] || "A"}
              </div>

              <div>
                <p className="font-medium text-sm">
                  {user?.name || user?.userId || "Admin"}
                </p>
                <p className="text-xs text-[#384EC7]">Admin</p>
              </div>
            </div>
          </div>
          </header>
          <main className='p-6 bg-white'>{children}</main>
          </div>
    </>
  )
}

export default Navbar