// Listing flow swimlane — Draft / Ready / Live / Needs attention.

import type { JSX } from 'react';
import type { ListingStatus, ProductRecord } from '../types';

interface Lane {
  readonly key: ListingStatus;
  readonly title: string;
  readonly alert?: boolean;
  readonly products: ReadonlyArray<ProductRecord>;
}

interface Props {
  lanes: ReadonlyArray<Lane>;
  onOpenAllListings: () => void;
  onOpenProduct: (id: string) => void;
}

export function ListingFlow({ lanes, onOpenAllListings, onOpenProduct }: Props): JSX.Element {
  return (
    <section className="surface flow" aria-labelledby="flow-title">
      <div className="surface-head">
        <div>
          <h2 id="flow-title">Listing flow</h2>
          <p>One product record, four channel outcomes.</p>
        </div>
        <button type="button" className="surface-link" onClick={onOpenAllListings}>
          View all listings ↗
        </button>
      </div>
      <div className="lanes">
        {lanes.map((lane) => (
          <div key={lane.key} className={`lane${lane.alert ? ' alert' : ''}`} aria-label={`${lane.title} lane`}>
            <div className="lane-head">
              <span>{lane.title}</span>
              <b aria-label={`${lane.products.length} items`}>{lane.products.length.toString().padStart(2, '0')}</b>
            </div>
            {lane.products.length === 0 ? (
              <div className="cards cards--empty" role="status">
                這條 lane 目前沒有項目。
              </div>
            ) : (
              <div className="cards">
                {lane.products.map((product) => (
                  <ProductCard key={product.id} product={product} onOpen={onOpenProduct} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

interface CardProps {
  product: ProductRecord;
  onOpen: (id: string) => void;
}

function ProductCard({ product, onOpen }: CardProps): JSX.Element {
  const footer = product.missingFields
    ? `${product.missingFields} fields missing`
    : product.contentCoverage !== undefined
    ? `content ${product.contentCoverage}%`
    : product.lastChange;
  const flagClass = product.status === 'Live' || product.status === 'Ready' ? 'flag live' : 'flag warn';
  const flagText = product.status === 'Live' ? '●' : product.status === 'Ready' ? '✓' : '!';
  const localeShort = product.locale === 'zh-Hant' ? 'TW' : 'US';

  return (
    <button
      type="button"
      className="item"
      onClick={() => onOpen(product.id)}
      aria-label={`Open ${product.name}, status ${product.status}`}
    >
      <div className="item-top">
        <div className={`thumb ${product.thumbColor}`} aria-hidden="true">{product.thumbChar}</div>
        <span className="flag" aria-hidden="true">{localeShort}</span>
      </div>
      <div className="item-title">{product.name}</div>
      <div className="item-sku">{product.sku}</div>
      <div className="item-foot">
        <span>{footer}</span>
        <span className={flagClass} aria-hidden="true">{flagText}</span>
      </div>
    </button>
  );
}
