export function getUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const sanitizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${baseUrl}${sanitizedPath}`;
}
