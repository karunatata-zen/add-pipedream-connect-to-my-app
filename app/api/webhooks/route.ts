import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('Webhook received:', body);

    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully',
      receivedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    webhooksEndpoint: '/api/webhooks',
    method: 'POST',
    description: 'This endpoint receives webhook events from Pipedream',
  });
}
