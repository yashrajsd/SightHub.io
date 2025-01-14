import React from 'react'
import CreateSection from '../create-section'
import { motion } from 'motion/react'
import { SECTION_TYPES } from '@/constants/constants'
import {v4 as uuid} from 'uuid'

type Props = {
    setSectionType: React.Dispatch<React.SetStateAction<string>>;
    setCreateSection: React.Dispatch<React.SetStateAction<React.ReactNode[]>>;
    setAddSection: React.Dispatch<React.SetStateAction<boolean>>;
    handleAddSection: (data:string) => Promise<void>; 
    sectionType: string;
};



const ComponentPopup = ({ setSectionType, setCreateSection ,setAddSection,sectionType,handleAddSection}: Props) => {

    const handleCreation = (type: string) => {
        console.log(sectionType)
        setSectionType(type);
        setCreateSection((prevSections) => [...prevSections, <CreateSection sectionType={type} handleAddSection={handleAddSection} key={uuid()}/>]);
        setAddSection(false);
    }

    return (
        <motion.div
            className="absolute z-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
        >
            <div className='bg-white shadow-xl font-aeonik rounded-lg py-4 px-6'>
                <ul className='flex flex-col gap-4'>
                    {SECTION_TYPES.map((section, index) => (
                        <React.Fragment key={section.id}>
                            <li
                                id={section.id}
                                className='flex flex-col gap-1 transition duration-300 hover:bg-[#EFEFFF] rounded-lg cursor-pointer p-3'
                                onClick={() => handleCreation(section.type)}
                            >
                                <p className='flex items-center gap-2'>
                                    {section.icon} {section.label}
                                </p>
                                <p className='text-[#363636] text-[0.9rem]'>
                                    {section.description}
                                </p>
                            </li>
                            {index < SECTION_TYPES.length - 1 && (
                                <hr className='border-[#CACACA]' />
                            )}
                        </React.Fragment>
                    ))}
                </ul>
            </div>
        </motion.div>
    )
}

export default ComponentPopup
