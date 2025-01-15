// api/project.ts
import { getProjectData } from '@/lib/actions/project.action';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { projectId } = await req.json();

    console.log(projectId);
    if (!projectId) {
        return NextResponse.json({ message: 'Project ID is required' }, { status: 400 });
    }

    try {
        const projectData = await getProjectData(projectId);
        console.log(projectData);
        return NextResponse.json({ sections: projectData.sections }, { status: 200 });
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error('Error:', err.message);
            return NextResponse.json({ message: err.message }, { status: 500 });
        } else {
            console.error('Unexpected error:', err);
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        }
    }
}

