// Launchboard domain types — Demo only; not a real catalog model.
// Mirrors PRD/UI-SPEC.md §2.3 (channel, region, locale, currency, listingStatus).

export type Locale = 'zh-Hant' | 'en-US';
export type Currency = 'TWD' | 'USD' | 'JPY' | 'EUR';
export type Region = 'Asia/Taipei' | 'Asia/Tokyo' | 'Europe/Berlin' | 'America/Los_Angeles';

export type ListingStatus = 'Draft' | 'Ready' | 'Live' | 'NeedsAttention';
export type ChannelStatus = 'Connected' | 'ActionNeeded' | 'NotConnected';
export type ChannelKey = 'shopee' | 'ruten' | 'yahoo' | 'shopify';

export interface ChecklistItem {
  readonly id: string;
  readonly label: string;
  readonly state: 'done' | 'warn' | 'pending';
}

export interface Channel {
  readonly key: ChannelKey;
  readonly name: string;
  readonly region: Region;
  readonly currency: Currency;
  readonly status: ChannelStatus;
  readonly liveCount: number;
  readonly hint: string;
}

export interface ProductChannelOutcome {
  readonly channel: ChannelKey;
  readonly status: 'Live' | 'Ready' | 'Review' | 'NotConnected';
  readonly title: string;
  readonly price: string;
}

export interface ProductRecord {
  readonly id: string;
  readonly sku: string;
  readonly name: string;
  readonly thumbChar: string;
  readonly thumbColor: 't-sand' | 't-lilac' | 't-mint' | 't-blue';
  readonly locale: Locale;
  readonly status: ListingStatus;
  readonly basePrice: number;
  readonly baseCurrency: Currency;
  readonly available: number;
  readonly safetyBuffer: number;
  readonly channelStatuses: ReadonlyArray<ProductChannelOutcome>;
  readonly lastChange: string;
  readonly note?: string;
  readonly contentCoverage?: number;
  readonly missingFields?: number;
}

export interface ActivityItem {
  readonly id: string;
  readonly icon: string;
  readonly actor: string;
  readonly action: string;
  readonly target: string;
  readonly timestamp: string;
}

export interface InventoryRule {
  readonly id: string;
  readonly name: string;
  readonly scope: string;
  readonly description: string;
  readonly segments: ReadonlyArray<'active' | 'warn' | 'inactive'>;
  readonly severity: 'active' | 'warn';
}
