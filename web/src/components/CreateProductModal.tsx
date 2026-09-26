// Create product modal — focus trap, validation, Demo save.

import { useEffect, useRef, useState } from 'react';
import type { JSX } from 'react';
import type { Currency } from '../types';
import type { NewProductDraft } from '../hooks/useLaunchboard';

interface Props {
  open: boolean;
  draft: NewProductDraft;
  errors: ReadonlyArray<string>;
  onChange: (next: NewProductDraft) => void;
  onClose: () => void;
  onSave: () => void;
}

const CURRENCY_OPTIONS: ReadonlyArray<{ value: Currency; label: string }> = [
  { value: 'TWD', label: 'TWD' },
  { value: 'USD', label: 'USD' },
  { value: 'JPY', label: 'JPY' },
  { value: 'EUR', label: 'EUR' },
];

export function CreateProductModal({ open, draft, errors, onChange, onClose, onSave }: Props): JSX.Element {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!open) {
      setTouched(false);
      return;
    }
    const previouslyFocused = document.activeElement as HTMLElement | null;
    firstFieldRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input:not([type="hidden"]), select, [tabindex]:not([tabindex="-1"])',
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

  const showErrors = touched && errors.length > 0;

  return (
    <div
      className={`backdrop${open ? ' open' : ''}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        ref={modalRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-hidden={!open}
      >
        <div className="drawer-head">
          <div>
            <div className="drawer-kicker">Create product record</div>
            <h2 id="modal-title">New product</h2>
          </div>
          <button
            type="button"
            className="close"
            onClick={onClose}
            aria-label="Close new product"
          >
            ×
          </button>
        </div>
        <p>
          Build one normalized product record first. Localization, channel rules and inventory policies are
          applied after the record is ready.
        </p>
        <form
          className="form"
          aria-describedby={showErrors ? 'modal-errors' : undefined}
          onSubmit={(event) => {
            event.preventDefault();
            setTouched(true);
            onSave();
          }}
        >
          {showErrors && (
            <div id="modal-errors" className="error-panel" role="alert">
              <b>請修正下列欄位：</b>
              <ul style={{ margin: '8px 0 0 18px', padding: 0 }}>
                {errors.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            </div>
          )}
          <label className="full">
            Product name
            <input
              ref={firstFieldRef}
              type="text"
              value={draft.name}
              placeholder="e.g. Morning light ceramic mug"
              aria-invalid={showErrors && draft.name.trim().length < 2 ? 'true' : 'false'}
              onChange={(event) => onChange({ ...draft, name: event.target.value })}
              required
            />
          </label>
          <label>
            SKU
            <input
              type="text"
              value={draft.sku}
              placeholder="MUG-001-WH"
              aria-invalid={showErrors && draft.sku.trim().length < 3 ? 'true' : 'false'}
              onChange={(event) => onChange({ ...draft, sku: event.target.value })}
              required
            />
          </label>
          <label>
            Base currency
            <select
              value={draft.currency}
              onChange={(event) => onChange({ ...draft, currency: event.target.value as Currency })}
            >
              {CURRENCY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Available stock
            <input
              type="number"
              min={0}
              value={draft.stock}
              placeholder="100"
              aria-invalid={showErrors && (draft.stock === '' || Number.isNaN(Number(draft.stock))) ? 'true' : 'false'}
              onChange={(event) => onChange({ ...draft, stock: event.target.value })}
              required
            />
          </label>
          <label>
            Safety buffer
            <input
              type="text"
              value={draft.buffer}
              placeholder="10%"
              onChange={(event) => onChange({ ...draft, buffer: event.target.value })}
            />
          </label>
        </form>
        <div className="modal-actions">
          <button type="button" className="btn" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn primary"
            onClick={() => {
              setTouched(true);
              onSave();
            }}
          >
            Save draft
          </button>
        </div>
      </div>
    </div>
  );
}
