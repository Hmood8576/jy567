import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const rows = await sql`SELECT data FROM profiles WHERE id = ${id} LIMIT 1`;
    if (rows.length === 0) return NextResponse.json(null, { status: 404 });
    return NextResponse.json(rows[0].data);
  } catch (err) {
    console.error('GET profile error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await sql`DELETE FROM profiles WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE profile error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
