import { InsightOption } from '@/constants/constants'
import { Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import InputComponent from './components/Input-component'


const Insight = () => {
  const [choosen, setChoosen] = useState('')
  return (
    <div className='border-[1px] rounded-md p-4'>
      <div className='flex items-center gap-3'>
        <Sparkles size={18} />
        <h1>AI Insights</h1>
      </div>
      <p className='text-[0.8rem] text-[#606060]'>
        Generate insights with the help of AI
      </p>
      <hr className='border-[1px] my-2' />
      <div className={`grid grid-cols-2`}>
        {!choosen &&
          (
            <>
              {
                InsightOption.map((item, index) => (
                  <span key={index} className={`flex cursor-pointer gap-4 my-8 flex-col items-center justify-center ${index % 2 == 0 && ('border-r-[1px]')}`} onClick={()=>{setChoosen(item.type)}}>
                    {item.icon}
                    <p>{item.label}</p>
                  </span>
                ))
              }
            </>
          )
        }
      </div>
      {choosen && <InputComponent type={choosen}/>}
    </div>
  )
}

export default Insight