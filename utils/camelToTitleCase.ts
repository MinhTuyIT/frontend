export default function camelToTitleCase(camelCaseStr: string): string {
  // Add space before capital letters and trim the resulting string
  const result = (camelCaseStr ?? "").replace(/([A-Z])/g, " $1").trim();

  // Convert the first character of each word to upper case
  return result
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
