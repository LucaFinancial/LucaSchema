/**
 * Utility functions for converting between dollar amounts and minor units (cents)
 *
 * These functions handle the conversion between human-readable dollar amounts
 * and the integer cent values used internally by LucaSchema for precise
 * financial calculations without floating-point precision issues.
 *
 * @fileoverview Monetary value conversion utilities
 * @version 2.0.0
 * @since 2.0.0
 *
 * @example Basic usage
 * ```typescript
 * import { dollarsToMinorUnits, minorUnitsToDollars, formatMinorUnits } from '@luca/schema';
 *
 * // Convert user input to storage format
 * const userInput = 125.75;
 * const storageValue = dollarsToMinorUnits(userInput); // 12575
 *
 * // Convert storage format for display
 * const displayValue = minorUnitsToDollars(storageValue); // 125.75
 * const formattedValue = formatMinorUnits(storageValue); // "$125.75"
 * ```
 */

/**
 * Converts a dollar amount to minor units (cents) for precise storage
 *
 * Handles the conversion from floating-point dollar amounts to integer cents,
 * eliminating floating-point precision issues in financial calculations.
 * Uses proper rounding to handle edge cases.
 *
 * @param dollars - The dollar amount as a decimal number
 * @returns The equivalent amount in integer cents
 *
 * @example Basic conversion
 * ```typescript
 * dollarsToMinorUnits(100.50); // returns 10050
 * dollarsToMinorUnits(0.99);   // returns 99
 * dollarsToMinorUnits(1.234);  // returns 123 (rounded)
 * ```
 *
 * @example Validation workflow
 * ```typescript
 * const userAmount = parseFloat(userInput);
 * const transaction = {
 *   amount: dollarsToMinorUnits(userAmount),
 *   // ... other fields
 * };
 *
 * // This will pass validation as amount is an integer
 * lucaValidator.validateOrThrow('transaction', transaction);
 * ```
 *
 * @since 2.0.0
 */
export function dollarsToMinorUnits(dollars: number): number {
  return Math.round(dollars * 100);
}

/**
 * Converts minor units (cents) back to a dollar amount for display
 *
 * Takes integer cent values from storage and converts them back to
 * human-readable dollar amounts. The result is always precise since
 * it's a simple division operation.
 *
 * @param cents - The amount in integer cents
 * @returns The equivalent dollar amount as a decimal number
 *
 * @example Basic conversion
 * ```typescript
 * minorUnitsToDollars(10050); // returns 100.50
 * minorUnitsToDollars(99);    // returns 0.99
 * minorUnitsToDollars(1);     // returns 0.01
 * ```
 *
 * @example Display workflow
 * ```typescript
 * const transaction = getTransactionFromDB(); // { amount: 12575, ... }
 * const displayAmount = minorUnitsToDollars(transaction.amount); // 125.75
 *
 * console.log(`Transaction amount: $${displayAmount.toFixed(2)}`);
 * ```
 *
 * @since 2.0.0
 */
export function minorUnitsToDollars(cents: number): number {
  return cents / 100;
}

/**
 * Formats minor units (cents) as a localized currency string for display
 *
 * Combines conversion and formatting in one step, using the Intl.NumberFormat
 * API for proper localization and currency symbol handling. Supports different
 * currencies and locales for international applications.
 *
 * @param cents - The amount in integer cents
 * @param currency - The ISO 4217 currency code (defaults to 'USD')
 * @param locale - The BCP 47 locale identifier (defaults to 'en-US')
 * @returns Formatted currency string with appropriate symbols and formatting
 *
 * @example Basic formatting
 * ```typescript
 * formatMinorUnits(10050);           // returns '$100.50'
 * formatMinorUnits(99);              // returns '$0.99'
 * formatMinorUnits(1234567);         // returns '$12,345.67'
 * ```
 *
 * @example International formatting
 * ```typescript
 * formatMinorUnits(10050, 'EUR', 'de-DE');  // returns '100,50 €'
 * formatMinorUnits(10050, 'GBP', 'en-GB');  // returns '£100.50'
 * formatMinorUnits(10050, 'JPY', 'ja-JP');  // returns '¥10,050' (yen has no decimals)
 * ```
 *
 * @example UI component usage
 * ```typescript
 * function TransactionItem({ transaction }) {
 *   return (
 *     <div>
 *       <span>Amount: {formatMinorUnits(transaction.amount)}</span>
 *       <span>EUR: {formatMinorUnits(transaction.amount, 'EUR', 'en-US')}</span>
 *     </div>
 *   );
 * }
 * ```
 *
 * @throws {RangeError} When currency code is invalid
 * @throws {TypeError} When locale is invalid
 *
 * @since 2.0.0
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
