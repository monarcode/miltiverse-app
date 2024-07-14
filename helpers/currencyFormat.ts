/**
 * Formats a given number or numeric string into a currency string.
 *
 * @param {number | string} value - The numeric value to format. Can be a number or a string that can be converted to a number.
 * @param {string} [locale="en-US"] - The locale string that determines the format of the currency, defaults to "en-US".
 * @param {string} [currency="USD"] - The currency code (ISO 4217) to use in formatting, defaults to "USD".
 * @returns {string} - The formatted currency string.
 *
 * @throws {Error} - Throws an error if the provided value cannot be converted to a valid number.
 *
 * @example
 * // Basic usage
 * formatCurrency(1234.56); // "$1,234.56"
 *
 * @example
 * // Specifying locale and currency
 * formatCurrency(1234.56, "de-DE", "EUR"); // "1.234,56 €"
 *
 * @example
 * // Using a numeric string value
 * formatCurrency("789.12"); // "$789.12"
 *
 * @example
 * // Handling invalid numeric string
 * try {
 *   formatCurrency("invalid");
 * } catch (e) {
 *   console.error(e.message); // "Invalid numeric value provided"
 * }
 */
export function formatCurrency(
  value: number | string,
  currency: string = 'NGN',
  minimumFractionDigits: number = 0,
  maximumFractionDigits: number = 0
): string {
  // Convert string to number if necessary
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;

  // Check if the conversion resulted in a valid number
  if (isNaN(numericValue)) {
    throw new Error('Invalid numeric value provided');
  }

  // Create a currency formatter
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits,
    maximumFractionDigits,
  });

  // Format and return the value
  return formatter.format(numericValue);
}
