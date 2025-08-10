'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  HomeIcon, 
  UserGroupIcon, 
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  Cog6ToothIcon 
} from '@heroicons/react/24/outline'

const menuItems = [
  {
    name: '대시보드',
    href: '/admin',
    icon: HomeIcon,
  },
  {
    name: '회원관리',
    href: '/admin/members',
    icon: UserGroupIcon,
  },
  {
    name: '문의관리',
    href: '/admin/inquiries',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: '기본환경설정',
    href: '/admin/basic-settings',
    icon: Cog6ToothIcon,
  },
  {
    name: '관리권한설정',
    href: '/admin/permissions',
    icon: UserGroupIcon,
  },
  {
    name: '테마설정',
    href: '/admin/theme',
    icon: ChartBarIcon,
  },
  {
    name: '메뉴설정',
    href: '/admin/menu',
    icon: Cog6ToothIcon,
  },
  {
    name: '메일 텍스트',
    href: '/admin/mail',
    icon: ChatBubbleLeftRightIcon,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 flex-shrink-0 bg-gray-800 text-white min-h-screen">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-6">
          <HomeIcon className="w-6 h-6" />
          <span className="text-lg font-semibold">관리자 메뉴</span>
        </div>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}