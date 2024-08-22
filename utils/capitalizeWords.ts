export const capitalizeWords = (value?: string) => {
  const words = value?.split(" ");

  const result = words?.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return result?.join(" ") ?? "";
};
