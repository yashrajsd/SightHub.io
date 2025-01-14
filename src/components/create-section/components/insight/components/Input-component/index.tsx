import React from 'react'
import Prompt from '../prompt'
import Metrics from '../metrics'

type Props = {
    type:string
    handleAddSection: (data:string) => Promise<void>;
}

const InputComponent = ({type,handleAddSection}: Props) => {
    let content;

    switch (type) {
        case 'prompt':
            content = <Prompt handleAddSection={handleAddSection}/>
            break;
        case 'metric':
            content = <Metrics handleAddSection={handleAddSection}/>
            break;
        default:
            content = <div>!!Error occured!!</div>;
    }

    return (
        <div className='w-full'>
            {content}
        </div>
    );
}

export default InputComponent