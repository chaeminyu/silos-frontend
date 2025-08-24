'use client';

import { useState } from 'react';
import PageLayout from '../../components/PageLayout';
import { ChevronRight, Smartphone, MousePointer, Eye, MessageSquare, Settings } from 'lucide-react';

const guideSteps = [
  {
    id: 1,
    title: '🏠 메인페이지 둘러보기',
    description: '홈페이지 첫 화면에서 전체 구조 파악하기',
    steps: [
      '메인페이지(/)에서 시작하세요',
      '📱 모바일: 15개 시술 카테고리 그리드 확인',
      '🖥️ PC: 메인 배너 슬라이더 확인', 
      '아래로 스크롤하며 각 섹션 확인:',
      '  • 파란색 가이드 배너',
      '  • "왜 실로스인가?" 섹션',
      '  • "대표 시술" 탭 섹션',
      '  • "Before & After" 갤러리',
      '  • "온라인 상담" 폼',
      '다시 상단으로 올라가서 메뉴 확인'
    ],
    icon: Eye,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    title: '🔍 커스텀 리프팅 페이지 접근',
    description: '메뉴에서 커스텀 리프팅으로 이동하기',
    steps: [
      '상단 헤더에서 "시술안내" 클릭',
      '드롭다운에서 "커스텀 리프팅" 찾기',
      '9개 장비 중 하나 선택:',
      '  • 울쎄라 (추천)',
      '  • 덴서티',
      '  • 올타이트',
      '  • 온다', 
      '  • 기타 5개 장비',
      '커스텀 리프팅 페이지로 이동됨'
    ],
    icon: MousePointer,
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 3,
    title: '⚡ 장비 탭 체험하기',
    description: '9개 장비를 클릭해서 정보 확인하기',
    steps: [
      '왼쪽 사이드바: 9개 장비 버튼',
      '오른쪽: 선택한 장비 상세 정보',
      '각 장비 버튼을 클릭해보세요:',
      '  1. 울쎄라 - HIFU 리프팅',
      '  2. 덴서티 - 초음파 리프팅', 
      '  3. 올타이트 - 3단계 리프팅',
      '  4. 온다 - 마이크로파',
      '  5. 기타 5개 장비들',
      '확인사항:',
      '  • 장비 이미지 전환 애니메이션',
      '  • 특징과 효과 설명',
      '  • 가격 정보',
      '"상담 신청하기" 버튼 클릭'
    ],
    icon: Smartphone,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 4,
    title: '🎯 PART 섹션 체험',
    description: '부위별 시술 선택 기능 테스트하기',
    steps: [
      '페이지 아래로 스크롤',
      '"어떤 부위가 고민이신가요?" 섹션 찾기',
      '구조 확인:',
      '  • 왼쪽: 얼굴 이미지',
      '  • 오른쪽: 5개 케이스 버튼',
      '각 케이스 버튼 클릭:',
      '  • CASE 01: 이마주름',
      '  • CASE 02: 눈가라인',
      '  • CASE 03: 심부볼',
      '  • CASE 04: 팔자주름',
      '  • CASE 05: 이중턱/목주름',
      '확인사항:',
      '  • 왼쪽 이미지 부위별 하이라이트',
      '  • 부위별 설명 표시',
      '"담기" 버튼들 클릭해보기'
    ],
    icon: MousePointer,
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 5,
    title: '📝 상담 신청 폼 작성',
    description: '개인정보 입력하고 시술 선택하기',
    steps: [
      '페이지 맨 아래로 스크롤',
      '파란색 "상담 신청" 섹션 찾기',
      '개인정보 입력:',
      '  • 이름: "홍길동"',
      '  • 연락처: "010-1234-5678"',
      '  • 이메일: "test@example.com"',
      '"관심 시술 선택" 버튼 클릭',
      '모달창에서 시술 선택:',
      '  • 📱 모바일: 2단계 선택',
      '  • 🖥️ PC: 좌우 분할 화면',
      '원하는 장비들 여러개 선택',
      '상담 내용 작성 (예시):',
      '  "전체적인 리프팅 원해요"',
      '"상담 신청하기" 버튼으로 완료'
    ],
    icon: MessageSquare,
    color: 'from-teal-500 to-blue-500'
  },
  {
    id: 6,
    title: '✅ 신청 확인 및 완료',
    description: '신청 내용 최종 확인하고 제출하기',
    steps: [
      '자동으로 확인 페이지 이동',
      '페이지 구성 확인:',
      '  • 상단: 진행 상태',
      '  • 중간: 신청 내용 카드들',
      '  • 하단: 최종 제출 버튼',
      '각 섹션 내용 확인:',
      '  📝 개인정보 (수정 가능)',
      '  🎯 선택한 시술들 (삭제 가능)',
      '  📅 희망 상담 날짜/시간',
      '기능 테스트:',
      '  • "편집" 버튼들 클릭',
      '  • "삭제" 버튼들 클릭',
      '  • 날짜와 시간 선택',
      '  • 추가 요청사항 작성',
      '"최종 상담 신청" 버튼으로 완료',
      '관리자에게 자동 전송됨'
    ],
    icon: Settings,
    color: 'from-indigo-500 to-purple-500'
  }
];

export default function GuidePage() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const toggleStep = (stepId: number) => {
    setActiveStep(activeStep === stepId ? null : stepId);
  };

  return (
    <PageLayout>
      {/* 히어로 섹션 */}
      <div className="relative pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center text-white">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-elegant-sans font-medium mb-8 border border-white/30">
              <Smartphone className="w-4 h-4 mr-2" />
              WEBSITE GUIDE
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-light mb-6 tracking-wide leading-tight">
              실로스 홈페이지 이용 방법
            </h1>
            <div className="w-24 h-0.5 bg-white/60 rounded-full mx-auto mb-8"></div>
            <p className="text-lg font-elegant-sans font-light max-w-4xl mx-auto leading-relaxed text-white/90">
              점검용으로 웹페이지 둘러보실 때 보세요!<br />
              <span className="font-medium text-cyan-300">모바일에서 커스텀 리프팅</span> 페이지를 중심으로<br />
              <span className="font-medium text-yellow-300">6단계 간단 가이드</span>를 제공합니다.
            </p>
          </div>
        </div>
      </div>

      {/* 메인 가이드 섹션 */}
      <div className="relative -mt-16 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 안내 메시지 */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 mb-12 border border-cyan-200/30">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-display font-medium text-slate-800 mb-4">
                📱 모바일에서 체험해보세요
              </h2>
              <p className="text-slate-600 font-elegant-sans leading-relaxed">
                실제 고객이 사용하는 방식으로 만들어진 가이드입니다.<br />
                각 단계를 따라하시면 홈페이지의 핵심 기능들을 모두 체험할 수 있어요!<br />
                <span className="text-sm text-slate-500 mt-2 block">💡 클릭할 부분과 확인할 내용이 명확하게 표시되어 있습니다.</span>
              </p>
            </div>
          </div>

          {/* 단계별 가이드 */}
          <div className="space-y-4">
            {guideSteps.map((step) => {
              const IconComponent = step.icon;
              const isActive = activeStep === step.id;
              
              return (
                <div key={step.id} className="bg-white rounded-2xl shadow-lg border border-slate-200/50 overflow-hidden">
                  <button
                    onClick={() => toggleStep(step.id)}
                    className="w-full p-6 text-left hover:bg-slate-50 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-1">
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-slate-600 text-white text-xs font-bold rounded-full">
                            {step.id}
                          </span>
                          <h3 className="text-lg font-display font-medium text-slate-800">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-sm font-elegant-sans text-slate-600">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    <div className={`transform transition-transform duration-200 ${isActive ? 'rotate-90' : ''}`}>
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    </div>
                  </button>
                  
                  {isActive && (
                    <div className="px-6 pb-6 border-t border-slate-100">
                      <div className="pt-4 pl-16">
                        <div className="space-y-3">
                          {step.steps.map((stepDetail, stepIndex) => (
                            <div key={stepIndex} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-slate-300 rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-sm font-elegant-sans text-slate-700 leading-relaxed">
                                {stepDetail}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 완료 메시지 */}
          <div className="mt-16 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-200/30">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-display font-medium text-slate-800 mb-4">
                🎉 가이드 완료!
              </h3>
              <p className="text-slate-600 font-elegant-sans leading-relaxed mb-6">
                6단계를 모두 체험해보셨다면<br />
                실로스 홈페이지의 핵심 기능들을 모두 확인하신 것입니다!<br />
                실제 고객들도 이와 같은 방식으로 쉽게 상담 신청을 할 수 있어요.<br />
                <span className="text-sm text-emerald-600 mt-2 block font-medium">✨ 이제 고객들에게 자신있게 안내해주세요!</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl font-elegant-sans font-medium hover:from-slate-700 hover:to-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  메인페이지로 돌아가기
                </a>
                <a
                  href="/procedures/custom-lifting"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-elegant-sans font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  커스텀 리프팅 페이지로 이동
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}