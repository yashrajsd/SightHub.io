import TypingAnimation from '@/components/ui/typing-animation';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

type Props={
  handleAddSection: (data:string) => Promise<void>;
}

const Prompt = ({handleAddSection}:Props) => {
    const [question, setQuestion] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const {project} = useParams();
  
    const handleSubmit = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://sight-hub-io.vercel.app/api/langflow', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ input_value: question ,projectId:project}),
        });
  
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
  
        const data = await res.json();
        handleAddSection(data?.message);
      } catch (err: any) {
        console.error('Error submitting data:', err.message);
        setError(err.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className='w-full font-aeonik flex flex-col'>
        <div className='flex w-full'>
          <input
            placeholder='Ask anything'
            className='flex flex-1 focus:bg-white bg-transparent focus:outline-none border-[1px] p-2 rounded-md'
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            className='rounded-md border-[1px] text-black px-4 hover:bg-[#292929] hover:text-white transition duration-300'
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>
        {error && (
          <div className='text-white font-aeonik mt-1 py-2 px-4 w-full bg-red-400 rounded-md border-red'>
            {error}
          </div>
        )}
      </div>
    );
  };
  
  export default Prompt;
  
