import { useState } from 'react'
import Navigation from './components/Navigation'
import WorkbenchPage from './pages/WorkbenchPage'
import ReportPage from './pages/ReportPage'
import ItineraryPage from './pages/ItineraryPage'
import { SAMPLE_INPUT } from './data/mockData'

// 顶层用简单的 state 路由管理 3 个页面，便于 MVP 阶段快速迭代。
// page: 'workbench' | 'report' | 'itinerary'
export default function App() {
  const [page, setPage] = useState('workbench')
  const [input, setInput] = useState(SAMPLE_INPUT)

  // 点击「生成 AI 对比报告」：跳转页面 2
  const handleGenerate = () => setPage('report')

  return (
    <div className="min-h-screen">
      <Navigation current={page} onNavigate={setPage} />

      <main>
        {page === 'workbench' && (
          <WorkbenchPage
            input={input}
            setInput={setInput}
            onGenerate={handleGenerate}
          />
        )}
        {page === 'report' && (
          <ReportPage
            onViewItinerary={() => setPage('itinerary')}
            onBack={() => setPage('workbench')}
          />
        )}
        {page === 'itinerary' && (
          <ItineraryPage onBack={() => setPage('report')} />
        )}
      </main>
    </div>
  )
}
