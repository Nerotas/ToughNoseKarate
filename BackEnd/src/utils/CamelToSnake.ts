/**
 * Convert a camelCase string to snake_case
 */
export function toSnake(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    value !== null &&
    typeof value === 'object' &&
    (value as object).constructor === Object
  );
}

/**
 * Recursively convert object keys from camelCase to snake_case.
 * - Leaves primitives, Dates, Buffers and non-plain objects untouched.
 * - Converts arrays by mapping their elements.
 *
 * Example:
 *   camelToSnake({ firstName: 'A', nested: { someValue: 1 } })
 *   // -> { first_name: 'A', nested: { some_value: 1 } }
 */
export function camelToSnake<T = any>(input: T): any {
  if (input === null || input === undefined) return input;

  if (Array.isArray(input)) {
    return input.map((item) => camelToSnake(item));
  }

  if (isPlainObject(input)) {
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(input as Record<string, any>)) {
      const newKey = toSnake(k);
      out[newKey] = camelToSnake(v);
    }
    return out;
  }

  // preserve Dates, RegExps, Buffers, Maps, Sets, etc.
  return input;
}
