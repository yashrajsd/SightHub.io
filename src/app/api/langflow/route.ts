import { updateProjectData } from '@/lib/actions/project.action';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  const { input_value,projectId } = await req.json();
  console.log(input_value);

  try {
    const response = await fetch(
      'https://api.langflow.astra.datastax.com/lf/bc16cb20-8cb2-48b8-9977-56ec2f077e5a/api/v1/run/d22796f0-1835-44f3-a06c-5125687cc21a?stream=false',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.LANGFLOW_APPLICATION_TOKEN}`,
        },
        body: JSON.stringify({
          input_value: input_value,
          output_type: 'chat',
          input_type: 'chat',
          tweaks: {
            'File-eFpRe': {},
            'SplitText-KxuPl': {},
            'AstraDB-mJccd': {},
            'ChatInput-gN5Bn': {},
            'ParseData-LfQL6': {},
            'Prompt-x0Nx4': {},
            'GroqModel-wAtaq': {},
            'ChatOutput-V0ogd': {},
          },
        }),
      }
    );

    const data = await response.json();
    // console.log(data.outputs[0].outputs[0].artifacts.message);
    // WIP: adding the data to the project
    console.log(data.outputs[0].outputs[0].artifacts.message,projectId)
    await updateProjectData(data.outputs[0].outputs[0].artifacts.message,projectId);
    const message =data.outputs[0].outputs[0].artifacts.message || 'No message available';

    return NextResponse.json({ message }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
  }
}
