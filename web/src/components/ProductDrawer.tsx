// Product detail drawer — focus trap + Escape + restore focus.

import { useEffect, useRef } from 'react';
import type { JSX } from 'react';
import type { Locale, ProductChannelOutcome, ProductRecord } from '../types';
import { formatNumber, formatStock, formatCurrency } from '../utils/format';

interface Props {
  product: ProductRecord | null;
  locale: Locale;
  onClose: () => void;
  onOpenReview: () => void;
}

export function ProductDrawer({ product, locale, onClose, onOpenReview }: Props): JSX.Element {
  const open = product !== null;
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === 'Tab' && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  return (
    <div
      className={`backdrop${open ? ' open' : ''}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <aside
        ref={drawerRef}
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        aria-hidden={!open}
      >
        {product && (
          <>
            <div className="drawer-head">
              <div>
                <div className="drawer-kicker">Normalized product record</div>
                <h2 id="drawer-title">{product.name}</h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                className="close"
                onClick={onClose}
                aria-label="Close product details"
              >
                ×
              </button>
            </div>
            <div className={`hero-product ${product.thumbColor}`} aria-hidden="true">
              {product.thumbChar}
            </div>
            <div className="detail-grid">
              <div className="detail">
                <span>SKU</span>
                <b>{product.sku}</b>
              </div>
              <div className="detail">
                <span>Available</span>
                <b>{formatStock(product.available, locale)}</b>
              </div>
              <div className="detail">
                <span>Base price</span>
                <b>{formatCurrency(product.basePrice, product.baseCurrency, locale)}</b>
              </div>
              <div className="detail">
                <span>Coverage</span>
                <b>{product.channelStatuses.length} channels</b>
              </div>
            </div>
            <div className="drawer-section">
              <h3>Channel outcomes</h3>
              {product.channelStatuses.length === 0 ? (
                <div className="empty">尚未推到任何通路。</div>
              ) : (
                product.channelStatuses.map((outcome) => <ChannelRow key={outcome.channel} outcome={outcome} />)
              )}
            </div>
            <div className="drawer-note">
              ⌁ This record is the source of truth. Channel-specific edits are tracked as overrides and appear
              in the activity log.
            </div>
            <button
              type="button"
              className="btn primary"
              style={{ width: '100%', marginTop: 20 }}
              onClick={onOpenReview}
              aria-label="Open listing review (Demo)"
            >
              Open listing review ↗
            </button>
          </>
        )}
      </aside>
    </div>
  );
}

const STATUS_LABEL: Record<ProductChannelOutcome['status'], string> = {
  Live: 'Live',
  Ready: 'Ready',
  Review: 'Review',
  NotConnected: 'Not connected',
};

const STATUS_CLASS: Record<ProductChannelOutcome['status'], string> = {
  Live: 'status live',
  Ready: 'status ready',
  Review: 'status warn',
  NotConnected: 'status warn',
};

function ChannelRow({ outcome }: { outcome: ProductChannelOutcome }): JSX.Element {
  const liveCount = Number(outcome.price.replace(/[^0-9]/g, '')) || 0;
  const detail = `${outcome.title === '—' ? 'Not connected' : outcome.title} · ${outcome.price === '—' ? 'Demo' : outcome.price}`;
  return (
    <div className="channel-detail">
      <div>
        <b>{outcome.channel}</b>
        <span>{detail}</span>
      </div>
      <strong className={STATUS_CLASS[outcome.status]} aria-label={`Price ${formatNumber(liveCount, 'en-US')}, ${STATUS_LABEL[outcome.status]}`}>
        {STATUS_LABEL[outcome.status]}
      </strong>
    </div>
  );
}
