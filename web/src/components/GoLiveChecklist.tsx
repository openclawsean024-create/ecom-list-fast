// Go-live checklist — mirrors prototype cards. Demo only.

import type { JSX } from 'react';
import type { ChecklistItem } from '../types';

interface Props {
  items: ReadonlyArray<ChecklistItem>;
  completed: number;
  total: number;
  onContinue: () => void;
}

export function GoLiveChecklist({ items, completed, total, onContinue }: Props): JSX.Element {
  return (
    <section className="go-live" aria-labelledby="go-live-title">
      <div>
        <h2 id="go-live-title">
          Go-live checklist <span style={{ color: 'var(--acid)' }}>/ {completed} of {total} complete</span>
        </h2>
        <p>Finish your workspace setup once. Every new channel can reuse the same product and inventory model.</p>
        <div className="checklist" aria-label={`${completed} of ${total} complete`}>
          {items.map((item) => (
            <span
              key={item.id}
              className={`check ${item.state === 'done' ? 'done' : item.state === 'warn' ? 'warn' : ''}`}
              aria-label={item.state === 'done' ? `Done: ${item.label}` : item.state === 'warn' ? `Pending: ${item.label}` : item.label}
            >
              {item.state === 'done' ? '✓ ' : item.state === 'warn' ? '! ' : ''}
              {item.label}
            </span>
          ))}
        </div>
      </div>
      <button type="button" className="btn acid" onClick={onContinue}>
        Continue setup ↗
      </button>
    </section>
  );
}
