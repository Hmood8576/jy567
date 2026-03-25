import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

// POST /api/profiles — حفظ أو تحديث ملف شخصي
export async function POST(req: Request) {
  try {
    const profile = await req.json();
    if (!profile?.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    await sql`
      INSERT INTO profiles (id, data, updated_at)
      VALUES (${profile.id}, ${JSON.stringify(profile)}, NOW())
      ON CONFLICT (id) DO UPDATE
      SET data = ${JSON.stringify(profile)}, updated_at = NOW()
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('POST profile error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// GET /api/profiles?ids=a,b,c — جلب عدة ملفات
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idsParam = searchParams.get('ids');
    if (!idsParam) return NextResponse.json([]);

    const ids = idsParam.split(',').filter(Boolean);
    if (ids.length === 0) return NextResponse.json([]);

    const rows = await sql`SELECT data FROM profiles WHERE id = ANY(${ids})`;
    return NextResponse.json(rows.map((r) => r.data));
  } catch (err) {
    console.error('GET profiles error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
