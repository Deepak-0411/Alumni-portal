export function truncateText(text, maxLength = 15, ellipsis = '...') {
  if (typeof text !== 'string') return '';
  return text.length > maxLength
    ? text.slice(0, maxLength) + ellipsis
    : text;
}
