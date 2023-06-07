import { fetchToken } from '@/lib/api';

export async function GET() {
  fetchToken();
  return Response.json({ status: 'alive' });
}
