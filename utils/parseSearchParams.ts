export default function parseSearchParams(): { [key: string]: string } {
  const searchParams = new URLSearchParams(window.location.search);
  const paramsObject: { [key: string]: string } = {};

  for (const [key, value] of searchParams.entries()) {
    paramsObject[key] = value;
  }

  return paramsObject;
}
