// Sidebar — workspace brand, nav groups, plan meter.

import type { JSX } from 'react';

export interface SidebarItem {
  readonly id: string;
  readonly icon: string;
  readonly label: string;
  readonly badge?: number;
}

const OPERATE_ITEMS: ReadonlyArray<SidebarItem> = [
  { id: 'Launchboard', icon: '⌁', label: 'Launchboard' },
  { id: 'Catalog', icon: '▦', label: 'Catalog' },
  { id: 'Listings', icon: '↗', label: 'Listings', badge: 18 },
  { id: 'Orders', icon: '≡', label: 'Orders' },
  { id: 'Channels', icon: '◎', label: 'Channels' },
  { id: 'Analytics', icon: '◒', label: 'Analytics' },
];

const MANAGE_ITEMS: ReadonlyArray<SidebarItem> = [
  { id: 'Rules', icon: '◌', label: 'Inventory rules' },
  { id: 'Activity', icon: '◷', label: 'Activity log' },
];

interface Props {
  workspaceName: string;
  productCount: number;
  productCapacity: number;
  active: string;
  onSelect: (id: string) => void;
}

export function Sidebar({
  workspaceName,
  productCount,
  productCapacity,
  active,
  onSelect,
}: Props): JSX.Element {
  return (
    <aside className="sidebar" aria-label="Workspace sidebar">
      <div className="brand">
        <div className="mark" style={{ width: 31, height: 31, fontSize: 15 }} aria-hidden="true">↗</div>
        <div>
          <strong>上架快手</strong>
          <small>Commerce OS</small>
        </div>
      </div>

      <div className="shop">
        <div className="shop-label">Workspace</div>
        <div className="shop-row">
          <span>{workspaceName}</span>
          <span aria-hidden="true">⌄</span>
        </div>
      </div>

      <NavGroup items={OPERATE_ITEMS} active={active} onSelect={onSelect} title="Operate" />
      <NavGroup items={MANAGE_ITEMS} active={active} onSelect={onSelect} title="Manage" />

      <div className="side-bottom">
        <p>Product capacity</p>
        <div
          className="meter"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round((productCount / productCapacity) * 100)}
          aria-label={`${productCount} of ${productCapacity} products`}
        >
          <span style={{ width: `${Math.min(100, (productCount / productCapacity) * 100)}%` }} />
        </div>
        <div className="plan-row">
          <span>Pro workspace</span>
          <b>
            {productCount} / {productCapacity}
          </b>
        </div>
      </div>
    </aside>
  );
}

interface NavGroupProps {
  items: ReadonlyArray<SidebarItem>;
  active: string;
  onSelect: (id: string) => void;
  title: string;
}

function NavGroup({ items, active, onSelect, title }: NavGroupProps): JSX.Element {
  return (
    <div>
      <div className="nav-title">{title}</div>
      <nav className="nav" aria-label={`${title} navigation`}>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={active === item.id ? 'active' : ''}
            aria-current={active === item.id ? 'page' : undefined}
            onClick={() => onSelect(item.id)}
          >
            <span className="nav-icon" aria-hidden="true">{item.icon}</span>
            {item.label}
            {typeof item.badge === 'number' && (
              <span className="nav-count" aria-label={`${item.badge} pending`}>
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
