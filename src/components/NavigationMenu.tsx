'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Users, Stethoscope, FileText, MessageCircle, Menu, X, ChevronDown } from 'lucide-react';

const menuItems = [
  {
    id: 'home',
    title: '홈',
    href: '/',
    icon: Home,
    isHome: true,
  },
  {
    id: 'about',
    title: '병원소개',
    href: '/about',
    icon: Users,
    submenu: [
      { title: '의료진 소개', href: '/about/doctors' },
      { title: '병원 철학', href: '/about/philosophy' },
      { title: '오시는 길', href: '/about/location' },
    ]
  },
  {
    id: 'procedures',
    title: '시술안내',
    href: '/procedures',
    icon: Stethoscope,
    submenu: [
      { title: '실로스 리프팅', href: '/procedures/silos-lifting' },
      { title: '레이저 리프팅', href: '/procedures/laser-lifting' },
      { title: '눈꺼풀 리프팅', href: '/procedures/eyelid-lifting' },
      { title: '피부 리프팅', href: '/procedures/skin-lifting' },
      { title: '특수 필러', href: '/procedures/special-filler' },
    ]
  },
  {
    id: 'why-silos',
    title: '실로스를 선택하는 이유',
    href: '/why-silos',
    icon: FileText,
  },
  {
    id: 'silofat',
    title: '실로팻',
    href: '/silofat',
    icon: Stethoscope,
  },
  {
    id: 'contact',
    title: '상담',
    href: '/contact',
    icon: MessageCircle,
  },
];

export default function NavigationMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMouseOverMenu, setIsMouseOverMenu] = useState(false);
  const [isMouseOverDropdown, setIsMouseOverDropdown] = useState(false);

  const handleMenuEnter = (menuId: string) => {
    setIsMouseOverMenu(true);
    setActiveDropdown(menuId);
  };

  const handleDropdownEnter = () => {
    setIsMouseOverDropdown(true);
  };

  const handleDropdownLeave = () => {
    setIsMouseOverDropdown(false);
    
    setTimeout(() => {
      if (!isMouseOverMenu && !isMouseOverDropdown) {
        setActiveDropdown(null);
      }
    }, 100);
  };

  useEffect(() => {
    if (!isMouseOverMenu && !isMouseOverDropdown) {
      const cleanup = setTimeout(() => {
        setActiveDropdown(null);
      }, 300);
      
      return () => clearTimeout(cleanup);
    }
    return () => {};
  }, [isMouseOverMenu, isMouseOverDropdown]);

  return (
    <nav className="relative w-full">
      {/* Desktop Menu */}
      <div className="hidden lg:block w-full">
        <div className="flex items-center w-full">
          {/* Logo/Home - 실로스 */}
          <div className="flex-shrink-0 mr-6">
            <Link
              href="/"
              className="flex items-center text-teal-smoke-700 hover:text-teal-smoke-900 transition-colors duration-300"
            >
              <div className="text-xl font-display font-bold tracking-wider">
                SILOS
              </div>
            </Link>
          </div>

          {/* Menu Items - 중앙 정렬 */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-center space-x-2">
              {menuItems.slice(1).map((item) => (
                <div key={item.id} className="relative group">
                  <div
                    onMouseEnter={() => {
                      if (item.submenu) {
                        handleMenuEnter(item.id);
                      }
                    }}
                    onMouseLeave={() => {
                      setIsMouseOverMenu(false);
                    }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center px-2.5 py-2.5 rounded-lg text-[15px] font-elegant-sans font-medium transition-all duration-300 hover:bg-teal-smoke-50 text-teal-smoke-700 hover:text-teal-smoke-800 whitespace-nowrap"
                    >
                      <span className="whitespace-nowrap">{item.title}</span>
                      {item.submenu && (
                        <ChevronDown className="w-3 h-3 ml-1 transition-transform duration-200 group-hover:rotate-180 flex-shrink-0" />
                      )}
                    </Link>
                  </div>

                  {/* Dropdown Menu */}
                  {item.submenu && activeDropdown === item.id && (
                    <div
                      className="absolute top-full left-0 mt-1 z-50"
                      onMouseEnter={handleDropdownEnter}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <div className="w-56 bg-white border border-teal-smoke-200/50 rounded-lg shadow-xl py-1">
                        {item.submenu.map((subItem, index) => (
                          <Link
                            key={index}
                            href={subItem.href}
                            className="block px-3 py-2 text-sm text-teal-smoke-700 hover:text-teal-smoke-800 hover:bg-teal-smoke-50 transition-all duration-200"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg text-teal-smoke-700 hover:text-teal-smoke-900 hover:bg-teal-smoke-50 transition-all duration-300"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-t border-teal-smoke-200 shadow-lg z-50">
            <div className="py-2">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="block px-4 py-2 text-teal-smoke-700 hover:text-teal-smoke-800 hover:bg-teal-smoke-50 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Simple Mobile Menu Fallback */}
      <div className="block sm:hidden">
        <Link
          href="/about"
          className="px-3 py-2 rounded-lg text-base font-elegant-sans font-light text-teal-smoke-700 hover:text-teal-smoke-800 hover:bg-teal-smoke-50 transition-all duration-300 flex-shrink-0"
        >
          병원소개
        </Link>
        <Link
          href="/procedures"
          className="px-3 py-2 rounded-lg text-base font-elegant-sans font-light text-teal-smoke-700 hover:text-teal-smoke-800 hover:bg-teal-smoke-50 transition-all duration-300 flex-shrink-0"
        >
          시술안내
        </Link>
        <Link
          href="#contact"
          className="px-3 py-2 rounded-lg text-base font-elegant-sans font-light text-teal-smoke-700 hover:text-teal-smoke-800 hover:bg-teal-smoke-50 transition-all duration-300 flex-shrink-0"
        >
          상담
        </Link>
      </div>
    </nav>
  );
}