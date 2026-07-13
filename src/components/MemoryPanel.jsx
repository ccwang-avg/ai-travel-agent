import { useState } from 'react'
import { Brain, Pencil, Trash2, Power } from 'lucide-react'
import { LONG_TERM_MEMORY } from '../data/mockData'

// 模块 3：AI 长期记忆（可被用户管理）
// 本地 state 模拟"开关/删除"，为后续接入真实记忆管理留出交互结构。
export default function MemoryPanel() {
  const [memories, setMemories] = useState(LONG_TERM_MEMORY)

  const toggle = (id) =>
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m)),
    )

  const remove = (id) =>
    setMemories((prev) => prev.filter((m) => m.id !== id))

  return (
    <section className="rounded-card border border-sand-200 bg-white p-5 shadow-sm">
      <div className="mb-1 flex items-center gap-2">
        <Brain className="h-4 w-4 text-pine-500" />
        <h3 className="text-sm font-semibold text-ocean-800">AI 长期记忆</h3>
      </div>
      <p className="mb-4 text-[12px] text-ocean-400">
        跨会话保留的历史偏好，可由你编辑、删除或关闭 · 区别于本次输入的识别结果
      </p>

      <div className="space-y-2.5">
        {memories.length === 0 && (
          <p className="rounded-card bg-sand-50 py-4 text-center text-[12.5px] text-ocean-400">
            暂无长期记忆
          </p>
        )}
        {memories.map((m) => (
          <div
            key={m.id}
            className={
              'rounded-card border p-3 transition-colors ' +
              (m.enabled
                ? 'border-sand-100 bg-sand-50/60'
                : 'border-sand-100 bg-sand-50/30 opacity-60')
            }
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="mb-1 inline-block rounded-full bg-ocean-100 px-2 py-0.5 text-[10px] font-medium text-ocean-600">
                  {m.type}
                </span>
                <p className="text-[13px] font-medium leading-snug text-ocean-800">
                  {m.content}
                </p>
                <p className="mt-0.5 text-[11px] text-ocean-400">{m.source}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  title={m.enabled ? '关闭该记忆' : '启用该记忆'}
                  onClick={() => toggle(m.id)}
                  className={
                    'rounded p-1.5 transition-colors hover:bg-sand-100 ' +
                    (m.enabled ? 'text-pine-500' : 'text-ocean-300')
                  }
                >
                  <Power className="h-3.5 w-3.5" />
                </button>
                <button
                  title="编辑（示例）"
                  className="rounded p-1.5 text-ocean-400 transition-colors hover:bg-sand-100"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  title="删除该记忆"
                  onClick={() => remove(m.id)}
                  className="rounded p-1.5 text-ocean-400 transition-colors hover:bg-sand-100 hover:text-amber2-600"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
