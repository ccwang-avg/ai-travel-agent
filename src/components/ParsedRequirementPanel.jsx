import { ScanText, CheckCircle2, Sparkles } from 'lucide-react'
import Icon from './Icon'
import { PARSED_REQUIREMENTS, TASK_CONTEXT } from '../data/mockData'

// 模块 1 + 2：AI 识别结果 + 本次任务上下文
export default function ParsedRequirementPanel({ parsed }) {
  if (!parsed) {
    return (
      <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-sand-300 bg-white/60 px-6 py-14 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-sand-100">
          <ScanText className="h-6 w-6 text-ocean-400" />
        </div>
        <p className="text-sm font-medium text-ocean-700">AI 识别结果</p>
        <p className="mt-1.5 max-w-xs text-[13px] leading-relaxed text-ocean-400">
          点击「解析需求」后，AI 会把自然语言转成结构化任务
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* 模块 1：AI 识别结果 */}
      <section className="rounded-card border border-sand-200 bg-white p-5 shadow-sm">
        <div className="mb-1 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber2-500" />
          <h3 className="text-sm font-semibold text-ocean-800">AI 识别结果</h3>
        </div>
        <p className="mb-4 text-[12px] text-ocean-400">
          以下条目均由 AI 从你的自然语言输入中自动识别，并非系统预设
        </p>

        <div className="grid gap-2.5 sm:grid-cols-2">
          {PARSED_REQUIREMENTS.map((item) => (
            <div
              key={item.key}
              className="rounded-card border border-sand-100 bg-sand-50/60 p-3"
            >
              <div className="mb-1.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[12px] font-medium text-ocean-500">
                  <Icon name={item.icon} className="h-3.5 w-3.5" />
                  {item.label}
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-pine-100 px-2 py-0.5 text-[10px] font-medium text-pine-600">
                  <CheckCircle2 className="h-3 w-3" />
                  已识别
                </span>
              </div>
              <p className="text-[13px] font-medium leading-snug text-ocean-800">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 模块 2：本次任务上下文 */}
      <section className="rounded-card border border-sand-200 bg-white p-5 shadow-sm">
        <h3 className="mb-1 text-sm font-semibold text-ocean-800">
          本次任务上下文
        </h3>
        <p className="mb-4 text-[12px] text-ocean-400">
          系统已把你的需求转化为一个可执行的 Agent 任务
        </p>
        <div className="divide-y divide-sand-100">
          {TASK_CONTEXT.map((row) => (
            <div key={row.label} className="flex items-start gap-4 py-2.5">
              <span className="w-20 shrink-0 text-[12.5px] text-ocean-400">
                {row.label}
              </span>
              <span className="text-[13px] font-medium text-ocean-800">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
