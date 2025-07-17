
export function getNextIndex(currentIndex, length, direction) {
  const newIndex = currentIndex + direction;
  if (newIndex < 0 || newIndex >= length) {
    return currentIndex; 
  }
  return newIndex;
}
