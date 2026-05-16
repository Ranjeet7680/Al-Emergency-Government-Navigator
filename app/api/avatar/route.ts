import { NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    // Try multiple possible paths
    const paths = [
      join(process.cwd(), 'public', 'user-avatar.png'),
      join(process.cwd(), 'user-avatar.png'),
    ];
    
    for (const filePath of paths) {
      if (existsSync(filePath)) {
        const file = readFileSync(filePath);
        return new NextResponse(file, {
          headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000' },
        });
      }
    }
    
    // Generate a simple SVG avatar as fallback
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3b82f6"/>
          <stop offset="100%" style="stop-color:#ec4899"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#bg)"/>
      <circle cx="50" cy="38" r="16" fill="white" opacity="0.9"/>
      <ellipse cx="50" cy="75" rx="28" ry="20" fill="white" opacity="0.9"/>
    </svg>`;
    
    return new NextResponse(svg, {
      headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=31536000' },
    });
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
