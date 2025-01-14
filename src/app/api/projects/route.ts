import { NextRequest, NextResponse } from 'next/server';
import { createProject, getProjects } from '@/lib/actions/project.action';
import {createClerkClient} from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  try {
    const { projectData } = await req.json();
    const projectId = await createProject(projectData, 'test-user-id-123');
    
    return NextResponse.json({ projectId });
  } catch (err) {
    console.error('Error creating project:', err);
    return NextResponse.json({ message: 'Error creating project' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {

  const clerkClient = createClerkClient({
    secretKey:process.env.CLERK_SECRET_KEY,
    publishableKey:process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  })

  const {isSignedIn} = await clerkClient.authenticateRequest(req,{
    jwtKey:process.env.CLERK_JWT_KEY,
    authorizedParties:['https://sight-hub-io.vercel.app']
    // authorizedParties:['http://localhost:3000']
  })

  if (!isSignedIn) {
    return Response.json({ status: 401 })
  }

  try{
    const projectsData = await getProjects();
    if(!(projectsData.length>0)){
      return NextResponse.json({message:"User has no projects",data:projectsData},{status:404})
    }
    return NextResponse.json({projectsData},{status:200})
  }catch(err){
    console.log("Error fetching projects: ",err)
    return NextResponse.json({message:"Internal server error"},{status:500})
  }
}