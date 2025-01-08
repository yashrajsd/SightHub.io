import React from 'react'
import InsightCreate from './components/insight';
import GraphCreate from './components/graph';

type Props = {
    sectionType: string
}

const CreateSection = ({ sectionType }: Props) => {
    let content;

    switch (sectionType) {
        case 'insight':
            content = <InsightCreate/>
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
