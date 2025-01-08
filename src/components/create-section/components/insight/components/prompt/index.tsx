import React from 'react'

type Props = {}

const Prompt = (props: Props) => {

    return (
        <div className='w-full font-aeonik flex'>
            <input placeholder='ask anything' className='flex flex-1 focus:bg-white bg-transparent focus:outline-none border-[1px] p-2 rounded-md' />
            <button className='rounded-md border-[1px]  text-black px-4 hover:bg-[#292929] hover:text-white transition duration-300'>
                Generate
            </button>
        </div>
    )
}

export default Prompt