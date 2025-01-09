'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ClerkAuthState from '../clerk-auth-state';
import { useUser } from '@clerk/nextjs';
import CreateProject from '../create-project';

type Insight = {
  id: string;
  name: string;
};

const Sidebar = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const { user, isLoaded } = useUser();
  const [create, setCreate] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        const response = await fetch('https://sight-hub-io.vercel.app/api/projects', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();

        // Map `label` from backend to `name` for frontend consistency
        const formattedData = data.projectsData.map((item: { id: string; label: string }) => ({
          id: item.id,
          name: item.label,
        }));

        setInsights(formattedData);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setInsights([]);
      }
    };

    fetchUserProjects();
  }, []);

  return (
    <div className="w-[18%] h-full flex">
      <div className="w-full h-fit rounded-md p-4">
        <div className="border-[1px] text-[0.8rem] flex items-center gap-2 mb-2 font-aeonik w-full border-[#C6C6C6] px-4 py-4 rounded-md text-[0.7rem] text-black">
          {isLoaded ? (
            <>
              <ClerkAuthState /> {user?.firstName} {user?.lastName}
            </>
          ) : (
            'Loading'
          )}
        </div>
        <button
          className="border-[1px] flex items-center gap-2 justify-center mb-4 font-aeonik w-full border-[#C6C6C6] px-4 py-2 rounded-md text-[0.7rem] text-black"
          onClick={() => setCreate(true)}
        >
          <Plus size={16} />
        </button>
        <ul className="flex flex-col gap-3">
          {insights.length > 0 ? (
            insights.map((item, index) => (
              <li className="text-[#606060] ml-4 text-[0.8rem]" key={index}>
                <Link href={`/dashboard/yashrajsd/${item.id}`}>
                  {item.name}
                </Link>
              </li>
            ))
          ) : (
            <p className="text-white p-2 text-[0.8rem] bg-[#4C4CFA] rounded-md">
              🥳 Start by creating the first project
            </p>
          )}
        </ul>
      </div>
      {create && <CreateProject setCreate={setCreate} />}
    </div>
  );
};

export default Sidebar;
