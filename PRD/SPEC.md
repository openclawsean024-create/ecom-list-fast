# 電商上架快手 — PRD v3.0.2 等級規格書

> 建立日期:2026-09-19 · 對齊 SPEC v3.0 契約

## §1 產品概述

### 1.1 問題陳述
中小型電商賣家上架到蝦皮 / 露天 / Yahoo / Shopify 時：(1) 各平台 API 規格不同，重複貼商品圖文耗時 (2) 庫存不同步，賣超庫存 (3) 訂單分散，要切 4 個後台。本案提供「商品主檔一次編輯 + 多平台一鍵上架 + 庫存訂單同步」。

### 1.2 目標使用者
- **Primary — 蝦皮/露天小型賣家**：1-3 人團隊、SKU 50-500
- **Secondary — 中型多平台賣家**：SKU 500-5000、需 ERP 整合

### 1.3 核心價值主張
> 商品主檔一次寫，多平台同步上架、庫存訂單一個 dashboard 通管。

### 1.4 Non-Goals
- ❌ 真實金流（用各平台原生結帳）
- ❌ ERP 完整串接（SaaS 級在 v2）
- ❌ 直播帶貨模組
- ❌ 海外平台（先做台灣四大：蝦皮 / 露天 / Yahoo / Shopify）

---

## §2 主要場景

| 場景 | 輸入 | 輸出 | 成功條件 |
|---|---|---|---|
| 商品建檔 | SKU 主檔 + 多平台價格/標題 | 各平台草稿 | 90 秒內 4 平台就緒 |
| 一鍵上架 | 確認後送出 | 4 平台 live | API 失敗 retry 3 次 |
| 庫存同步 | 任一平台賣出 | 其他平台庫存扣減 | 30 秒內 sync |
| 訂單聚合 | 4 平台 webhook | 統一訂單列表 | 出貨狀態單一更新 |

---

## §3 FR

- FR-001: 商品主檔 CRUD（SKU / 圖 / 文 / 規格 / 價格）
- FR-002: 平台連線設定（蝦皮 / 露天 / Yahoo / Shopify OAuth）
- FR-003: 一鍵多平台上架
- FR-004: 即時庫存同步（webhook + polling）
- FR-005: 訂單聚合 + 出貨管理
- FR-006: 利潤報表（per-SKU 各平台成本 vs 售價）

## §4 NFR

- 上架速度：4 平台 < 90 秒
- 庫存同步延遲：< 30 秒
- API rate limit 處理：queue + 退避

## §5 技術棧

- Vite + React 19 + TypeScript strict
- Tailwind CSS
- Webhook 接收 + Queue (BullMQ)
- Postgres + Prisma

## §6 DoD

- [ ] FR 全部通過測試
- [ ] TypeScript strict tsc --noEmit exit 0
- [ ] Vite build 綠
- [ ] Vercel deploy READY

## §7 Non-Goals

- ❌ ERP 整合（v2）
- ❌ 海外平台（v2）
- ❌ 直播/短影音模組
