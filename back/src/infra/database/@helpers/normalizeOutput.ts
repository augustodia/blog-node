type GenericRecord = Record<string, unknown>;

function mergeEntries(
  accumulator: GenericRecord,
  [key, value]: unknown[]
): GenericRecord {
  const keyAsString = String(key);
  accumulator[keyAsString] = value;
  return accumulator;
}

function snakeToCamelCase(snakeString: string): string {
  return String(snakeString)
    .toLowerCase()
    .replace(/[-_][a-z]/g, (match) => match.slice(-1).toUpperCase());
}

function convertKeysSnakeToCamelCase(
  inputObject: GenericRecord
): GenericRecord | undefined {
  if (!inputObject) return undefined;

  return Object.entries(inputObject)
    .map(([key, value]) => {
      const camelCasedKey = snakeToCamelCase(key);
      return [camelCasedKey, value];
    })
    .reduce(mergeEntries, {});
}

export function normalizeOutput(
  output: GenericRecord | GenericRecord[]
): GenericRecord | undefined | Array<GenericRecord | undefined> {
  if (Array.isArray(output)) {
    return output.map(convertKeysSnakeToCamelCase);
  }

  return convertKeysSnakeToCamelCase(output);
}

export function camelToSnakeCase(camelString: string): string {
  return String(camelString).replace(
    /[A-Z]/g,
    (match) => `_${match.toLowerCase()}`
  );
}
