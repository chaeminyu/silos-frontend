'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { 
  HomeIcon, 
  UserGroupIcon, 
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  CalendarDaysIcon,
  MegaphoneIcon,
  DocumentTextIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'

interface MenuItem {
  name: string;
  href?: string;
  icon: any;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    name: '대시보드',
    href: '/admin',
    icon: HomeIcon,
  },
  {
    name: '상담 관리',
    icon: CalendarDaysIcon,
    children: [
      {
        name: '상담 신청 목록',
        href: '/admin/consultations',
        icon: ChatBubbleLeftRightIcon,
      },
      {
        name: '상담 일정 관리',
        href: '/admin/consultations/schedule',
        icon: CalendarDaysIcon,
      },
      {
        name: '상담 완료 내역',
        href: '/admin/consultations/completed',
        icon: DocumentTextIcon,
      }
    ]
  },
  {
    name: '이벤트 관리',
    icon: MegaphoneIcon,
    children: [
      {
        name: '이벤트 목록',
        href: '/admin/events',
        icon: MegaphoneIcon,
      },
      {
        name: '이벤트 생성',
        href: '/admin/events/create',
        icon: DocumentTextIcon,
      }
    ]
  },
  {
    name: '회원관리',
    href: '/admin/members',
    icon: UserGroupIcon,
  },
  {
    name: '통계/분석',
    icon: ChartBarIcon,
    children: [
      {
        name: '전체 현황',
        href: '/admin/analytics',
        icon: ChartBarIcon,
      },
      {
        name: '시술 통계',
        href: '/admin/analytics/consultations',
        icon: ChartBarIcon,
      },
      {
        name: '이벤트 통계', 
        href: '/admin/analytics/events',
        icon: ChartBarIcon,
      }
    ]
  },
  {
    name: '시스템 설정',
    icon: Cog6ToothIcon,
    children: [
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
      }
    ]
  }
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set(['통계/분석']))

  const toggleMenu = (menuName: string) => {
    setOpenMenus(prev => {
      const newSet = new Set(prev)
      if (newSet.has(menuName)) {
        newSet.delete(menuName)
      } else {
        newSet.add(menuName)
      }
      return newSet
    })
  }

  const renderMenuItem = (item: MenuItem) => {
    const isActive = pathname === item.href
    const hasChildren = item.children && item.children.length > 0
    const isOpen = openMenus.has(item.name)
    const Icon = item.icon

    if (hasChildren) {
      return (
        <li key={item.name}>
          <button
            onClick={() => toggleMenu(item.name)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <div className="flex items-center space-x-3">
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </div>
          </button>
          <div className="ml-6 mt-2 bg-gray-700 rounded-lg border-l-2 border-gray-600">
            <ul className="py-2 px-3 space-y-1">
            {item.children?.map((child) => {
              const childIsActive = pathname === child.href
              const ChildIcon = child.icon
              
              return (
                <li key={child.name}>
                  <Link
                    href={child.href!}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      childIsActive
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <ChildIcon className="w-4 h-4" />
                    <span>{child.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
          </div>
        </li>
      )
    }

    return (
      <li key={item.name}>
        <Link
          href={item.href!}
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
  }

  return (
    <div className="w-64 flex-shrink-0 bg-gray-800 text-white min-h-screen">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-6">
          <HomeIcon className="w-6 h-6" />
          <span className="text-lg font-semibold">SILOS 관리자</span>
        </div>
        <nav>
          <ul className="space-y-2">
            {menuItems.map(renderMenuItem)}
          </ul>
        </nav>
      </div>
    </div>
  )
}