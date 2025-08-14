
function pad(s: any): string{
  return s.toString().padStart(2, "0")
}

export function getDateTime(): string{
  const now = new Date()

  return `${now.getFullYear()}-${pad(now.getMonth())}-${pad(now.getDate())} ` + 
         `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
}