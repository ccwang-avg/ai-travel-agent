import { ArrowLeft } from 'lucide-react'
import ItineraryTimeline from '../components/ItineraryTimeline'
import BudgetBreakdown from '../components/BudgetBreakdown'
import {
  TripOverview,
  LearningHighlights,
  TripTips,
  PackingList,
} from '../components/ItinerarySidebar'
import EmergencyPlanB from '../components/EmergencyPlanB'
import { ITINERARY } from '../data/mockData'

// 页面 3：行程草案页
export default function ItineraryPage({ onBack }) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-1.5 text-[13px] font-medium text-ocean-500 transition-colors hover:text-ocean-800"
        >
          <ArrowLeft className="h-4 w-4" />
          返回对比报告
        </button>
        <h1 className="text-xl font-bold tracking-tight text-ocean-800 sm:text-2xl">
          {ITINERARY.title}
        </h1>
        <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-ocean-500">
          {ITINERARY.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 左侧：时间轴，占 2 列 */}
        <div className="lg:col-span-2">
          <ItineraryTimeline />
        </div>

        {/* 右侧：概览 + 预算拆解 + 游学主题 + 出行贴士 + 携带物品 */}
        <div className="space-y-5">
          <TripOverview />
          <BudgetBreakdown />
          <LearningHighlights />
          <TripTips />
          <PackingList />
        </div>
      </div>

      {/* 独立模块：突发状况与 Plan B（放在行程草案和预算拆解之后） */}
      <div className="mt-6">
        <EmergencyPlanB />
      </div>
    </div>
  )
}
