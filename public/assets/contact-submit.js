/** Envia os dados sem abrir outra aplicação; a prévia local nunca simula envios. */
export async function submitContact(
  data,
  { hostname = globalThis.location.hostname, request = globalThis.fetch } = {},
) {
  if (['localhost', '127.0.0.1', '[::1]'].includes(hostname)) {
    throw new Error('LOCAL_PREVIEW');
  }
  const response = await request('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data).toString(),
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error('SUBMISSION_FAILED');
}
