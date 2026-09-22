import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const projectId = process.env.NEXT_PUBLIC_PIPEDREAM_PROJECT_ID;

  if (!projectId) {
    return NextResponse.json(
      { error: 'Project ID not configured' },
      { status: 500 }
    );
  }

  return NextResponse.json({
    projectId,
    status: 'ready',
    message: 'Pipedream Connect API endpoint is ready',
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const projectId = process.env.NEXT_PUBLIC_PIPEDREAM_PROJECT_ID;

    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID not configured' },
        { status: 500 }
      );
    }

    console.log('Received connection data:', body);

    return NextResponse.json({
      success: true,
      message: 'Connection data received',
      projectId,
    });
  } catch (error) {
    console.error('Error processing connection:', error);
    return NextResponse.json(
      { error: 'Failed to process connection' },
      { status: 400 }
    );
  }
}
