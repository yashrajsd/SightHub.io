import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  setCreate: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => Promise<void>;
};

const CreateProject = ({ setCreate , fetchData}: Props) => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const handleCreateProject = async () => {
    if (!projectName || !description) {
      alert('Please provide both project name and description');
      return;
    }

    setLoading(true);
  
    try {
      const response = await fetch(`/api/projects`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectData: { 
            name: projectName,
            description: description,
          },
        }),
      });
  
      const data = await response.json();
  
      if (data.projectId) {
        fetchData();
        router.push(`/dashboard/yashrajsd/${data.projectId}`);
      } else {
        alert('Error creating project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
      setCreate(false); 
    }
  };

  return (
    <div className="absolute h-screen w-full backdrop-blur-sm z-[10] bg-[rgba(230,230,230,0.8)] flex justify-center items-center">
      <div className="bg-white font-aeonik p-4 rounded-md w-[30%]">
        <h1 className="py-2 my-2 px-3 border-l-[4px] border-l-[#292929]">Create New Project</h1>
        <div className="flex flex-col mb-4">
          <input
            placeholder="Project name"
            className="border-[1px] rounded-md p-2 mb-2"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="border-[1px] rounded-md p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          onClick={handleCreateProject}
          className="p-2 bg-[#292929] text-white rounded-md w-full mb-2"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Project'}
        </button>
        <button
          className="w-full rounded-md border-[1px] p-2"
          onClick={() => setCreate(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CreateProject;
