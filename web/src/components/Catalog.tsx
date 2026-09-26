// Catalog — tabs, search, status filter, table with channel pill set.

import type { JSX } from 'react';
import type { Locale, ProductRecord } from '../types';
import { formatNumber } from '../utils/format';
import type { FilterValue } from '../hooks/useLaunchboard';
import type { ChannelKey } from '../types';

interface Props {
  products: ReadonlyArray<ProductRecord>;
  filteredRows: ReadonlyArray<ProductRecord>;
  search: string;
  onSearchChange: (value: string) => void;
  filter: FilterValue;
  onFilterChange: (value: FilterValue) => void;
  onOpenCatalog: () => void;
  onOpenProduct: (id: string) => void;
  locale: Locale;
  attentionCount: number;
  liveCount: number;
}

const STATUS_LABEL: Record<FilterValue, string> = {
  all: 'All status',
  attention: 'Needs attention',
  live: 'Live',
};

const TAB_LABELS: ReadonlyArray<{ value: FilterValue; label: string; count?: number; countColor?: string }> = [
  { value: 'all', label: 'All products' },
  { value: 'attention', label: 'Needs attention' },
  { value: 'live', label: 'Live' },
];

const PILL_TEXT: Record<ChannelKey, string> = {
  shopee: '蝦',
  ruten: '露',
  yahoo: 'Y!',
  shopify: 'S',
};

const PILL_CLASS: Record<ChannelKey, string> = {
  shopee: 'shopee',
  ruten: 'ruten',
  yahoo: 'yahoo',
  shopify: 'shopify',
};

const STATUS_PILL: Record<ProductRecord['status'], { label: string; className: string }> = {
  Draft: { label: 'Draft', className: 'status warn' },
  Ready: { label: 'Ready', className: 'status ready' },
  Live: { label: 'Live', className: 'status live' },
  NeedsAttention: { label: 'Action needed', className: 'status warn' },
};

export function Catalog({
  products,
  filteredRows,
  search,
  onSearchChange,
  filter,
  onFilterChange,
  onOpenCatalog,
  onOpenProduct,
  locale,
  attentionCount,
  liveCount,
}: Props): JSX.Element {
  return (
    <section className="surface catalog" aria-labelledby="catalog-title">
      <div className="surface-head">
        <div>
          <h2 id="catalog-title">Catalog</h2>
          <p>{formatNumber(products.length, locale)} products · normalized product records</p>
        </div>
        <button type="button" className="surface-link" onClick={onOpenCatalog}>
          Open catalog ↗
        </button>
      </div>
      <div className="catalog-tabs" role="tablist" aria-label="Catalog filter tabs">
        {TAB_LABELS.map((tab) => {
          if (tab.value === 'attention') {
            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={filter === tab.value}
                className={filter === tab.value ? 'active' : ''}
                onClick={() => onFilterChange(tab.value)}
              >
                {tab.label}{' '}
                <span style={{ color: 'var(--red)' }}>{attentionCount.toString().padStart(2, '0')}</span>
              </button>
            );
          }
          if (tab.value === 'live') {
            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={filter === tab.value}
                className={filter === tab.value ? 'active' : ''}
                onClick={() => onFilterChange(tab.value)}
              >
                {tab.label} <span>{liveCount.toString().padStart(2, '0')}</span>
              </button>
            );
          }
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={filter === tab.value}
              className={filter === tab.value ? 'active' : ''}
              onClick={() => onFilterChange(tab.value)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="search-row">
        <div className="search">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={search}
            placeholder="Search name, SKU or channel"
            aria-label="Search name, SKU or channel"
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
        <select
          className="mini-select"
          value={filter}
          onChange={(event) => onFilterChange(event.target.value as FilterValue)}
          aria-label="Catalog filter"
        >
          <option value="all">{STATUS_LABEL.all}</option>
          <option value="attention">{STATUS_LABEL.attention}</option>
          <option value="live">{STATUS_LABEL.live}</option>
        </select>
      </div>
      <div className="table-wrap">
        {filteredRows.length === 0 ? (
          <div className="empty" role="status">
            沒有符合條件的商品。試試清除搜尋或切回 All products。
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Available</th>
                <th scope="col">Channels</th>
                <th scope="col">Last change</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.id} onClick={() => onOpenProduct(row.id)} style={{ cursor: 'pointer' }}>
                  <td>
                    <div className="product">
                      <div className={`product-thumb ${row.thumbColor}`} aria-hidden="true">{row.thumbChar}</div>
                      <div className="product-name">
                        <b>{row.name}</b>
                        <small>{row.sku}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`stock${row.available <= 5 ? ' low' : ''}`}>{row.available}</span>{' '}
                    <span aria-hidden="true">units</span>
                  </td>
                  <td>
                    <div className="pill-set" aria-label="Channel coverage">
                      {(['shopee', 'ruten', 'yahoo', 'shopify'] as ChannelKey[]).map((key) => {
                        const outcome = row.channelStatuses.find((c) => c.channel === key);
                        const live = outcome?.status === 'Live' || outcome?.status === 'Ready';
                        return (
                          <span
                            key={key}
                            className={`pill ${PILL_CLASS[key]}${live ? '' : ' off'}`}
                            title={`${key} · ${outcome?.status ?? 'NotConnected'}`}
                          >
                            {PILL_TEXT[key]}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td>{row.lastChange}</td>
                  <td>
                    <span className={STATUS_PILL[row.status].className}>{STATUS_PILL[row.status].label}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
