'use client'

import { ReactNode } from 'react'
import AdminSidebar from './AdminSidebar'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1">
          <header className="bg-indigo-600 text-white p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">ADMINISTRATOR</h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm">관리자</span>
                <button className="text-sm hover:text-gray-300">로그아웃</button>
              </div>
            </div>
          </header>
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
