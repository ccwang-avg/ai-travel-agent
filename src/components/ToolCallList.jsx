import { CheckCircle2 } from 'lucide-react'
import Icon from './Icon'
import { TOOL_CALLS } from '../data/mockData'

// 页面 2 · 第二部分：工具调用状态（模拟 Function Calling / MCP）
export default function ToolCallList() {
  return (
    <section className="rounded-card border border-sand-200 bg-white p-5 shadow-sm">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ocean-800">工具调用状态</h3>
        <span className="rounded-full bg-sand-100 px-2 py-0.5 text-[10.5px] font-medium text-ocean-500">
          模拟 Function Calling / MCP
        </span>
      </div>
      <p className="mb-4 text-[12px] text-ocean-400">
        Agent 已完成本轮外部工具调用与知识库检索
      </p>

      <div className="space-y-2.5">
        {TOOL_CALLS.map((tool) => (
          <div
            key={tool.name}
            className="flex items-center gap-3 rounded-card border border-sand-100 bg-sand-50/60 px-3.5 py-3"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-card bg-ocean-100 text-ocean-700">
              <Icon name={tool.icon} className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[12.5px] font-semibold text-ocean-800">
                  {tool.name}
                </span>
              </div>
              <p className="truncate text-[12.5px] text-ocean-600">
                {tool.result}
                <span className="text-ocean-400"> · {tool.detail}</span>
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-pine-100 px-2.5 py-1 text-[11px] font-medium text-pine-600">
              <CheckCircle2 className="h-3.5 w-3.5" />
              已完成
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
