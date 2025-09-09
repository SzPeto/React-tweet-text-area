export function formatIsoDateTime(iso: string) {
  const date = new Date(iso)
  
  return date.toLocaleString()
}

