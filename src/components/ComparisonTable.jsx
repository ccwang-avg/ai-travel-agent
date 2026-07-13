import { Info } from 'lucide-react'
import { COMPARISON_DIMENSIONS, COMPARISON_INSIGHTS } from '../data/mockData'

// 单个评分条
function ScoreBar({ score, highlight }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-sand-100">
        <div
          className={
            'h-full rounded-full ' + (highlight ? 'bg-pine-500' : 'bg-ocean-400')
          }
          style={{ width: `${score}%` }}
        />
      </div>
      <span
        className={
          'w-7 shrink-0 text-right text-[12px] font-semibold ' +
          (highlight ? 'text-pine-600' : 'text-ocean-600')
        }
      >
        {score}
      </span>
    </div>
  )
}

// 页面 2 · 第三部分：多维度对比表
export default function ComparisonTable() {
  return (
    <section className="rounded-card border border-sand-200 bg-white p-5 shadow-sm">
      <h3 className="mb-1 text-sm font-semibold text-ocean-800">
        多维度对比
      </h3>
      <p className="mb-4 text-[12px] text-ocean-400">
        每个维度对两个方案分别打分（满分 100），并附简短解释
      </p>

      {/* 表头 */}
      <div className="hidden grid-cols-12 gap-3 border-b border-sand-200 pb-2 text-[11.5px] font-medium uppercase tracking-wide text-ocean-400 md:grid">
        <div className="col-span-2">维度</div>
        <div className="col-span-3">新疆自驾</div>
        <div className="col-span-3">云南游学</div>
        <div className="col-span-4">解读</div>
      </div>

      <div className="divide-y divide-sand-100">
        {COMPARISON_DIMENSIONS.map((d) => {
          const yunnanWins = d.yunnan >= d.xinjiang
          return (
            <div
              key={d.dimension}
              className="grid grid-cols-1 gap-2 py-3 md:grid-cols-12 md:items-center md:gap-3"
            >
              <div className="col-span-2 text-[13px] font-medium text-ocean-800">
                {d.dimension}
              </div>
              <div className="col-span-3">
                <span className="mb-1 block text-[11px] text-ocean-400 md:hidden">
                  新疆自驾
                </span>
                <ScoreBar score={d.xinjiang} highlight={!yunnanWins} />
              </div>
              <div className="col-span-3">
                <span className="mb-1 block text-[11px] text-ocean-400 md:hidden">
                  云南游学
                </span>
                <ScoreBar score={d.yunnan} highlight={yunnanWins} />
              </div>
              <div className="col-span-4 text-[12px] leading-relaxed text-ocean-500">
                {d.note}
              </div>
            </div>
          )
        })}
      </div>

      {/* 整体解读 */}
      <div className="mt-4 rounded-card border border-ocean-100 bg-ocean-50/60 p-4">
        <div className="mb-2 flex items-center gap-1.5 text-[12.5px] font-semibold text-ocean-700">
          <Info className="h-4 w-4" />
          整体解读
        </div>
        <ul className="space-y-1.5">
          {COMPARISON_INSIGHTS.map((line, i) => (
            <li
              key={i}
              className="flex gap-2 text-[13px] leading-relaxed text-ocean-700"
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ocean-400" />
              {line}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
