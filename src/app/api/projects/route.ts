import { NextRequest, NextResponse } from 'next/server';
import { getPlatform } from '@/lib/cloudflare';

export const runtime = 'edge';

export async function GET() {
    try {
        const { db } = getPlatform();

        if (!db) {
            return NextResponse.json({ error: 'D1 Database not configured' }, { status: 500 });
        }

        const { results } = await db.prepare('SELECT * FROM projects ORDER BY created_at DESC').all();

        return NextResponse.json(results);
    } catch (error) {
        console.error('D1 error:', error);
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { db } = getPlatform();
        const body = await request.json() as { title: string; description?: string; image_url?: string };
        const { title, description, image_url } = body;

        if (!db) {
            return NextResponse.json({ error: 'D1 Database not configured' }, { status: 500 });
        }

        await db.prepare('INSERT INTO projects (title, description, image_url) VALUES (?, ?, ?)')
            .bind(title, description, image_url)
            .run();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('D1 error:', error);
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}
