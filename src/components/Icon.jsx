import * as Icons from 'lucide-react'

// 统一的图标渲染器：按名称从 lucide-react 取图标，找不到时降级为占位。
// 这样 mock data 里可以只存图标名字符串，组件保持解耦。
export default function Icon({ name, className = 'w-4 h-4', ...props }) {
  const LucideIcon = Icons[name] || Icons.Circle
  return <LucideIcon className={className} {...props} />
}
