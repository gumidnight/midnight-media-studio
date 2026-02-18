import { NextRequest, NextResponse } from 'next/server';
import { getPlatform } from '@/lib/cloudflare';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    try {
        const { storage } = getPlatform();

        if (!storage) {
            return NextResponse.json({ error: 'R2 Storage not configured' }, { status: 500 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const fileName = `${Date.now()}-${file.name}`;
        const buffer = await file.arrayBuffer();

        await storage.put(fileName, buffer, {
            httpMetadata: {
                contentType: file.type,
            },
        });

        return NextResponse.json({
            success: true,
            message: 'File uploaded successfully',
            key: fileName
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
