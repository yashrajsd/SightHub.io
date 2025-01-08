import { Edit, Link } from 'lucide-react'
import React from 'react'

type Props = {}

const Topbar = (props: Props) => {
  return (
    <div className='py-4'>
        <div className='w-full flex tems-center justify-center font-aeonik'>
            <div className='w-[70%] flex justify-between items-center'>
                <span className='text-black flex gap-3 items-center'>
                    <span className='flex items-center gap-2'>
                        <p>
                        Reel insights
                        </p>
                        <Edit size={18}/>
                    </span>
                    <div className='h-[1.5rem] border-[1px] border-[#323232] '/>
                    <span className='text-[0.8rem] text-[#323232]'>12/2/2025</span>
                </span>
                <span>
                    <button className='items-center bg-[#292929] gap-2 rounded-md text-[0.8rem] text-white flex px-4 py-2'>
                        Share <Link size={18}/>
                    </button>
                </span>
            </div>
        </div>
    </div>
  )
}

export default Topbar