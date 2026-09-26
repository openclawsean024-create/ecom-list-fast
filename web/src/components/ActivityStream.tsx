// Activity stream — recent changes across the workspace.

import type { JSX } from 'react';
import type { ActivityItem } from '../types';

interface Props {
  items: ReadonlyArray<ActivityItem>;
  onOpenLog: () => void;
}

export function ActivityStream({ items, onOpenLog }: Props): JSX.Element {
  return (
    <section className="surface activity" aria-labelledby="activity-title">
      <div className="surface-head">
        <div>
          <h2 id="activity-title">Activity</h2>
          <p>Recent changes across your workspace.</p>
        </div>
        <button type="button" className="surface-link" onClick={onOpenLog}>
          Open log ↗
        </button>
      </div>
      <div className="activity-list" aria-live="polite">
        {items.length === 0 ? (
          <div className="empty">目前沒有 activity。</div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="activity-row">
              <div className="activity-icon" aria-hidden="true">{item.icon}</div>
              <div className="activity-copy">
                <b>{item.actor}</b> {item.action}
                <span>{item.target}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
