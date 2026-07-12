import { NextResponse } from 'next/server';
import { processUpcomingReservationAlerts } from '@/lib/reminderCron';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cronKey = searchParams.get('key');

  // Basic guard validation layer checking secret keys inside production server environments
  if (cronKey !== process.env.CRON_SECRET_TOKEN) {
    return new NextResponse('Unauthorized Endpoint Action', { status: 401 });
  }

  await processUpcomingReservationAlerts();
  return NextResponse.json({ success: true, timestamp: new Date().toISOString() });
}