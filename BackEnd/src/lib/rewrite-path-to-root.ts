/**
 * Returns the trimmed value of the env var 'REWRITE_PATH_TO_ROOT'. Used as the base path for rewriting paths to the root route.
 *
 * If the env var is not provided, returns an empty string.
 */
export const rewritePathToRoot = (): string =>
  process.env.REWRITE_PATH_TO_ROOT?.replace(/^[\s/]+|[\s/]+$/g, '') || '';
