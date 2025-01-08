import Sidebar from '@/components/sidebar'
import React, { Children } from 'react'

type Props = {
    children:React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className='flex h-screen w-full'>

        <Sidebar/>
        <div className='w-[82%]'>
        {children}
        </div>
    </div>
  )
}

export default Layout