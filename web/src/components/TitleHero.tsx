// Title hero block — kicker, headline, primary / secondary actions.

import type { JSX } from 'react';

interface Props {
  dateLabel: string;
  pendingCount: number;
  attentionCount: number;
  onConnectChannel: () => void;
  onCreateProduct: () => void;
}

export function TitleHero({
  dateLabel,
  pendingCount,
  attentionCount,
  onConnectChannel,
  onCreateProduct,
}: Props): JSX.Element {
  return (
    <section className="title-row" aria-labelledby="page-title">
      <div>
        <div className="kicker">Global commerce workspace · {dateLabel}</div>
        <h1 id="page-title">
          Ship what is ready.
          <br />
          Fix what matters.
        </h1>
        <p>
          一個工作台管理商品、通路與同步例外。今天有 {pendingCount} 件 listing 待處理，其中{' '}
          {attentionCount} 件需要人工確認。
        </p>
      </div>
      <div className="actions">
        <button type="button" className="btn" onClick={onConnectChannel} aria-label="Connect a new sales channel (Demo)">
          ＋ Connect channel
        </button>
        <button
          type="button"
          className="btn primary"
          onClick={onCreateProduct}
          aria-label="Create a new product record"
        >
          ＋ New product
        </button>
      </div>
    </section>
  );
}
