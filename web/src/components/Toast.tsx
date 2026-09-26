// Toast — non-blocking, auto-dismissed.

import type { JSX } from 'react';
import type { ToastMessage } from '../hooks/useLaunchboard';

interface Props {
  toast: ToastMessage | null;
}

export function Toast({ toast }: Props): JSX.Element {
  return (
    <div className={`toast${toast ? ' show' : ''}`} role="status" aria-live="polite">
      {toast?.text ?? ''}
    </div>
  );
}
