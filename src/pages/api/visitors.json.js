import fs from 'fs';
import path from 'path';

const countFile = path.resolve(process.cwd(), 'visitor-count.json');

export async function get() {
  let count = 0;
  try {
    if (fs.existsSync(countFile)) {
      const data = fs.readFileSync(countFile, 'utf-8');
      count = JSON.parse(data).count || 0;
    }
    count++;
    fs.writeFileSync(countFile, JSON.stringify({ count }), 'utf-8');
  } catch (e) {
    return new Response(JSON.stringify({ count: 'error' }), { status: 500 });
  }
  return new Response(JSON.stringify({ count }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
} 