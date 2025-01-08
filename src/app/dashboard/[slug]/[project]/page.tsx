'use client'
import ComponentPopup from '@/components/component-popup';
import { Info, Plus } from 'lucide-react';
import React, { useState } from 'react';

type Props = {};

const Page = (props: Props) => {
    const [section, setSection] = useState<React.ReactNode[]>([]);
    const [addSection,setAddSection] = useState(false);
    const [createSection,setCreateSection] = useState<React.ReactNode[]>([]);
    const [sectionType,setSectionType] = useState<string>('')
    return (
        <div className='flex flex-1 justify-center h-[90vh]'>
            <div className='w-[75%] h-full overflow-hidden'>
                <div className='w-full h-full text-black overflow-y-auto hide-scrollbar'> 
            {
                (!(section.length > 0 ) && !(createSection.length>0)) && (
                    <div className='w-full px-8'>
                        <div className='bg-[#3333FF] flex items-center gap-3 text-[0.9rem] mt-4 border-[2px] border-[#B3B3FC] p-4 rounded-md text-white'>
                           <Info size={21}/> Get started by adding your first section
                        </div>
                    </div>
                )
            }
            {
                createSection.map((section, index) => (
                    <div key={index} className='w-full px-8 py-4'>
                        {section}
                    </div>
                ))
            }
            <span className={`w-full relative flex ${(!(section.length > 0) && !(createSection.length>0)) ? ('h-[80vh] '):("mb-[8rem]")} px-8 py-4 justify-center items-center`}>
                <button  className='w-full h-full  flex p-4 items-center justify-center border-dashed gap-2 border-[#3F3F46] border-[1px] p-2 px-4 rounded-md' onClick={() => setAddSection(!addSection)}>
                   <Plus size={19}/> New Section
                </button>
                {(<>{addSection && <ComponentPopup setSectionType={setSectionType} setCreateSection={setCreateSection} setAddSection={setAddSection}/>}</>)}
            </span>
                </div>
            </div>
        </div>
    );
};

export default Page;
