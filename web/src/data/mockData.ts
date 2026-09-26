// Mock data — mirrors prototype. Demo only, no backend in scope.
// Source: web/public/ecom-list-fast-international.html

import type {
  ActivityItem,
  ChecklistItem,
  Channel,
  InventoryRule,
  ProductRecord,
} from '../types';

export const checklist: ReadonlyArray<ChecklistItem> = [
  { id: 'workspace', label: 'Workspace connected', state: 'done' },
  { id: 'catalog', label: 'Catalog imported', state: 'done' },
  { id: 'currency', label: 'Default currency set', state: 'done' },
  { id: 'channel', label: 'Connect a channel', state: 'warn' },
];

export const channels: ReadonlyArray<Channel> = [
  {
    key: 'shopee',
    name: 'Shopee Taiwan',
    region: 'Asia/Taipei',
    currency: 'TWD',
    status: 'Connected',
    liveCount: 42,
    hint: 'Connected · 42 live',
  },
  {
    key: 'ruten',
    name: 'Ruten Taiwan',
    region: 'Asia/Taipei',
    currency: 'TWD',
    status: 'Connected',
    liveCount: 36,
    hint: 'Connected · 36 live',
  },
  {
    key: 'yahoo',
    name: 'Yahoo Shopping',
    region: 'Asia/Taipei',
    currency: 'TWD',
    status: 'ActionNeeded',
    liveCount: 0,
    hint: '1 action needed',
  },
  {
    key: 'shopify',
    name: 'Shopify Store',
    region: 'America/Los_Angeles',
    currency: 'USD',
    status: 'Connected',
    liveCount: 31,
    hint: 'Connected · 31 live',
  },
];

export const products: ReadonlyArray<ProductRecord> = [
  {
    id: 'mug-001',
    sku: 'MUG-001-WH',
    name: '晨光陶杯・霧米白',
    thumbChar: '杯',
    thumbColor: 't-sand',
    locale: 'zh-Hant',
    status: 'Ready',
    basePrice: 680,
    baseCurrency: 'TWD',
    available: 84,
    safetyBuffer: 10,
    channelStatuses: [
      { channel: 'shopee', status: 'Live', title: '晨光陶杯・霧米白', price: 'TWD 680' },
      { channel: 'ruten', status: 'Live', title: '晨光陶杯・霧米白', price: 'TWD 680' },
      { channel: 'yahoo', status: 'Review', title: '晨光陶杯・霧米白', price: 'TWD 680' },
      { channel: 'shopify', status: 'Ready', title: 'Morning light ceramic mug', price: 'USD 24' },
    ],
    lastChange: '8 min ago',
  },
  {
    id: 'home-014',
    sku: 'HOME-014-GF',
    name: '室內香氛禮盒・木質調',
    thumbChar: '香',
    thumbColor: 't-lilac',
    locale: 'zh-Hant',
    status: 'NeedsAttention',
    basePrice: 1280,
    baseCurrency: 'TWD',
    available: 3,
    safetyBuffer: 10,
    channelStatuses: [
      { channel: 'shopee', status: 'Live', title: '室內香氛禮盒・木質調', price: 'TWD 1,280' },
      { channel: 'ruten', status: 'Live', title: '室內香氛禮盒・木質調', price: 'TWD 1,280' },
      { channel: 'yahoo', status: 'NotConnected', title: '—', price: '—' },
      { channel: 'shopify', status: 'Ready', title: 'Wooden accord fragrance set', price: 'USD 45' },
    ],
    lastChange: '12 min ago',
    missingFields: 2,
  },
  {
    id: 'table-022',
    sku: 'TABLE-022-BG',
    name: '亞麻餐墊組・奶茶色',
    thumbChar: '布',
    thumbColor: 't-mint',
    locale: 'zh-Hant',
    status: 'Live',
    basePrice: 520,
    baseCurrency: 'TWD',
    available: 126,
    safetyBuffer: 10,
    channelStatuses: [
      { channel: 'shopee', status: 'Live', title: '亞麻餐墊組・奶茶色', price: 'TWD 520' },
      { channel: 'ruten', status: 'Live', title: '亞麻餐墊組・奶茶色', price: 'TWD 520' },
      { channel: 'yahoo', status: 'Live', title: '亞麻餐墊組・奶茶色', price: 'TWD 520' },
      { channel: 'shopify', status: 'Live', title: 'Linen placemat set', price: 'USD 18' },
    ],
    lastChange: 'synced 8m ago',
  },
  {
    id: 'vase-008',
    sku: 'VASE-008-SM',
    name: 'Handmade glass vase',
    thumbChar: '花',
    thumbColor: 't-blue',
    locale: 'en-US',
    status: 'Draft',
    basePrice: 1460,
    baseCurrency: 'TWD',
    available: 17,
    safetyBuffer: 5,
    channelStatuses: [
      { channel: 'shopee', status: 'Ready', title: 'Handmade glass vase', price: 'TWD 1,460' },
      { channel: 'ruten', status: 'Ready', title: 'Handmade glass vase', price: 'TWD 1,460' },
      { channel: 'yahoo', status: 'Review', title: 'Handmade glass vase', price: 'TWD 1,460' },
      { channel: 'shopify', status: 'Ready', title: 'Handmade glass vase', price: 'USD 49' },
    ],
    lastChange: '20 min ago',
    contentCoverage: 74,
  },
];

export const activity: ReadonlyArray<ActivityItem> = [
  {
    id: 'act-1',
    icon: '↗',
    actor: 'Mavis',
    action: 'updated price rules for Shopify',
    target: '8 minutes ago · VASE-008-SM',
    timestamp: '8m ago',
  },
  {
    id: 'act-2',
    icon: '✓',
    actor: 'Sync engine',
    action: 'published 4 listings',
    target: '12 minutes ago · 4 channels',
    timestamp: '12m ago',
  },
  {
    id: 'act-3',
    icon: '!',
    actor: 'Compliance',
    action: 'flagged Yahoo weight field for review',
    target: '24 minutes ago · MUG-001-WH',
    timestamp: '24m ago',
  },
  {
    id: 'act-4',
    icon: '＋',
    actor: 'Mavis',
    action: 'added safety buffer rule',
    target: '1 hour ago · TABLE-022-BG',
    timestamp: '1h ago',
  },
];

export const inventoryRules: ReadonlyArray<InventoryRule> = [
  {
    id: 'rule-safety',
    name: 'Safety buffer',
    scope: 'Workspace default · 10%',
    description: 'Hold-back stock before sync to avoid overselling during propagation delay.',
    segments: ['active', 'active', 'active', 'active', 'active'],
    severity: 'active',
  },
  {
    id: 'rule-price',
    name: 'Price markup · Shopify',
    scope: 'Channel · Shopify Store',
    description: 'Auto-convert TWD list price to USD using the daily reference rate.',
    segments: ['active', 'active', 'active', 'active', 'active'],
    severity: 'active',
  },
  {
    id: 'rule-low',
    name: 'Low-stock alert',
    scope: 'Workspace · ≤ 5 units',
    description: 'Notify the seller when available inventory drops to or below 5 units.',
    segments: ['active', 'active', 'active', 'warn', 'warn'],
    severity: 'warn',
  },
  {
    id: 'rule-suppress',
    name: 'Listing suppression',
    scope: 'Channel · Yahoo',
    description: 'Pause Yahoo listings whose required fields are incomplete.',
    segments: ['active', 'warn', 'warn', 'warn', 'inactive'],
    severity: 'warn',
  },
];

// Aggregations used by hero / overview surfaces.
export const summary = (() => {
  const total = products.length;
  const draft = products.filter((p) => p.status === 'Draft').length;
  const ready = products.filter((p) => p.status === 'Ready').length;
  const live = products.filter((p) => p.status === 'Live').length;
  const attention = products.filter((p) => p.status === 'NeedsAttention').length;
  return { total, draft, ready, live, attention };
})();
