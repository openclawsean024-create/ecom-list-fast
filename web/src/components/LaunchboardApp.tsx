// Launchboard app shell — composes the Launchboard from prototype behaviour.

import type { JSX } from 'react';
import { useLaunchboard } from '../hooks/useLaunchboard';
import { formatDateTime, formatNumber } from '../utils/format';
import { Rail } from './Rail';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { TitleHero } from './TitleHero';
import { GoLiveChecklist } from './GoLiveChecklist';
import { ListingFlow } from './ListingFlow';
import { ChannelCoverage } from './ChannelCoverage';
import { ActivityStream } from './ActivityStream';
import { Catalog } from './Catalog';
import { InventoryRules } from './InventoryRules';
import { ProductDrawer } from './ProductDrawer';
import { CreateProductModal } from './CreateProductModal';
import { Toast } from './Toast';
import { MobileNav } from './MobileNav';

export function LaunchboardApp(): JSX.Element {
  const controller = useLaunchboard();
  const openProduct = controller.openProductId
    ? controller.records.find((record) => record.id === controller.openProductId) ?? null
    : null;

  const checklistCompleted = controller.checklist.filter((c) => c.state === 'done').length;
  const coverageSummary = `${controller.channels.length} channels · 2 regions · 96.4% healthy`;
  const today = formatDateTime(new Date('2026-09-26T20:05:00+08:00'), controller.locale, controller.region);
  const totalChannels = controller.records.reduce((sum, product) => sum + product.channelStatuses.length, 0);
  const liveChannels = controller.records.reduce(
    (sum, product) => sum + product.channelStatuses.filter((c) => c.status === 'Live').length,
    0,
  );

  return (
    <div className="app">
      <div className="demo-banner" role="note">
        <span>↗ Demo mode — no real channel sync.</span>
        <span className="demo-banner__hint">
          {formatNumber(controller.records.length, controller.locale)} products · {formatNumber(totalChannels, controller.locale)} channel
          listings · {formatNumber(liveChannels, controller.locale)} live · {today}
        </span>
      </div>
      <div className="shell">
        <Rail activeId="launchboard" onSelect={(id) => controller.showToast(`Rail: ${id}`)} />
        <Sidebar
          workspaceName="小日子選物店"
          productCount={controller.records.length}
          productCapacity={100}
          active={controller.nav}
          onSelect={controller.handleNav}
        />
        <main className="content" id="launchboard-main">
          <TopBar
            workspaceName="小日子選物店"
            currentNav={controller.nav}
            locale={controller.locale}
            currency={controller.currency}
            region={controller.region}
            onCycleLocale={controller.cycleLocale}
            onCycleRegion={controller.cycleRegion}
          />
          <TitleHero
            dateLabel={today}
            pendingCount={controller.summary.draft + controller.summary.ready}
            attentionCount={controller.summary.attention}
            onConnectChannel={() => controller.showToast('Channel connection flow · Demo')}
            onCreateProduct={controller.openCreate}
          />
          <GoLiveChecklist
            items={controller.checklist}
            completed={checklistCompleted}
            total={controller.checklist.length}
            onContinue={() => controller.showToast('Setup checklist opened · Demo')}
          />
          <div className="overview">
            <ListingFlow
              lanes={[
                { key: 'Draft', title: 'Draft', products: controller.lanes.Draft },
                { key: 'Ready', title: 'Ready', products: controller.lanes.Ready },
                { key: 'Live', title: 'Live', products: controller.lanes.Live },
                { key: 'NeedsAttention', title: 'Needs attention', alert: true, products: controller.lanes.Alert },
              ]}
              onOpenAllListings={() => controller.handleNav('Listings')}
              onOpenProduct={controller.openProduct}
            />
            <div className="side-overview">
              <ChannelCoverage
                channels={controller.channels}
                summary={coverageSummary}
                onManage={() => controller.handleNav('Channels')}
              />
              <ActivityStream
                items={controller.activity}
                onOpenLog={() => controller.handleNav('Activity')}
              />
            </div>
          </div>
          <div className="bottom">
            <Catalog
              products={controller.records}
              filteredRows={controller.filteredRows}
              search={controller.search}
              onSearchChange={controller.setSearch}
              filter={controller.filter}
              onFilterChange={controller.setFilter}
              onOpenCatalog={() => controller.handleNav('Catalog')}
              onOpenProduct={controller.openProduct}
              locale={controller.locale}
              attentionCount={controller.summary.attention}
              liveCount={controller.summary.live}
            />
            <InventoryRules rules={controller.inventoryRules} />
          </div>
        </main>
      </div>
      <MobileNav active={controller.nav} onSelect={controller.handleNav} />
      <ProductDrawer
        product={openProduct}
        locale={controller.locale}
        onClose={controller.closeDrawer}
        onOpenReview={() => {
          controller.closeDrawer();
          controller.showToast('Listing review opened · Demo');
        }}
      />
      <CreateProductModal
        open={controller.modalOpen}
        draft={controller.draft}
        errors={controller.draftErrors}
        onChange={controller.setDraft}
        onClose={controller.closeCreate}
        onSave={controller.saveDraft}
      />
      <Toast toast={controller.toast} />
    </div>
  );
}
