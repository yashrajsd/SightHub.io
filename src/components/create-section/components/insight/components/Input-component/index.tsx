import React from 'react'
import Prompt from '../prompt'
import Metrics from '../metrics'

type Props = {
    type:string
}

const InputComponent = ({type}: Props) => {
    let content;

    switch (type) {
        case 'prompt':
            content = <Prompt/>
            break;
        case 'metric':
            content = <Metrics/>
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