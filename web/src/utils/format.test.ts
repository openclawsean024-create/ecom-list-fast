import { describe, expect, it } from 'vitest';
import {
  currencyLabel,
  formatCurrency,
  formatDateOnly,
  formatDateTime,
  formatNumber,
  formatStock,
  localeLabel,
} from './format';

describe('Launchboard formatters', () => {
  it('formats currency and stock values for the selected locale', () => {
    expect(formatCurrency(1280, 'TWD', 'zh-Hant')).toContain('1,280');
    expect(formatCurrency(1280, 'USD', 'en-US')).toContain('$1,280');
    expect(formatNumber(1234567, 'en-US')).toBe('1,234,567');
    expect(formatStock(12, 'en-US')).toBe('12 units');
  });

  it('formats date values with the requested timezone', () => {
    const date = new Date('2026-09-27T00:00:00.000Z');
    expect(formatDateTime(date, 'en-US', 'America/Los_Angeles')).toContain('Sep');
    expect(formatDateOnly(date, 'zh-Hant', 'Asia/Taipei')).toContain('2026');
  });

  it('exposes stable labels for supported selectors', () => {
    expect(localeLabel('zh-Hant')).toBe('繁中');
    expect(localeLabel('en-US')).toBe('EN');
    expect(currencyLabel('JPY')).toBe('JPY');
  });
});
