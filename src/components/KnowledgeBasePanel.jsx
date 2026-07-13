import { Library, CheckCircle2, Plus } from 'lucide-react'
import { KNOWLEDGE_BASE } from '../data/mockData'

// 模块 4：知识库状态
export default function KnowledgeBasePanel() {
  return (
    <section className="rounded-card border border-sand-200 bg-white p-5 shadow-sm">
      <div className="mb-1 flex items-center gap-2">
        <Library className="h-4 w-4 text-ocean-600" />
        <h3 className="text-sm font-semibold text-ocean-800">知识库状态</h3>
      </div>
      <p className="mb-4 text-[12px] text-ocean-400">
        Agent 可检索的资料源，支持后续持续扩展
      </p>

      <div className="mb-4">
        <p className="mb-2 text-[11.5px] font-medium uppercase tracking-wide text-ocean-400">
          已准备
        </p>
        <div className="space-y-2">
          {KNOWLEDGE_BASE.ready.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded-card border border-pine-100 bg-pine-50/60 px-3 py-2"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-pine-500" />
              <span className="text-[13px] text-ocean-800">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-[11.5px] font-medium uppercase tracking-wide text-ocean-400">
          可扩展
        </p>
        <div className="flex flex-wrap gap-2">
          {KNOWLEDGE_BASE.extendable.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 rounded-full border border-dashed border-sand-300 bg-sand-50 px-2.5 py-1 text-[12px] text-ocean-500"
            >
              <Plus className="h-3 w-3" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
