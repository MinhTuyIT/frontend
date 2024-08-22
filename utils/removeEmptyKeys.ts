type ObjectType<T> = {
  [key: string]: T;
};

export default function removeEmptyKeys<T>(obj: ObjectType<T>): ObjectType<T> {
  return Object.entries(obj).reduce(
    (acc: ObjectType<T>, [key, value]: [string, T]) => {
      if (value !== null && value !== undefined && value !== "") {
        acc[key] = value;
      }
      return acc;
    },
    {} as ObjectType<T>
  );
}
