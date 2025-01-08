import Topbar from '@/components/topbar'
import React from 'react'

type Props = {
    children:React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className='relative w-full h-full'>
        <Topbar/>
        {children}
    </div>
  )
}

export default Layout