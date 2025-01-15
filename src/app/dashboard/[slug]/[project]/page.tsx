'use client';
import ComponentPopup from '@/components/component-popup';
import { Info, Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { v4 as uuid } from 'uuid'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Page = () => {
  const { project } = useParams()
  const [sections, setSections] = useState<{ id: string, content: string }[]>([]);
  const [addSection, setAddSection] = useState(false);
  const [createSection, setCreateSection] = useState<ReactNode[]>([]);
  const [sectionType, setSectionType] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (project) {
      const fetchProjectData = async () => {
        console.log('Fetching project with ID:', project);
        try {
          const response = await fetch(`https://sight-hub-io.vercel.app/api/project`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              projectId: project
            }),
          });
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
          }

          const data = await response.json();
          console.log('Fetched Sections:', data.sections);
          setSections(data.sections || []);
        } catch (err) {
          console.error('Error fetching project data:', err);
        }
      };

      fetchProjectData();
    }
  }, [project]);

  const handleAddSection = async (data: string) => {
    setLoading(true);
    try {
      setSections((prev) => [...prev, { id: uuid(), content: data }]);
      setAddSection(false);
    } catch (err) {
      console.error('Error adding section:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 justify-center h-[90vh]">
      <div className="w-[75%] h-full overflow-hidden">
        <div className="w-full h-full font-aeonik text-black overflow-y-auto hide-scrollbar">
          {sections.length > 0 ? (
            sections.map((sec) => (
              <div key={sec.id} className="w-full px-8 py-4">
                <ReactMarkdown className="markdown" remarkPlugins={[remarkGfm]}>
                  {sec.content}
                </ReactMarkdown>
              </div>
            ))
          ) : (
            <div className="w-full px-8">
              <div className="bg-[#3333FF] flex items-center gap-3 text-[0.9rem] mt-4 border-[2px] border-[#B3B3FC] p-4 rounded-md text-white">
                <Info size={21} /> Get started by adding your first section
              </div>
            </div>
          )}
          {loading && (<DotLottieReact
            src='/animations/loading.json'
            loop
            autoplay
          />)}

          {createSection.map((section, index) => (
            <div key={index} className="w-full px-8 py-4">
              {section}
            </div>
          ))}

          <span
            className={`w-full relative flex ${!(sections.length > 0) && !(createSection.length > 0) ? 'h-[80vh]' : 'mb-[8rem]'
              } px-8 py-4 justify-center items-center`}
          >
            <button
              className="w-full h-full flex p-4 items-center justify-center border-dashed gap-2 border-[#3F3F46] border-[1px] p-2 px-4 rounded-md"
              onClick={() => setAddSection(!addSection)}
            >
              <Plus size={19} /> New Section
            </button>
            {addSection && (
              <ComponentPopup
                handleAddSection={handleAddSection}
                sectionType={sectionType}
                setSectionType={setSectionType}
                setCreateSection={setCreateSection}
                setAddSection={setAddSection}
              />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page;
