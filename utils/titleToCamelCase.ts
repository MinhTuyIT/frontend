export default function titleToCamelCase(titleCaseStr: string): string {
  // Split the string into words
  const words = titleCaseStr.split(" ");

  // Transform the first word to lower case and the rest to camel case
  const result = words.map((word, index) => {
    if (index === 0) {
      // Lower case for the first word
      return word.toLowerCase();
    } else {
      // Capitalize the first letter and make the rest lower case for other words
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  });

  // Join the words back together without spaces
  return result.join("");
}
