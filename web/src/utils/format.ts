// Locale-aware formatters — Demo. Re-uses Intl when supported.
// Centralised to avoid mixing locale strings across the launchboard.

import type { Currency, Locale, Region } from '../types';

export function formatCurrency(amount: number, currency: Currency, locale: Locale): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    // Fallback when currency code is unknown to the runtime.
    const symbol = currency === 'TWD' ? 'NT$ ' : currency === 'USD' ? '$ ' : '';
    return `${symbol}${amount.toLocaleString(locale)}`;
  }
}

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale).format(value);
}

export function formatStock(value: number, locale: Locale): string {
  // UI-SPEC §2.2: inventory units must not be hard-coded to a structure.
  return `${formatNumber(value, locale)} units`;
}

export function formatDateTime(date: Date, locale: Locale, region: Region): string {
  try {
    return new Intl.DateTimeFormat(locale, {
      timeZone: region,
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  } catch {
    return date.toISOString();
  }
}

export function formatDateOnly(date: Date, locale: Locale, region: Region): string {
  try {
    return new Intl.DateTimeFormat(locale, {
      timeZone: region,
      dateStyle: 'long',
    }).format(date);
  } catch {
    return date.toISOString();
  }
}

export function localeLabel(locale: Locale): string {
  return locale === 'zh-Hant' ? '繁中' : locale === 'en-US' ? 'EN' : locale;
}

export function currencyLabel(currency: Currency): string {
  return currency;
}
