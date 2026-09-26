# 電商上架快手 — UI-SPEC v1.0

> 建立日期：2026-09-24
> 目的：在正式 React 實作前，定義可供人工確認的獨立 HTML 視覺原型。
> 原型：`web/public/ecom-list-fast-international.html`

## 1. 研究結論

### 1.1 專案現況

- Notion 專案頁將產品定位為「商品 / 文案 / 圖片一次整理好」的多平台電商賣家 SaaS，目標是減少重複上架與分散管理。
- GitHub `ecom-list-fast` 目前只有 Vite + React scaffold；`App.tsx` 是計數器示例，尚未形成可操作的產品介面。
- GitHub SPEC v3.0.2 定義的核心模組為商品主檔、平台連線、一鍵上架、即時庫存、訂單聚合、利潤報表。
- 現有規格有一個需要產品決策的通路落差：Notion metadata 寫 momo / PChome / 蝦皮 / Yahoo；GitHub SPEC v3 寫蝦皮 / 露天 / Yahoo / Shopify。原型先抽象成「通路卡片」並以 GitHub SPEC v3 的四通路呈現，正式實作前需確認清單。

### 1.2 競品對標

| 競品 | 已驗證的強項 | 介面上的啟示 | 快手的切入點 |
|---|---|---|---|
| 91APP IMS | 多通路上架、AI 生成規格、可賣量策略、ERP/WMS 串接、訂單履約 | 以「全通路營運」而非單一工具說服品牌 | 先服務 1–3 人賣家，縮短第一次上架到完成的路徑，避免企業系統的重量感 |
| SHOPLINE Multichannel Connect | 集中管理商品、訂單、庫存；批次工具與 Open API；跨通路同步與預警 | 把同步狀態與例外情況做成日常工作流 | 以「今日要處理什麼」為首頁，而不是把功能堆在設定頁 |
| CYBERBIZ Channel Bridge | 蝦皮商品匯入官網、商品關聯、官網與通路庫存同步 | 商品關聯與同步前的確認必須清楚，避免誤扣庫存 | 用可理解的商品主檔與逐通路檢查清單降低出錯恐懼 |
| Linnworks | 中央商品目錄、通路級價格/庫存規則、批次刊登、低庫存與 listing suppression | 「一個來源、所有通路」需要持續可見的規則與健康狀態 | 不先追求 100+ 通路，先把 4 個台灣核心通路的完成體驗做透 |

### 1.3 設計機會

1. **Seller-first command center**：首屏回答「今天還有幾件上架工作、哪個通路需要處理、庫存是否危險」。
2. **主檔到通路的可追溯性**：每個商品都能看到共用欄位、通路覆寫與最後同步狀態。
3. **漸進式自動化**：未串 API 時仍可用匯入 / 匯出；已串接後，介面自然升級成同步佇列，不改變工作心智模型。
4. **明確的例外優先**：把「需補欄位」「庫存過低」「同步失敗」放進工作隊列，不讓使用者自己找錯誤。

## 2. 產品與視覺方向

### 2.1 產品定位

> 給正在同時經營蝦皮、露天、Yahoo、Shopify 的小型賣家，一個能在 90 秒內把商品主檔變成多通路就緒草稿的營運工作台。

### 2.2 視覺語言

- **氣質**：務實、清楚、有一點工作室感；避免企業 ERP 的冷灰，也避免電商促銷頁的高飽和裝飾。
- **色彩**：深墨綠側欄（導航與信任）、暖米白背景（長時間使用舒適）、螢光黃綠作為行動焦點、橘紅只用於風險與低庫存。
- **字體**：系統無襯線，數字使用等寬字體感；繁體中文優先，英文僅作輔助標籤。
- **元件**：圓角 14–20px、細邊框、少量陰影；不使用漸層、玻璃擬態、浮誇插畫或無意義的 KPI 圖表。
- **圖像**：原型採 CSS 色塊與內嵌 SVG 圖示，不依賴外部圖片，避免 demo 失效。

### 2.3 International productization pass

第二版不再把首頁做成單純 KPI dashboard，而是採用可擴充的 Launchboard 工作台：

- 工作區層級：組織、店舖、區域、語言、幣別、時區都可在頂欄辨識。
- 工作流層級：`Draft → Ready → Live → Needs attention`，商品的生命週期直接可見。
- 通路層級：每個通路顯示連線、可販售庫存、價格規則、內容完整度與最後同步。
- 產品化層級：加入 Go-live checklist、workspace usage、sync health、audit / activity 入口，讓介面像可交付的 SaaS，而非一次性展示稿。
- 國際化層級：英文 domain language 與繁體中文並列，金額、日期、庫存單位不寫死在元件結構中。
- 延展性層級：用 `channel`, `region`, `locale`, `currency`, `listingStatus` 等資料概念驅動畫面；未來接 Amazon、eBay、TikTok Shop 或其他通路時，不需重做資訊架構。

## 3. 首屏資訊架構

```text
┌──────┬───────────────────────────────────────────────────────────────┐
│ rail │ workspace / locale / live sync / command search                 │
│      ├───────────────────────────────────────────────────────────────┤
│ nav  │ Launchboard + Go-live checklist + coverage / revenue context    │
│      ├──────────────────────────────┬────────────────────────────────┤
│      │ Listing flow swimlane         │ Channel coverage + sync health  │
│      │ Draft / Ready / Live / Alert  │ Region, currency, rule status   │
│      ├──────────────────────────────┴────────────────────────────────┤
│      │ Activity / product record / audit trail                         │
└──────┴───────────────────────────────────────────────────────────────┘
```

## 4. 原型範圍與互動

### 4.1 必須呈現

- 側欄主要入口：總覽、商品主檔、上架工作台、訂單、通路、報表。
- 首屏 CTA：「建立商品」「匯入商品」「連接通路」。
- Launchboard 泳道：Draft、Ready、Live、Needs attention。
- Go-live checklist：連接通路、匯入 catalog、設定庫存規則、啟用同步。
- Channel coverage：通路、區域、幣別、內容完整度、同步狀態。
- Activity stream：誰在何時改了哪一個 SKU、哪一個通路受影響。
- 點擊商品可開啟右側詳情抽屜，顯示主檔、通路規則與 audit trail。
- 原型互動：切換導航、搜尋商品、篩選商品、開關商品詳情、建立商品 modal、關閉 modal。

### 4.2 文案規則

- 把「同步」拆成可理解的狀態：已同步、待處理、需要注意、未連線。
- 不在 mock 中宣稱已完成真實 API 串接；以「Demo 模式」「最後同步」與「連線設定」區分未來能力。
- CTA 使用動詞：建立商品、檢查 3 件、查看錯誤、連線通路。

## 5. 響應式與無障礙

- Desktop：`>= 1180px` 顯示完整側欄與雙欄工作區。
- Tablet：`768–1179px` 收合側欄文字，工作隊列與通路健康度改成上下排列。
- Mobile：`< 768px` 隱藏側欄、顯示底部導航；商品表格改為卡片；詳情抽屜改成全螢幕 modal。
- 所有互動控制項必須有 visible focus；狀態不可只依賴顏色，需同時顯示文字與圖示。
- 文字對比至少符合 WCAG AA；風險紅色只作輔助，避免大面積使用。

## 6. 驗收條件

- [ ] 使用者 5 秒內能辨識產品用途與主要 CTA。
- [ ] 使用者不需進入設定頁，就能知道今天的上架阻塞點。
- [ ] 商品主檔與各通路狀態在同一視覺層級可互相追溯。
- [ ] 「Demo」與真實同步能力沒有混淆。
- [ ] 原型不依賴打包工具或外部資產，直接開啟 HTML 即可預覽。
- [ ] 完成 Sean 人工確認前，不進入正式 React 實作，也不外派 MiniMax。

## 7. 來源

- Notion 專案：[電商上架快手 — 多平台電商賣家 SaaS](https://app.notion.com/p/3c5449ca65d881fa9df3c79f4a7c7cde)
- Notion 歷史規格：[電商多平台快速上架 — 規格書 v2.0](https://app.notion.com/p/399449ca65d8810bb894cdccf2a760cb)
- 競品：[91APP IMS](https://91app.com/ims/)、[SHOPLINE 多渠道連接](https://help.shopline.com/hc/zh-cn/articles/37621844935193-%E5%A4%9A%E6%B8%A0%E9%81%93%E8%BF%9E%E6%8E%A5%E6%A6%82%E8%BF%B0)、[CYBERBIZ Channel Bridge](https://www.cyberbiz.io/solution/channel-bridge_google/)、[Linnworks Multichannel Selling](https://www.linnworks.com/solutions/multichannel-selling/)
