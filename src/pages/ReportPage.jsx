import {
  ArrowLeft,
  ArrowRight,
  Trophy,
  Sparkles,
  FileText,
  Plane,
} from 'lucide-react'
import FlightInfoCard from '../components/FlightInfoCard'
import PlanReport from '../components/PlanReport'
import FinalComparison from '../components/FinalComparison'
import { REPORT_HEADER, PLAN_REPORTS } from '../data/mockData'

// 页面 2：旅行决策报告页
// 结构：结论 → 机票信息补充 → 新疆报告 → 云南报告 → 最终对比 → 下一步行动
export default function ReportPage({ onViewItinerary, onBack }) {
  return (
    <div className="mx-auto max-w-4xl px-6 pb-20 pt-10">
      {/* 一、顶部结论区 */}
      <section className="relative overflow-hidden rounded-card border border-sand-200/80 bg-white/85 p-7 shadow-sm sm:p-9">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pine-600 via-lake-400 to-sunset-400/80" />

        <h1 className="font-display text-2xl font-bold leading-snug text-pine-800 sm:text-[30px]">
          {REPORT_HEADER.title}
        </h1>
        <p className="mt-2 text-[14px] text-pine-700/70">
          {REPORT_HEADER.subtitle}
        </p>

        {/* 核心结论 */}
        <div className="mt-6 rounded-card border border-pine-300 bg-pine-50/60 p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-card bg-pine-600 text-sand-50">
              <Trophy className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-[12px] text-pine-600/70">核心结论 · 更推荐</p>
              <p className="font-display text-[19px] font-bold text-pine-800">
                {REPORT_HEADER.recommendedLabel}
              </p>
            </div>
          </div>
          <p className="mt-3 flex items-start gap-2 text-[13.5px] leading-relaxed text-pine-700">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-sunset-500" />
            {REPORT_HEADER.oneLineReason}
          </p>
        </div>

        {/* 轻量说明：需求来自首页 */}
        <p className="mt-6 border-t border-sand-200/70 pt-4 text-[12px] leading-relaxed text-pine-600/60">
          本报告基于你在首页提交的旅行偏好与限制生成。读完报告后，可在页面底部选择生成行程草案、查询航班或返回修改需求。
        </p>
      </section>

      {/* 二、出行信息补充卡片（机票） */}
      <div className="mt-8">
        <FlightInfoCard />
      </div>

      {/* 三、四、两个方案的独立报告 */}
      <div className="mt-8">
        <div className="mb-4 flex items-center gap-2">
          <FileText className="h-4.5 w-4.5 text-pine-600" />
          <h2 className="font-display text-[20px] font-bold text-pine-800">
            两个方案，分开细看
          </h2>
        </div>
        <div className="space-y-6">
          {PLAN_REPORTS.map((plan) => (
            <PlanReport key={plan.id} plan={plan} />
          ))}
        </div>
      </div>

      {/* 五、最终对比与推荐 */}
      <div className="mt-10">
        <FinalComparison />
      </div>

      {/* 六、下一步行动区 */}
      <div className="mt-10 rounded-card border border-sand-200/80 bg-white/85 p-6 shadow-sm">
        <h2 className="mb-4 font-display text-[16px] font-semibold text-pine-800">
          下一步，你可以
        </h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onViewItinerary}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-card bg-pine-700 px-4 py-3 text-[14px] font-medium text-sand-50 transition-colors hover:bg-sunset-500"
          >
            <ArrowRight className="h-4 w-4" />
            生成云南 15 天游学行程草案
          </button>
          <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-card border border-pine-700 px-4 py-3 text-[14px] font-medium text-pine-700 transition-colors hover:border-sunset-400 hover:text-sunset-600">
            <Plane className="h-4 w-4" />
            查询并比较更多航班
          </button>
          <button
            onClick={onBack}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-card border border-sand-300 px-4 py-3 text-[14px] font-medium text-pine-700 transition-colors hover:bg-sand-100"
          >
            <ArrowLeft className="h-4 w-4" />
            返回修改需求
          </button>
        </div>
      </div>
    </div>
  )
}
