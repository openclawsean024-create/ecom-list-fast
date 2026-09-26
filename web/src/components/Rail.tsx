// 72px icon rail — ported from prototype. Demo only.

import type { JSX } from 'react';

const RAIL_ITEMS: ReadonlyArray<{ id: string; icon: string; label: string }> = [
  { id: 'launchboard', icon: '⌁', label: 'Launchboard' },
  { id: 'search', icon: '⌕', label: 'Command search' },
  { id: 'notifications', icon: '♢', label: 'Notifications' },
];

interface Props {
  activeId: string;
  onSelect: (id: string) => void;
}

export function Rail({ activeId, onSelect }: Props): JSX.Element {
  return (
    <aside className="rail" aria-label="Product rail">
      <div className="mark" aria-hidden="true">↗</div>
      <div className="rail-rule" aria-hidden="true" />
      <div role="navigation" aria-label="Workspace rail">
        {RAIL_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`rail-item${activeId === item.id ? ' active' : ''}`}
            aria-label={item.label}
            aria-current={activeId === item.id ? 'page' : undefined}
            onClick={() => onSelect(item.id)}
          >
            {item.icon}
          </button>
        ))}
      </div>
      <div className="rail-bottom">
        <span className="rail-dot" aria-hidden="true" />
        <button className="rail-user" type="button" aria-label="Mavis Chen">M</button>
      </div>
    </aside>
  );
}
