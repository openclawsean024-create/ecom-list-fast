// Inventory rules — surfaces rule cards with severity bars.

import type { JSX } from 'react';
import type { InventoryRule } from '../types';

interface Props {
  rules: ReadonlyArray<InventoryRule>;
}

const SEGMENT_LABEL: Record<InventoryRule['segments'][number], string> = {
  active: 'on',
  warn: 'review',
  inactive: 'off',
};

export function InventoryRules({ rules }: Props): JSX.Element {
  return (
    <section className="surface rules" aria-labelledby="rules-title">
      <div className="surface-head">
        <div>
          <h2 id="rules-title">Inventory rules</h2>
          <p>How available stock, pricing and listings are governed.</p>
        </div>
      </div>
      {rules.length === 0 ? (
        <div className="empty" role="status">
          目前沒有規則。建立第一條之後，這裡會顯示狀態。
        </div>
      ) : (
        rules.map((rule) => (
          <article key={rule.id} className="rule-card" aria-labelledby={`rule-${rule.id}`}>
            <div className="rule-top">
              <b id={`rule-${rule.id}`}>{rule.name}</b>
              <span>{rule.scope}</span>
            </div>
            <p>{rule.description}</p>
            <div
              className="rule-bar"
              role="meter"
              aria-valuemin={0}
              aria-valuemax={rule.segments.length}
              aria-valuenow={rule.segments.filter((s) => s === 'active').length}
              aria-label={`${rule.name} segments: ${rule.segments
                .map((segment) => SEGMENT_LABEL[segment])
                .join(', ')}`}
            >
              {rule.segments.map((segment, index) => (
                <i key={index} className={segment} aria-hidden="true" />
              ))}
            </div>
          </article>
        ))
      )}
    </section>
  );
}
