'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import PageLayout from '../../../components/PageLayout';
import { Calendar, Eye, ArrowLeft, Clock } from 'lucide-react';

interface EventDetail {
  id: string;
  title: string;
  period: string;
  posterUrl: string;
  status: 'ongoing' | 'upcoming' | 'ended';
  content: string;
  viewCount: number;
  createdAt: string;
}

// 임시 데이터 - 실제로는 백엔드에서 가져와야 함
const eventDetails: { [key: string]: EventDetail } = {
  '1': {
    id: '1',
    title: '실로스 실리프팅 솔루션',
    period: '2025-08-01 ~ 2025-09-30',
    posterUrl: '/images/events/silos-lifting-event.jpg',
    status: 'ongoing',
    content: `
      <h3>이벤트 혜택</h3>
      <ul>
        <li>개인별 피부 상태, 탄력도, 블루밍을 정밀 분석하여 최적의 실 조합으로 개인 맞춤형 리프팅 솔루션을 제공합니다.</li>
        <li>67회 세미나 성형 세미나 참여</li>
        <li>500명 의료진 대상 강의</li>
        <li>10,000명 국내 해외 수강 의료진</li>
      </ul>
      
      <h3>이벤트 기간</h3>
      <p>2025년 8월 1일 ~ 9월 30일까지</p>
      
      <h3>특별 혜택</h3>
      <ul>
        <li>첫 방문 고객 20% 할인</li>
        <li>2인 이상 동시 시술 시 추가 10% 할인</li>
        <li>무료 진료 상담 및 피부 분석</li>
      </ul>
    `,
    viewCount: 371,
    createdAt: '2025-08-01 10:21'
  },
  '2': {
    id: '2',
    title: '실로스 레이저 리프팅',
    period: '2025-08-01 ~ 2025-09-30',
    posterUrl: '/images/events/laser-lifting-event.jpg',
    status: 'ongoing',
    content: `
      <h3>레이저 리프팅 특별 이벤트</h3>
      <p>최신 레이저 장비를 활용한 프리미엄 리프팅 시술을 특별 가격에 만나보세요.</p>
      
      <h3>시술 효과</h3>
      <ul>
        <li>즉각적인 리프팅 효과</li>
        <li>콜라겐 재생 촉진</li>
        <li>피부 탄력 개선</li>
        <li>주름 개선</li>
      </ul>
    `,
    viewCount: 256,
    createdAt: '2025-08-01 10:21'
  },
  '3': {
    id: '3',
    title: '가을 특별 이벤트',
    period: '2025-09-15 ~ 2025-10-31',
    posterUrl: '/images/events/autumn-event.jpg',
    status: 'upcoming',
    content: `
      <h3>가을맞이 특별 프로모션</h3>
      <p>건조한 가을 날씨에 대비한 특별 케어 프로그램을 준비했습니다.</p>
    `,
    viewCount: 125,
    createdAt: '2025-08-20 10:21'
  },
  '4': {
    id: '4',
    title: '여름 스페셜 프로모션',
    period: '2025-06-01 ~ 2025-07-31',
    posterUrl: '/images/events/summer-event.jpg',
    status: 'ended',
    content: `
      <h3>종료된 이벤트</h3>
      <p>이 이벤트는 종료되었습니다. 다른 진행 중인 이벤트를 확인해주세요.</p>
    `,
    viewCount: 892,
    createdAt: '2025-06-01 10:21'
  }
};

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    // 실제로는 백엔드 API 호출
    const eventId = params.id as string;
    const eventData = eventDetails[eventId];
    
    if (eventData) {
      setEvent(eventData);
      // 조회수 증가 (실제로는 백엔드에서 처리)
      const newViewCount = eventData.viewCount + 1;
      setViewCount(newViewCount);
      eventDetails[eventId].viewCount = newViewCount;
    } else {
      // 이벤트가 없으면 목록으로 리다이렉트
      router.push('/events');
    }
  }, [params.id, router]);

  if (!event) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-smoke-400 mx-auto"></div>
            <p className="mt-4 text-slate-600">로딩 중...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="relative bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 뒤로가기 버튼 */}
          <Link 
            href="/events"
            className="inline-flex items-center text-slate-600 hover:text-slate-800 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="font-elegant-sans font-medium">이벤트 목록</span>
          </Link>

          {/* 상태 배지 */}
          <div className="mb-4">
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-elegant-sans font-bold ${
              event.status === 'ongoing' 
                ? 'bg-green-100 text-green-800 border border-green-200'
                : event.status === 'upcoming'
                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                : 'bg-gray-100 text-gray-800 border border-gray-200'
            }`}>
              {event.status === 'ongoing' && '진행 중'}
              {event.status === 'upcoming' && '진행 예정'}
              {event.status === 'ended' && '종료'}
            </span>
          </div>

          {/* 제목 */}
          <h1 className="text-3xl lg:text-4xl font-display font-medium text-slate-800 mb-6">
            {event.title}
          </h1>

          {/* 메타 정보 */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-8 pb-8 border-b border-slate-200">
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              <span className="font-elegant-sans">{viewCount}회</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span className="font-elegant-sans">{event.createdAt}</span>
            </div>
          </div>

          {/* 이벤트 기간 */}
          <div className="bg-gradient-to-r from-teal-smoke-100 to-elegant-100 rounded-xl p-6 mb-8 border border-teal-smoke-200">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-teal-smoke-600" />
              <div>
                <p className="text-sm font-elegant-sans font-medium text-slate-600">이벤트 기간</p>
                <p className="text-lg font-elegant font-medium text-slate-800">{event.period}</p>
              </div>
            </div>
          </div>

          {/* 포스터 이미지 */}
          <div className="relative aspect-[4/5] max-w-lg mx-auto bg-gradient-to-br from-teal-smoke-100 to-elegant-100 rounded-2xl overflow-hidden mb-12 shadow-xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-slate-600">
                <Calendar className="w-20 h-20 mx-auto mb-4 text-teal-smoke-400" />
                <p className="font-elegant-sans font-medium text-lg">
                  이벤트 포스터
                </p>
              </div>
            </div>
          </div>

          {/* 이벤트 내용 */}
          <div 
            className="prose prose-lg max-w-none font-elegant-sans"
            dangerouslySetInnerHTML={{ __html: event.content }}
            style={{
              fontFamily: 'var(--font-elegant-sans)',
            }}
          />

          {/* 이벤트 신청 버튼 */}
          {event.status === 'ongoing' && (
            <div className="mt-12 text-center">
              <Link
                href="/consultation/request"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-smoke-500 to-elegant-500 text-white rounded-xl font-elegant-sans font-bold text-lg hover:from-teal-smoke-600 hover:to-elegant-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                이벤트 신청하기
              </Link>
            </div>
          )}

          {/* 목록으로 버튼 */}
          <div className="mt-16 text-center">
            <Link
              href="/events"
              className="inline-flex items-center px-6 py-3 border-2 border-teal-smoke-300 text-teal-smoke-600 rounded-xl font-elegant-sans font-medium hover:bg-teal-smoke-50 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              목록으로 돌아가기
            </Link>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}