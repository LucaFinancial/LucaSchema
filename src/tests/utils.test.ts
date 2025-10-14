import {
  dollarsToMinorUnits,
  minorUnitsToDollars,
  formatMinorUnits
} from '../utils';

describe('Currency utility functions', () => {
  describe('dollarsToMinorUnits', () => {
    test('converts dollars to cents correctly', () => {
      expect(dollarsToMinorUnits(100.5)).toBe(10050);
      expect(dollarsToMinorUnits(0.99)).toBe(99);
      expect(dollarsToMinorUnits(1000)).toBe(100000);
      expect(dollarsToMinorUnits(0.01)).toBe(1);
      expect(dollarsToMinorUnits(0)).toBe(0);
    });

    test('handles rounding for precision issues', () => {
      expect(dollarsToMinorUnits(0.1 + 0.2)).toBe(30); // 0.1 + 0.2 = 0.30000000000000004
    });
  });

  describe('minorUnitsToDollars', () => {
    test('converts cents to dollars correctly', () => {
      expect(minorUnitsToDollars(10050)).toBe(100.5);
      expect(minorUnitsToDollars(99)).toBe(0.99);
      expect(minorUnitsToDollars(100000)).toBe(1000);
      expect(minorUnitsToDollars(1)).toBe(0.01);
      expect(minorUnitsToDollars(0)).toBe(0);
    });
  });

  describe('formatMinorUnits', () => {
    test('formats US dollars correctly', () => {
      expect(formatMinorUnits(10050)).toBe('$100.50');
      expect(formatMinorUnits(99)).toBe('$0.99');
      expect(formatMinorUnits(100000)).toBe('$1,000.00');
      expect(formatMinorUnits(1)).toBe('$0.01');
      expect(formatMinorUnits(0)).toBe('$0.00');
    });

    test('formats other currencies correctly', () => {
      // Note: Euro formatting may vary based on system locale
      const euroFormatted = formatMinorUnits(10050, 'EUR', 'de-DE');
      expect(euroFormatted).toContain('100,50');
      expect(euroFormatted).toContain('€');

      expect(formatMinorUnits(10050, 'GBP', 'en-GB')).toBe('£100.50');
    });
  });

  describe('round-trip conversions', () => {
    test('maintains precision through conversion cycles', () => {
      const originalAmounts = [100.5, 0.99, 1000, 0.01, 0];

      for (const original of originalAmounts) {
        const cents = dollarsToMinorUnits(original);
        const backToDollars = minorUnitsToDollars(cents);
        expect(backToDollars).toBe(original);
      }
    });
  });
});
