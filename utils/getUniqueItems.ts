export default function getUniqueItems(array: string[]): string[] {
  return [...new Set(array)];
}
