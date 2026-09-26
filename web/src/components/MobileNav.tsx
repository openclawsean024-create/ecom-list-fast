// Mobile bottom navigation — only rendered on small screens via CSS.

import type { JSX } from 'react';

interface NavItem {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
}

const ITEMS: ReadonlyArray<NavItem> = [
  { id: 'Launchboard', label: 'Launchboard', icon: '⌁' },
  { id: 'Catalog', label: 'Catalog', icon: '▦' },
  { id: 'Listings', label: 'Listings', icon: '↗' },
  { id: 'Channels', label: 'Channels', icon: '◎' },
  { id: 'Activity', label: 'Activity', icon: '◷' },
];

interface Props {
  active: string;
  onSelect: (id: string) => void;
}

export function MobileNav({ active, onSelect }: Props): JSX.Element {
  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      {ITEMS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={active === item.id ? 'active' : ''}
          aria-current={active === item.id ? 'page' : undefined}
          onClick={() => onSelect(item.id)}
        >
          <span aria-hidden="true">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </nav>
  );
}
