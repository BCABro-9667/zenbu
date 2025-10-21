import { NextRequest, NextResponse } from 'next/server';
import { getLeads, createLead } from '@/lib/mongodb-services';

export async function GET() {
  try {
    const leads = await getLeads();
    return NextResponse.json({ success: true, data: leads });
  } catch (error) {
    console.error('Get leads error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const leadData = await request.json();
    const lead = await createLead(leadData);
    return NextResponse.json({ success: true, data: lead }, { status: 201 });
  } catch (error) {
    console.error('Create lead error:', error);
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}
