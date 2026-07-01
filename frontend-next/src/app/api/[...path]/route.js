/**
 * Catch-all proxy: /api/* → backend
 *
 * On Cloud Run, fetches a GCP identity token from the metadata server
 * and attaches it as an Authorization: Bearer header — exactly what the
 * old nginx entrypoint.sh did. Falls back gracefully when running locally.
 */

const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  'https://hik-backend-805730087505.us-east4.run.app';

const METADATA_URL =
  `http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=${BACKEND}`;

async function getIdentityToken() {
  try {
    const res = await fetch(METADATA_URL, {
      headers: { 'Metadata-Flavor': 'Google' },
      // Short timeout — if metadata server doesn't respond we're not on GCP
      signal: AbortSignal.timeout(1000),
    });
    if (res.ok) return await res.text();
  } catch {
    // Not on GCP (local dev) — skip token
  }
  return null;
}

async function handler(request, { params }) {
  const path = (await params).path?.join('/') ?? '';
  const { search } = new URL(request.url);
  const targetUrl = `${BACKEND}/api/${path}${search}`;

  // Forward all headers except host
  const forwardHeaders = new Headers(request.headers);
  forwardHeaders.delete('host');

  // Attach GCP identity token if available
  const token = await getIdentityToken();
  if (token) {
    forwardHeaders.set('Authorization', `Bearer ${token}`);
  }

  const body =
    request.method !== 'GET' && request.method !== 'HEAD'
      ? await request.arrayBuffer()
      : undefined;

  const backendRes = await fetch(targetUrl, {
    method: request.method,
    headers: forwardHeaders,
    body,
    // Don't follow redirects — proxy them back to the client
    redirect: 'manual',
  });

  // Stream response back
  const responseHeaders = new Headers(backendRes.headers);
  // Strip hop-by-hop headers that shouldn't be forwarded
  responseHeaders.delete('transfer-encoding');
  responseHeaders.delete('connection');

  return new Response(backendRes.body, {
    status: backendRes.status,
    statusText: backendRes.statusText,
    headers: responseHeaders,
  });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;
