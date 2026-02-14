const CANONICAL_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const SLASH_DATE_PATTERN = /^(\d{4})\/(\d{2})\/(\d{2})$/;

function isValidDateParts(year, month, day) {
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  const candidate = new Date(Date.UTC(year, month - 1, day));
  return (
    candidate.getUTCFullYear() === year &&
    candidate.getUTCMonth() === month - 1 &&
    candidate.getUTCDate() === day
  );
}

function parseDateParts(value, pattern) {
  const match = value.match(pattern);
  if (!match) return null;

  const year = Number.parseInt(match[1], 10);
  const month = Number.parseInt(match[2], 10);
  const day = Number.parseInt(match[3], 10);

  if (!isValidDateParts(year, month, day)) return null;
  return { year, month, day };
}

/**
 * Returns a normalized YYYY-MM-DD date string for unambiguous values.
 * Accepts canonical YYYY-MM-DD and slash YYYY/MM/DD input.
 * Returns null for non-date or ambiguous strings.
 * @param {unknown} value
 * @returns {string | null}
 */
export function normalizeDateString(value) {
  if (typeof value !== 'string') return null;

  const canonicalParts = parseDateParts(value, CANONICAL_DATE_PATTERN);
  if (canonicalParts) return value;

  const slashParts = parseDateParts(value, SLASH_DATE_PATTERN);
  if (!slashParts) return null;

  return `${slashParts.year.toString().padStart(4, '0')}-${slashParts.month
    .toString()
    .padStart(2, '0')}-${slashParts.day.toString().padStart(2, '0')}`;
}

/**
 * Indicates whether a value is a fixable slash-form date (YYYY/MM/DD).
 * @param {unknown} value
 * @returns {boolean}
 */
export function isDateStringFixable(value) {
  if (typeof value !== 'string') return false;
  const normalized = normalizeDateString(value);
  return normalized !== null && normalized !== value;
}
