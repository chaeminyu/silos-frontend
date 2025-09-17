'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  ClockIcon,
  UserIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

interface ScheduledConsultation {
  id: number;
  name: string;
  phone: string;
  email: string;
  procedures: string[];
  message: string;
  preferredDate: string;
  preferredTime: string;
  scheduledDate: string;
  scheduledTime: string;
  assignedDoctor?: string; // 배정된 담당의 (입력 가능)
  status: 'pending' | 'received';
  adminMemo?: string; // 관리자 전용 메모 (고객에게 보이지 않음)
  isRegistered: boolean;
  createdAt: string;
}

const mockSchedule: ScheduledConsultation[] = [
  {
    id: 1,
    name: '김민지',
    phone: '010-1234-5678',
    email: 'minji@example.com',
    procedures: ['실로스 실리프팅', '미니리프팅'],
    message: '리프팅 시술에 대해 상담받고 싶습니다. 비용이나 회복기간에 대해서도 궁금합니다.',
    preferredDate: '2025-01-20',
    preferredTime: 'morning',
    scheduledDate: '2025-01-20',
    scheduledTime: '10:00',
    assignedDoctor: '김성민',
    status: 'received',
    adminMemo: 'VIP 고객, 특별 케어 필요',
    isRegistered: true,
    createdAt: '2025-01-15 14:30'
  },
  {
    id: 2,
    name: '박지원',
    phone: '010-9876-5432',
    email: 'jiwon@example.com',
    procedures: ['스킨보톡스'],
    message: '피부 관리 차원에서 상담받고 싶어요.',
    preferredDate: '2025-01-20',
    preferredTime: 'afternoon',
    scheduledDate: '2025-01-20',
    scheduledTime: '14:00',
    assignedDoctor: '이하늘',
    status: 'received',
    isRegistered: false,
    createdAt: '2025-01-14 10:15'
  },
  {
    id: 3,
    name: '이서연',
    phone: '010-5555-7777',
    email: 'seoyeon@example.com',
    procedures: ['콜라겐 필러'],
    message: '볼륨 개선 시술 상담 희망합니다.',
    preferredDate: '2025-01-21',
    preferredTime: 'morning',
    scheduledDate: '2025-01-21',
    scheduledTime: '11:00',
    assignedDoctor: '김성민',
    status: 'received',
    adminMemo: '알레르기 반응 주의',
    isRegistered: true,
    createdAt: '2025-01-10 16:45'
  },
  {
    id: 4,
    name: '최유진',
    phone: '010-3333-4444',
    email: 'yujin@example.com',
    procedures: ['물광주사', '레디어스'],
    message: '수분 부족한 피부 개선하고 싶어요.',
    preferredDate: '2025-01-22',
    preferredTime: 'evening',
    scheduledDate: '2025-01-22',
    scheduledTime: '15:30',
    status: 'received',
    isRegistered: true,
    createdAt: '2025-01-16 09:20'
  }
];

const statusConfig = {
  pending: { label: '대기중', color: 'bg-yellow-100 text-yellow-800' },
  received: { label: '접수 완료', color: 'bg-green-100 text-green-800' }
};

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30'
];

// 시간대 매핑
const timeSlotMapping = {
  morning: '오전 (10:00-12:00)',
  afternoon: '오후 (14:00-17:00)', 
  evening: '저녁 (17:00-19:00)'
};

export default function ConsultationSchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [schedule, setSchedule] = useState<ScheduledConsultation[]>(mockSchedule);

  // 선택된 날짜의 상담 일정
  const getDaySchedule = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return schedule.filter(item => item.scheduledDate === dateString);
  };

  // 주간 날짜 배열 생성
  const getWeekDates = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(startOfWeek.getDate() + mondayOffset);

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);
      week.push(currentDate);
    }
    return week;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', { 
      month: 'long', 
      day: 'numeric',
      weekday: 'short' 
    });
  };

  // 월간 날짜 배열 생성 (6주 표시)
  const getMonthDates = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // 첫 주의 월요일부터 시작
    const startDate = new Date(firstDay);
    const startDayOfWeek = firstDay.getDay();
    const mondayOffset = startDayOfWeek === 0 ? -6 : 1 - startDayOfWeek;
    startDate.setDate(firstDay.getDate() + mondayOffset);
    
    const dates = [];
    for (let i = 0; i < 42; i++) { // 6주 * 7일
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      dates.push(currentDate);
    }
    
    return dates;
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setSelectedDate(newDate);
  };

  const TimeSlotGrid = () => {
    if (viewMode === 'day') {
      const daySchedule = getDaySchedule(selectedDate);
      
      return (
        <div className="space-y-3">
          {daySchedule.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              이 날짜에 예정된 상담이 없습니다.
            </div>
          ) : (
            daySchedule.map(consultation => (
              <div
                key={consultation.id}
                className={`p-4 rounded-lg border-l-4 ${
                  consultation.status === 'received' ? 'border-green-500 bg-green-50' :
                  'border-yellow-500 bg-yellow-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <p className="text-lg font-medium text-gray-900">
                        {consultation.name}
                      </p>
                      <span className="text-sm text-gray-600">
                        {consultation.scheduledTime}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusConfig[consultation.status].color}`}>
                        {statusConfig[consultation.status].label}
                      </span>
                      {consultation.isRegistered && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          회원
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">{consultation.phone}</p>
                        <p className="text-sm text-gray-600">{consultation.email}</p>
                        {consultation.assignedDoctor && (
                          <p className="text-sm text-gray-700 mt-1">
                            담당의: <span className="font-medium">{consultation.assignedDoctor}</span>
                          </p>
                        )}
                      </div>
                      <div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {consultation.procedures.map((procedure, index) => (
                            <span
                              key={index}
                              className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                            >
                              {procedure}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">
                          희망: {timeSlotMapping[consultation.preferredTime as keyof typeof timeSlotMapping]}
                        </p>
                      </div>
                    </div>
                    
                    {consultation.message && (
                      <div className="mt-3 p-2 bg-gray-50 rounded text-sm text-gray-700">
                        {consultation.message}
                      </div>
                    )}
                    
                    {consultation.adminMemo && (
                      <p className="text-sm text-orange-600 mt-2 font-medium">
                        📝 {consultation.adminMemo}
                      </p>
                    )}
                  </div>
                  
                  <Link
                    href={`/admin/consultations/${consultation.id}`}
                    className="ml-4 text-gray-400 hover:text-gray-600"
                  >
                    <EyeIcon className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      );
    } else if (viewMode === 'week') {
      // 주간 뷰
      const weekDates = getWeekDates(selectedDate);
      
      return (
        <div>
          {/* 주간 헤더 */}
          <div className="grid grid-cols-8 gap-4 mb-4">
            <div className="text-sm font-medium text-gray-600">시간</div>
            {weekDates.map(date => (
              <div key={date.toISOString()} className="text-center">
                <p className="text-sm font-medium text-gray-900">
                  {date.getDate()}
                </p>
                <p className="text-xs text-gray-600">
                  {date.toLocaleDateString('ko-KR', { weekday: 'short' })}
                </p>
              </div>
            ))}
          </div>
          
          {/* 주간 일정 그리드 */}
          <div className="space-y-1">
            {timeSlots.map(time => (
              <div key={time} className="grid grid-cols-8 gap-4 min-h-[40px] border-b border-gray-100">
                <div className="flex items-center text-sm text-gray-600 font-medium">
                  {time}
                </div>
                {weekDates.map(date => {
                  const daySchedule = getDaySchedule(date);
                  const consultation = daySchedule.find(c => c.scheduledTime === time);
                  
                  return (
                    <div key={date.toISOString()} className="relative">
                      {consultation ? (
                        <div className={`p-2 rounded text-xs ${
                          consultation.status === 'received' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          <p className="font-medium truncate">{consultation.name}</p>
                          <p className="truncate">{consultation.assignedDoctor || '담당의 미정'}</p>
                          {consultation.adminMemo && (
                            <p className="text-xs text-orange-700 truncate">📝</p>
                          )}
                        </div>
                      ) : (
                        <div className="h-full"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      );
    } else if (viewMode === 'month') {
      // 월간 뷰
      const monthDates = getMonthDates(selectedDate);
      const currentMonth = selectedDate.getMonth();
      
      return (
        <div>
          {/* 월간 헤더 */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['월', '화', '수', '목', '금', '토', '일'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>
          
          {/* 월간 캘린더 그리드 */}
          <div className="grid grid-cols-7 gap-1">
            {monthDates.map((date, index) => {
              const isCurrentMonth = date.getMonth() === currentMonth;
              const isToday = date.toDateString() === new Date().toDateString();
              const daySchedule = getDaySchedule(date);
              
              return (
                <div
                  key={index}
                  className={`min-h-[120px] p-2 border border-gray-200 ${
                    isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                  } ${isToday ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => {
                    setSelectedDate(date);
                    setViewMode('day');
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={`text-sm font-medium mb-2 ${
                    isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                  } ${isToday ? 'text-blue-600 font-bold' : ''}`}>
                    {date.getDate()}
                  </div>
                  
                  <div className="space-y-1">
                    {daySchedule.slice(0, 3).map((consultation, i) => (
                      <div
                        key={i}
                        className={`text-xs px-2 py-1 rounded truncate ${
                          consultation.status === 'received' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        <div className="flex items-center space-x-1">
                          <span>{consultation.scheduledTime}</span>
                          <span>{consultation.name}</span>
                          {consultation.adminMemo && (
                            <span className="text-orange-600">📝</span>
                          )}
                        </div>
                      </div>
                    ))}
                    {daySchedule.length > 3 && (
                      <div className="text-xs text-gray-500 px-2">
                        +{daySchedule.length - 3}개 더
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">상담 일정 관리</h1>
          <p className="text-sm text-gray-600 mt-1">
            상담실별 일정을 관리하고 배정할 수 있습니다
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
            <button
              onClick={() => setViewMode('day')}
              className={`px-4 py-2 text-sm font-medium ${
                viewMode === 'day' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              일간
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 text-sm font-medium ${
                viewMode === 'week' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              주간
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-4 py-2 text-sm font-medium ${
                viewMode === 'month' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              월간
            </button>
          </div>
        </div>
      </div>

      {/* 날짜 네비게이션 */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateDate('prev')}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              {viewMode === 'day' 
                ? formatDate(selectedDate)
                : viewMode === 'week'
                ? `${formatDate(getWeekDates(selectedDate)[0])} - ${formatDate(getWeekDates(selectedDate)[6])}`
                : selectedDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })
              }
            </h2>
          </div>
          
          <button
            onClick={() => navigateDate('next')}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center">
            <CalendarDaysIcon className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">오늘 상담</p>
              <p className="text-2xl font-bold text-gray-900">
                {getDaySchedule(new Date()).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center">
            <ClockIcon className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">완료된 상담</p>
              <p className="text-2xl font-bold text-gray-900">
                {schedule.filter(s => s.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center">
            <UserIcon className="w-8 h-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">김성민 원장</p>
              <p className="text-2xl font-bold text-gray-900">
                {schedule.filter(s => s.doctor === '김성민 원장' && s.status === 'confirmed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center">
            <UserIcon className="w-8 h-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">이하늘 원장</p>
              <p className="text-2xl font-bold text-gray-900">
                {schedule.filter(s => s.doctor === '이하늘 원장' && s.status === 'confirmed').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 일정 그리드 */}
      <div className="bg-white rounded-lg border p-6">
        <TimeSlotGrid />
      </div>

      {/* 담당의 배정 및 메모 관리 */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">상담 관리</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* 담당의 배정 */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">담당의 배정</h4>
            <div className="space-y-3">
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">상담 선택</option>
                {schedule
                  .filter(s => s.status === 'received')
                  .map(consultation => (
                    <option key={consultation.id} value={consultation.id}>
                      {consultation.scheduledDate} {consultation.scheduledTime} - {consultation.name}
                    </option>
                  ))
                }
              </select>
              <input
                type="text"
                placeholder="담당의 이름 입력..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                담당의 배정
              </button>
            </div>
          </div>

          {/* 관리자 메모 */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">관리자 전용 메모</h4>
            <div className="space-y-3">
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">상담 선택</option>
                {schedule
                  .filter(s => s.status === 'received')
                  .map(consultation => (
                    <option key={consultation.id} value={consultation.id}>
                      {consultation.scheduledDate} {consultation.scheduledTime} - {consultation.name}
                    </option>
                  ))
                }
              </select>
              <textarea
                placeholder="관리자 전용 메모 입력..."
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
              <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                메모 저장
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              ⚠️ 이 메모는 관리자만 볼 수 있으며, 고객에게는 표시되지 않습니다.
            </p>
          </div>
        </div>
      </div>

      {/* 범례 */}
      <div className="bg-white rounded-lg border p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">상태 범례</h3>
        <div className="flex flex-wrap gap-4">
          {Object.entries(statusConfig).map(([status, config]) => (
            <div key={status} className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${config.color}`}></div>
              <span className="text-sm text-gray-600">{config.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}