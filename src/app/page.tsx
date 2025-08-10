// src/app/page.tsx
import MainBannerSlider from '../components/MainBannerSlider';
import QuickConsultationMenu from '../components/QuickConsultationMenu';
import NavigationMenu from '../components/NavigationMenu';
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-smoke-50 via-white to-teal-smoke-100">
      {/* 헤더 네비게이션 */}
      <header className="fixed top-0 left-0 right-0 z-[1000] bg-white/90 backdrop-blur-xl border-b border-teal-smoke-200/50 shadow-sm">
        <div className="w-full">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20 w-full">
              {/* 네비게이션 메뉴 - 전체 너비 사용 */}
              <div className="flex-1 min-w-0">
                <NavigationMenu />
              </div>
              
              {/* 상담 버튼 */}
              <div className="hidden lg:block flex-shrink-0 ml-4">
                <button className="bg-teal-smoke-300 hover:bg-teal-smoke-400 text-teal-smoke-800 px-6 py-2.5 rounded-full text-sm font-elegant-sans font-medium transition-all duration-300 shadow-lg hover:shadow-xl border border-teal-smoke-400/30 whitespace-nowrap">
                  온라인 상담
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 배너 슬라이더 */}
      <main className="w-full">
        <Suspense fallback={<div className="h-screen flex items-center justify-center text-2xl font-elegant-sans font-light text-teal-smoke-600">Loading...</div>}>
          <MainBannerSlider />
        </Suspense>
        
        {/* 실로스 소개 섹션 */}
        <section id="about" className="w-full py-24 bg-gradient-to-br from-teal-smoke-50 via-white to-elegant-100">
          <div className="w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20">
                <h2 className="text-4xl font-display font-light text-teal-smoke-800 mb-6 tracking-wide">왜 실로스인가?</h2>
                <div className="w-20 h-0.5 bg-teal-smoke-300 rounded-full mx-auto mb-8"></div>
                <p className="text-xl font-elegant-sans font-light text-teal-smoke-700 max-w-3xl mx-auto leading-relaxed">
                  실리프팅의 새로운 기준, 실로스가 제시하는 차별화된 시술 철학
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
                <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 w-full max-w-sm border border-teal-smoke-200/50">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-smoke-200 to-teal-smoke-300 rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg">
                    <div className="w-10 h-10 bg-teal-smoke-400 rounded-xl opacity-70"></div>
                  </div>
                  <h3 className="text-xl font-elegant font-light text-teal-smoke-800 mb-6 text-center tracking-wide">맞춤형 시술</h3>
                  <p className="text-teal-smoke-600 text-center font-elegant-sans font-light leading-relaxed">개인별 얼굴 구조와 특성을 분석하여 최적의 시술 계획을 제안합니다.</p>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 w-full max-w-sm border border-elegant-200/50">
                  <div className="w-20 h-20 bg-gradient-to-br from-elegant-200 to-elegant-300 rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg">
                    <div className="w-10 h-10 bg-elegant-400 rounded-xl opacity-70"></div>
                  </div>
                  <h3 className="text-xl font-elegant font-light text-teal-smoke-800 mb-6 text-center tracking-wide">안전한 시술</h3>
                  <p className="text-teal-smoke-600 text-center font-elegant-sans font-light leading-relaxed">FDA 승인 제품과 첨단 장비를 사용하여 안전하고 효과적인 시술을 제공합니다.</p>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 w-full max-w-sm border border-teal-smoke-200/50">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-smoke-300 to-elegant-300 rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-smoke-400 to-elegant-400 rounded-xl opacity-70"></div>
                  </div>
                  <h3 className="text-xl font-elegant font-light text-teal-smoke-800 mb-6 text-center tracking-wide">자연스러운 결과</h3>
                  <p className="text-teal-smoke-600 text-center font-elegant-sans font-light leading-relaxed">과도하지 않은 자연스러운 변화로 본연의 아름다움을 극대화시킵니다.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 시술 안내 섹션 */}
        <section id="procedures" className="w-full py-24 bg-gradient-to-br from-white via-teal-smoke-50 to-elegant-50">
          <div className="w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20">
                <h2 className="text-4xl font-display font-light text-teal-smoke-800 mb-6 tracking-wide">대표 시술</h2>
                <div className="w-20 h-0.5 bg-teal-smoke-300 rounded-full mx-auto mb-8"></div>
                <p className="text-xl font-elegant-sans font-light text-teal-smoke-700 max-w-3xl mx-auto leading-relaxed">
                  실로스만의 특화된 시술로 더 젊고 아름다운 모습을 만나보세요
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
                {[
                  { name: '실로스 실리프팅', time: '30분', feature: '무절개', gradient: 'from-teal-smoke-100 to-teal-smoke-200' },
                  { name: '이마 눈썹 리프팅', time: '1시간', feature: '내시경', gradient: 'from-elegant-100 to-teal-smoke-200' },
                  { name: '눈밑 지방레이저', time: '10분', feature: '비절개', gradient: 'from-teal-smoke-200 to-elegant-200' },
                  { name: '실로팻', time: '20분', feature: '무통증', gradient: 'from-elegant-200 to-teal-smoke-300' }
                ].map((procedure, index) => (
                  <div key={index} className={`bg-gradient-to-br ${procedure.gradient} rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 w-full max-w-xs backdrop-blur-sm border border-white/50`}>
                    <div className="text-center">
                      <div className="w-24 h-24 bg-white/70 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg border border-teal-smoke-200/30">
                        <span className="text-2xl font-display font-light text-teal-smoke-700">{index + 1}</span>
                      </div>
                      <h3 className="text-lg font-elegant font-light text-teal-smoke-800 mb-4 tracking-wide leading-tight">{procedure.name}</h3>
                      <div className="flex justify-center space-x-2 text-sm">
                        <span className="bg-white/60 backdrop-blur-sm text-teal-smoke-600 px-4 py-2 rounded-full font-elegant-sans font-light border border-teal-smoke-200/30">{procedure.time}</span>
                        <span className="bg-white/60 backdrop-blur-sm text-teal-smoke-600 px-4 py-2 rounded-full font-elegant-sans font-light border border-teal-smoke-200/30">{procedure.feature}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 갤러리 섹션 */}
        <section id="gallery" className="w-full py-24 bg-gradient-to-br from-elegant-50 via-teal-smoke-100 to-white">
          <div className="w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20">
                <h2 className="text-4xl font-display font-light text-teal-smoke-800 mb-6 tracking-wide">Before & After</h2>
                <div className="w-20 h-0.5 bg-teal-smoke-300 rounded-full mx-auto mb-8"></div>
                <p className="text-xl font-elegant-sans font-light text-teal-smoke-700 max-w-3xl mx-auto leading-relaxed">
                  실로스에서 새로운 아름다움을 찾은 고객들의 변화를 확인하세요
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {[
                  { id: 1, gradient: 'from-teal-smoke-100 to-teal-smoke-200' },
                  { id: 2, gradient: 'from-elegant-100 to-elegant-200' },
                  { id: 3, gradient: 'from-teal-smoke-200 to-elegant-200' },
                  { id: 4, gradient: 'from-elegant-200 to-teal-smoke-300' },
                  { id: 5, gradient: 'from-teal-smoke-300 to-elegant-300' },
                  { id: 6, gradient: 'from-elegant-300 to-teal-smoke-200' }
                ].map((item) => (
                  <div key={item.id} className="bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 w-full max-w-sm border border-teal-smoke-200/30">
                    <div className={`aspect-square bg-gradient-to-br ${item.gradient} flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                      <span className="text-4xl font-display font-light text-teal-smoke-700 z-10 tracking-wider">B&A</span>
                      <div className="absolute top-4 right-4 w-8 h-8 bg-white/30 rounded-full"></div>
                      <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/20 rounded-full"></div>
                    </div>
                    <div className="p-8 text-center">
                      <h3 className="text-lg font-elegant font-light text-teal-smoke-800 mb-3 tracking-wide">시술 사례 {item.id}</h3>
                      <p className="text-teal-smoke-600 text-sm font-elegant-sans font-light leading-relaxed">실로스 실리프팅으로 자연스러운 변화</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 온라인 상담 섹션 */}
        <section id="contact" className="w-full py-24 bg-gradient-to-br from-teal-smoke-400 via-elegant-400 to-teal-smoke-500">
          <div className="w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center text-white">
                <h2 className="text-4xl font-display font-light mb-6 tracking-wide">온라인 상담 예약</h2>
                <div className="w-20 h-0.5 bg-white/60 rounded-full mx-auto mb-8"></div>
                <p className="text-xl font-elegant-sans font-light mb-16 text-white/90 max-w-3xl mx-auto leading-relaxed">
                  전문의와의 1:1 맞춤 상담으로 당신만의 아름다움을 계획하세요
                </p>
                
                <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input
                        type="text"
                        placeholder="이름"
                        className="w-full px-5 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/70 font-elegant-sans font-light transition-all"
                      />
                      <input
                        type="tel"
                        placeholder="연락처"
                        className="w-full px-5 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/70 font-elegant-sans font-light transition-all"
                      />
                    </div>
                    <select className="w-full px-5 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white font-elegant-sans font-light transition-all">
                      <option className="text-teal-smoke-800 bg-white">관심 시술을 선택해주세요</option>
                      <option className="text-teal-smoke-800 bg-white">실로스 실리프팅</option>
                      <option className="text-teal-smoke-800 bg-white">이마 눈썹 리프팅</option>
                      <option className="text-teal-smoke-800 bg-white">눈밑 지방레이저</option>
                      <option className="text-teal-smoke-800 bg-white">실로팻</option>
                    </select>
                    <textarea
                      placeholder="상담 내용을 적어주세요"
                      rows={4}
                      className="w-full px-5 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/70 font-elegant-sans font-light transition-all resize-none"
                    ></textarea>
                    <button
                      type="submit"
                      className="w-full bg-white/90 hover:bg-white text-teal-smoke-800 py-4 rounded-xl font-elegant-sans font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      상담 신청하기
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="w-full bg-gradient-to-br from-teal-smoke-800 via-elegant-800 to-teal-smoke-900 text-white py-16">
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
              <div className="md:col-span-1 flex flex-col items-center md:items-start">
                <h3 className="text-3xl font-display font-light text-teal-smoke-200 mb-4 tracking-wide">실로스</h3>
                <p className="text-teal-smoke-300 font-elegant-sans font-light">실리프팅은 실로스</p>
              </div>
              
              <div className="flex flex-col items-center md:items-start">
                <h4 className="text-lg font-elegant font-light mb-6 text-teal-smoke-200 tracking-wide">시술 안내</h4>
                <ul className="space-y-3 text-teal-smoke-400">
                  <li><a href="#" className="hover:text-teal-smoke-200 transition-colors font-elegant-sans font-light">실로스 실리프팅</a></li>
                  <li><a href="#" className="hover:text-teal-smoke-200 transition-colors font-elegant-sans font-light">이마 눈썹 리프팅</a></li>
                  <li><a href="#" className="hover:text-teal-smoke-200 transition-colors font-elegant-sans font-light">눈밑 지방레이저</a></li>
                  <li><a href="#" className="hover:text-teal-smoke-200 transition-colors font-elegant-sans font-light">실로팻</a></li>
                </ul>
              </div>
              
              <div className="flex flex-col items-center md:items-start">
                <h4 className="text-lg font-elegant font-light mb-6 text-teal-smoke-200 tracking-wide">병원 정보</h4>
                <ul className="space-y-3 text-teal-smoke-400 font-elegant-sans font-light">
                  <li>서울시 강남구 논현로 123</li>
                  <li>TEL: 02-1234-5678</li>
                  <li>진료시간: 평일 09:00-18:00</li>
                  <li>토요일 09:00-14:00</li>
                </ul>
              </div>
              
              <div className="flex flex-col items-center md:items-start">
                <h4 className="text-lg font-elegant font-light mb-6 text-teal-smoke-200 tracking-wide">빠른 상담</h4>
                <button className="bg-teal-smoke-300 hover:bg-teal-smoke-200 text-teal-smoke-800 px-8 py-3 rounded-full font-elegant-sans font-medium transition-all duration-300 mb-6 shadow-lg hover:shadow-xl">
                  카카오톡 상담
                </button>
                <div className="text-teal-smoke-400 text-sm font-elegant-sans font-light leading-relaxed">
                  평일 09:00-18:00<br />
                  토요일 09:00-14:00
                </div>
              </div>
            </div>
            
            <div className="border-t border-teal-smoke-700/50 mt-12 pt-8 text-center">
              <p className="text-teal-smoke-400 font-elegant-sans font-light">&copy; 2024 실로스 성형외과. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* 플로팅 퀵 상담 메뉴 */}
      <QuickConsultationMenu />
    </div>
  );
}