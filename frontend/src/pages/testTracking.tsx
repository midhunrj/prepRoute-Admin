import React from 'react'
import Sidebar from '../components/sidebar'
import Layout from '../components/layout'
import { BarChart3 } from 'lucide-react'

const TestTracking = () => {
  return (
    <>
    <Layout>
        <div className="flex flex-col items-center justify-center px-20 py-5 bg-[#8B8FA] ">
            <BarChart3 size={48} strokeWidth={1}/>
            <h2 className='mt-4 text-xl font-bold text-[#1a1d2e]'>
                Test Tracking
            </h2>
            <p className='mt-2 text-base'>Track test performance and analytics coming soon.</p>
        </div>
    </Layout>
    </>
  )
}

export default TestTracking