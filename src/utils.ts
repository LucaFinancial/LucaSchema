/**
 * Utility functions for converting between dollar amounts and minor units (cents)
 */

/**
 * Converts a dollar amount to minor units (cents)
 * @param dollars - The dollar amount (e.g., 100.50)
 * @returns The amount in cents (e.g., 10050)
 * @example
 * dollarsToMinorUnits(100.50) // returns 10050
 * dollarsToMinorUnits(0.99) // returns 99
 */
export function dollarsToMinorUnits(dollars: number): number {
  return Math.round(dollars * 100);
}

/**
 * Converts minor units (cents) to a dollar amount
 * @param cents - The amount in cents (e.g., 10050)
 * @returns The dollar amount (e.g., 100.50)
 * @example
 * minorUnitsToDollars(10050) // returns 100.50
 * minorUnitsToDollars(99) // returns 0.99
 */
export function minorUnitsToDollars(cents: number): number {
  return cents / 100;
}

/**
 * Formats minor units (cents) as a currency string
 * @param cents - The amount in cents (e.g., 10050)
 * @param currency - The currency code (defaults to 'USD')
 * @param locale - The locale for formatting (defaults to 'en-US')
 * @returns Formatted currency string (e.g., '$100.50')
 * @example
 * formatMinorUnits(10050) // returns '$100.50'
 * formatMinorUnits(99) // returns '$0.99'
 */
export function formatMinorUnits(
  cents: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(minorUnitsToDollars(cents));
}
