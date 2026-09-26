// Channel coverage surface — 4 channels, locale + currency + health.

import type { JSX } from 'react';
import type { Channel } from '../types';

interface Props {
  channels: ReadonlyArray<Channel>;
  onManage: () => void;
  summary: string;
}

const CHANNEL_GLYPH: Record<Channel['key'], string> = {
  shopee: '蝦',
  ruten: '露',
  yahoo: 'Y!',
  shopify: 'S',
};

export function ChannelCoverage({ channels, onManage, summary }: Props): JSX.Element {
  return (
    <section className="surface coverage" aria-labelledby="coverage-title">
      <div className="surface-head">
        <div>
          <h2 id="coverage-title">Channel coverage</h2>
          <p>{summary}</p>
        </div>
        <button type="button" className="surface-link" onClick={onManage}>
          Manage ↗
        </button>
      </div>
      <div className="coverage-grid" role="list">
        {channels.map((channel) => {
          const dotClass = channel.status === 'ActionNeeded' ? 'dot warn' : 'dot';
          const label = `${channel.name}, ${channel.status === 'ActionNeeded' ? 'action needed' : `connected, ${channel.liveCount} live`}, ${channel.currency}`;
          return (
            <div key={channel.key} className="coverage-row" role="listitem" aria-label={label}>
              <div className={`channel-logo ${channel.key}`} aria-hidden="true">{CHANNEL_GLYPH[channel.key]}</div>
              <div>
                <div className="channel-name">{channel.name}</div>
                <div className="channel-meta">
                  <span className={dotClass} aria-hidden="true" />
                  {channel.hint}
                </div>
              </div>
              <div className="coverage-value">{channel.currency}</div>
            </div>
          );
        })}
      </div>
      <div className="coverage-footer">↗ Rules are applied from the product master. Channel overrides are reviewed before publish.</div>
    </section>
  );
}
