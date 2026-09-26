// Launchboard UI state. Centralised so all panes share the same source.

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  activity,
  channels,
  checklist,
  inventoryRules,
  products,
  summary,
} from '../data/mockData';
import type {
  ActivityItem,
  Channel,
  ChecklistItem,
  Currency,
  InventoryRule,
  Locale,
  ProductRecord,
  Region,
} from '../types';

export type FilterValue = 'all' | 'attention' | 'live';

export interface ToastMessage {
  readonly id: number;
  readonly text: string;
}

export interface NewProductDraft {
  name: string;
  sku: string;
  currency: Currency;
  stock: string;
  buffer: string;
}

const EMPTY_DRAFT: NewProductDraft = {
  name: '',
  sku: '',
  currency: 'TWD',
  stock: '',
  buffer: '10%',
};

let toastId = 0;

export function useLaunchboard() {
  const [nav, setNav] = useState<string>('Launchboard');
  const [locale, setLocale] = useState<Locale>('zh-Hant');
  const [region, setRegion] = useState<Region>('Asia/Taipei');
  const [currency, setCurrency] = useState<Currency>('TWD');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterValue>('all');
  const [openProductId, setOpenProductId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState<NewProductDraft>(EMPTY_DRAFT);
  const [draftErrors, setDraftErrors] = useState<ReadonlyArray<string>>([]);
  const [records, setRecords] = useState<ReadonlyArray<ProductRecord>>(products);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Derived data -------------------------------------------------------
  const filteredRows = useMemo(() => {
    const q = search.toLowerCase().trim();
    return records.filter((row) => {
      const matchQuery =
        q.length === 0 ||
        row.name.toLowerCase().includes(q) ||
        row.sku.toLowerCase().includes(q) ||
        row.channelStatuses.some((c) => c.title.toLowerCase().includes(q));
      const matchFilter =
        filter === 'all' ||
        (filter === 'attention' && row.status === 'NeedsAttention') ||
        (filter === 'live' && row.status === 'Live');
      return matchQuery && matchFilter;
    });
  }, [records, search, filter]);

  const lanes = useMemo(() => {
    return {
      Draft: records.filter((p) => p.status === 'Draft'),
      Ready: records.filter((p) => p.status === 'Ready'),
      Live: records.filter((p) => p.status === 'Live'),
      Alert: records.filter((p) => p.status === 'NeedsAttention'),
    } as const;
  }, [records]);

  // Auto-dismiss toast -------------------------------------------------
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  // Handlers -----------------------------------------------------------
  const showToast = useCallback((text: string) => {
    toastId += 1;
    setToast({ id: toastId, text });
  }, []);

  const handleNav = useCallback(
    (next: string) => {
      setNav(next);
      showToast(`Opened ${next}`);
    },
    [showToast],
  );

  const openProduct = useCallback(
    (id: string) => {
      const record = records.find((p) => p.id === id);
      if (!record) {
        showToast('Product not found · Demo');
        return;
      }
      setOpenProductId(id);
    },
    [records, showToast],
  );

  const closeDrawer = useCallback(() => {
    setOpenProductId(null);
  }, []);

  const openCreate = useCallback(() => setModalOpen(true), []);
  const closeCreate = useCallback(() => {
    setModalOpen(false);
    setDraftErrors([]);
  }, []);

  const validateDraft = useCallback((value: NewProductDraft): string[] => {
    const errors: string[] = [];
    if (value.name.trim().length < 2) errors.push('Name must be at least 2 characters');
    if (value.sku.trim().length < 3) errors.push('SKU must be at least 3 characters');
    if (!value.stock || Number.isNaN(Number(value.stock)) || Number(value.stock) < 0) {
      errors.push('Stock must be a non-negative number');
    }
    return errors;
  }, []);

  const saveDraft = useCallback(() => {
    const errors = validateDraft(draft);
    if (errors.length > 0) {
      setDraftErrors(errors);
      return false;
    }
    setRecords((prev) => [
      {
        id: `draft-${Date.now()}`,
        sku: draft.sku.trim(),
        name: draft.name.trim(),
        thumbChar: draft.name.trim().charAt(0) || '新',
        thumbColor: 't-sand',
        locale,
        status: 'Draft',
        basePrice: 0,
        baseCurrency: draft.currency,
        available: Number(draft.stock) || 0,
        safetyBuffer: 10,
        channelStatuses: [],
        lastChange: 'just now · Demo',
      },
      ...prev,
    ]);
    setDraft(EMPTY_DRAFT);
    setDraftErrors([]);
    setModalOpen(false);
    showToast('Draft saved · Demo only');
    return true;
  }, [draft, locale, showToast, validateDraft]);

  const cycleLocale = useCallback(() => {
    setLocale((prev) => (prev === 'zh-Hant' ? 'en-US' : 'zh-Hant'));
    showToast('Locale switched · Demo');
  }, [showToast]);

  const cycleCurrency = useCallback(() => {
    setCurrency((prev) => (prev === 'TWD' ? 'USD' : prev === 'USD' ? 'JPY' : 'TWD'));
    showToast('Currency switched · Demo');
  }, [showToast]);

  const cycleRegion = useCallback(() => {
    setRegion((prev) => (prev === 'Asia/Taipei' ? 'America/Los_Angeles' : 'Asia/Taipei'));
    showToast('Timezone switched · Demo');
  }, [showToast]);

  return {
    // data
    checklist: checklist as ReadonlyArray<ChecklistItem>,
    channels: channels as ReadonlyArray<Channel>,
    activity: activity as ReadonlyArray<ActivityItem>,
    inventoryRules: inventoryRules as ReadonlyArray<InventoryRule>,
    summary,
    // ui state
    nav,
    handleNav,
    locale,
    cycleLocale,
    region,
    cycleRegion,
    currency,
    cycleCurrency,
    search,
    setSearch,
    filter,
    setFilter,
    openProduct,
    closeDrawer,
    openProductId,
    openCreate,
    closeCreate,
    modalOpen,
    draft,
    setDraft,
    draftErrors,
    saveDraft,
    toast,
    showToast,
    filteredRows,
    lanes,
    records,
  };
}

export type LaunchboardController = ReturnType<typeof useLaunchboard>;
