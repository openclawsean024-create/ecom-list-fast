// Top bar — breadcrumbs + locale / region / live / avatar controls.

import type { JSX } from 'react';
import type { Currency, Locale, Region } from '../types';
import { currencyLabel, localeLabel } from '../utils/format';

interface Props {
  workspaceName: string;
  currentNav: string;
  locale: Locale;
  currency: Currency;
  region: Region;
  onCycleLocale: () => void;
  onCycleRegion: () => void;
}

export function TopBar({
  workspaceName,
  currentNav,
  locale,
  currency,
  region,
  onCycleLocale,
  onCycleRegion,
}: Props): JSX.Element {
  return (
    <header className="top">
      <div className="breadcrumbs" aria-label="Breadcrumb">
        {workspaceName} <span aria-hidden="true">/</span>{' '}
        <strong>{currentNav}</strong>
      </div>
      <div className="top-right">
        <button
          type="button"
          className="selector"
          onClick={onCycleLocale}
          aria-label={`Locale ${localeLabel(locale)}, click to switch`}
        >
          {localeLabel(locale)} / {currencyLabel(currency)}
        </button>
        <button
          type="button"
          className="selector"
          onClick={onCycleRegion}
          aria-label={`Timezone ${region}, click to switch`}
        >
          {region}
        </button>
        <span className="live" aria-label="Live sync, demo mode">
          <i aria-hidden="true" /> Live sync
        </span>
        <button className="avatar" type="button" aria-label="Mavis Chen">M</button>
      </div>
    </header>
  );
}
