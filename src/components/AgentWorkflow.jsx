import { CheckCircle2 } from 'lucide-react'
import Icon from './Icon'
import { AGENT_WORKFLOW } from '../data/mockData'

// 页面 2 · 第一部分：Agent 工作流摘要
export default function AgentWorkflow() {
  return (
    <section className="rounded-card border border-sand-200 bg-white p-5 shadow-sm">
      <h3 className="mb-1 text-sm font-semibold text-ocean-800">
        Agent 工作流摘要
      </h3>
      <p className="mb-5 text-[12px] text-ocean-400">
        本报告由以下 6 个步骤自动生成
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {AGENT_WORKFLOW.map((s) => (
          <div
            key={s.step}
            className="relative rounded-card border border-sand-100 bg-sand-50/60 p-3.5"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded-card bg-ocean-800 text-sand-50">
                <Icon name={s.icon} className="h-4 w-4" />
              </div>
              <span className="text-[11px] font-semibold text-ocean-300">
                0{s.step}
              </span>
            </div>
            <p className="flex items-center gap-1 text-[13px] font-medium text-ocean-800">
              {s.title}
              <CheckCircle2 className="h-3.5 w-3.5 text-pine-500" />
            </p>
            <p className="mt-0.5 text-[11.5px] text-ocean-400">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
