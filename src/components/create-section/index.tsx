import React from 'react'
import InsightCreate from './components/insight';
import GraphCreate from './components/graph';

type Props = {
    sectionType: string
    handleAddSection: (data:string) => Promise<void>;
}

const CreateSection = ({ sectionType ,handleAddSection}: Props) => {
    let content;

    switch (sectionType) {
        case 'insight':
            content = <InsightCreate handleAddSection={handleAddSection}/>
            break;
        case 'graph':
            content = <GraphCreate/>
            break;
        default:
            content = <div>Select a section type</div>;
    }

    return (
        <div className='w-full'>
            {content}
        </div>
    );
}

export default CreateSection;
