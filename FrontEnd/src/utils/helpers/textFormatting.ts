/**
 * Converts camelCase, snake_case, or kebab-case strings to readable text
 * @param text - The text to convert
 * @returns Formatted readable text
 */
export function toReadableText(text: string): string {
  if (!text) return '';

  return (
    text
      // Handle camelCase: insert space before uppercase letters
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      // Handle snake_case and kebab-case: replace underscores and hyphens with spaces
      .replace(/[_-]/g, ' ')
      // Capitalize first letter of each word
      .replace(/\b\w/g, (letter) => letter.toUpperCase())
      // Clean up extra spaces
      .replace(/\s+/g, ' ')
      .trim()
  );
}

/**
 * Converts camelCase to Title Case (alternative implementation)
 * @param text - The camelCase text to convert
 * @returns Title Case text
 */
export function camelCaseToTitleCase(text: string): string {
  if (!text) return '';

  return text
    .replace(/([A-Z])/g, ' $1') // Insert space before uppercase
    .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
    .trim();
}

/**
 * Converts snake_case to readable text
 * @param text - The snake_case text to convert
 * @returns Readable text
 */
export function snakeCaseToReadable(text: string): string {
  if (!text) return '';

  return text
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Examples:
// toReadableText('camelCaseText') → 'Camel Case Text'
// toReadableText('snake_case_text') → 'Snake Case Text'
// toReadableText('kebab-case-text') → 'Kebab Case Text'
// toReadableText('geicho_hyung_il_bu') → 'Geicho Hyung Il Bu'
// toReadableText('frontKick') → 'Front Kick'
