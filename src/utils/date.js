export function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateString));
}

export function monthLabel(dateString) {
  return new Intl.DateTimeFormat('en-IN', {
    month: 'short',
    year: '2-digit',
  }).format(new Date(dateString));
}
