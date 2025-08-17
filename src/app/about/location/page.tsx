'use client';

import { useEffect } from 'react';
import { MapPin, Clock, Car, Bus, Phone, Navigation, ExternalLink } from 'lucide-react';
import PageLayout from '../../../components/PageLayout';

export default function LocationPage() {
  const clinicInfo = {
    name: '실로스 성형외과',
    address: '경상남도 창원시 성산구 중앙대로 114, 1층',
    landmark: '창원 롯데백화점 맞은편 위치',
    phone: '000-0000-0000', // (추후 정보 수정 예정)
    naverMapUrl: 'https://naver.me/5ne48IO6'
  };

  const operatingHours = [
    { day: '월요일', time: '00:00 - 00:00 (추후 정보 수정 예정)', isToday: false },
    { day: '화요일', time: '00:00 - 00:00 (추후 정보 수정 예정)', isToday: false },
    { day: '수요일', time: '00:00 - 00:00 (추후 정보 수정 예정)', isToday: false },
    { day: '목요일', time: '00:00 - 00:00 (추후 정보 수정 예정)', isToday: false },
    { day: '금요일', time: '00:00 - 00:00 (추후 정보 수정 예정)', isToday: false },
    { day: '토요일', time: '00:00 - 00:00 (추후 정보 수정 예정)', isToday: false },
    { day: '일요일', time: '휴진 (추후 정보 수정 예정)', isHoliday: true }
  ];

  const transportInfo = [
    {
      type: '지하철',
      icon: Bus,
      details: [
        '(추후 정보 수정 예정)',
        '가까운 역과 도보 시간 안내 예정'
      ]
    },
    {
      type: '버스',
      icon: Bus,
      details: [
        '(추후 정보 수정 예정)',
        '버스 노선 및 정류장 정보 예정'
      ]
    },
    {
      type: '자가용',
      icon: Car,
      details: [
        '(추후 정보 수정 예정)',
        '자차 이용 시 길 안내 예정'
      ]
    }
  ];

  const parkingInfo = [
    '주차장 정보 (추후 정보 수정 예정)',
    '주차 요금 안내 (추후 정보 수정 예정)',
    '주차 할인 정보 (추후 정보 수정 예정)',
    '인근 대체 주차장 안내 (추후 정보 수정 예정)'
  ];

  useEffect(() => {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      // Create a clean static map representation with Google Maps Static API or similar
      // Since we can't get a clean Naver Map embed, let's create a beautiful static representation
      mapContainer.innerHTML = `
        <div class="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-teal-smoke-100 to-elegant-100 cursor-pointer hover:from-teal-smoke-200 hover:to-elegant-200 transition-all duration-300" id="mapClickArea">
          <!-- Static Map Background -->
          <div class="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-80"></div>
          
          <!-- Map Grid Pattern -->
          <div class="absolute inset-0" style="background-image: linear-gradient(rgba(45, 212, 191, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(45, 212, 191, 0.1) 1px, transparent 1px); background-size: 20px 20px;"></div>
          
          <!-- Location Content -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-teal-smoke-200/50 max-w-sm">
              <div class="w-16 h-16 bg-gradient-to-br from-teal-smoke-300 to-teal-smoke-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              
              <h3 class="text-lg font-elegant font-medium text-teal-smoke-800 mb-2">실로스 성형외과</h3>
              <p class="text-sm font-elegant-sans font-light text-teal-smoke-600 mb-3 leading-relaxed">창원시 성산구 중앙대로 114, 1층<br>창원 롯데백화점 맞은편 위치</p>
              
              <div class="flex flex-col space-y-2 mt-4">
                <div class="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-teal-smoke-300 to-elegant-300 hover:from-teal-smoke-400 hover:to-elegant-400 text-teal-smoke-800 rounded-full text-sm font-elegant-sans font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"/>
                  </svg>
                  네이버 지도로 길찾기
                </div>
                <p class="text-xs text-teal-smoke-500">클릭하여 정확한 위치와 길찾기를 확인하세요</p>
              </div>
            </div>
          </div>
          
          <!-- Decorative Elements -->
          <div class="absolute top-6 left-6 w-3 h-3 bg-teal-smoke-400 rounded-full opacity-60 animate-pulse"></div>
          <div class="absolute top-12 right-8 w-2 h-2 bg-elegant-400 rounded-full opacity-40 animate-pulse" style="animation-delay: 0.5s;"></div>
          <div class="absolute bottom-8 left-10 w-4 h-4 bg-teal-smoke-300 rounded-full opacity-30 animate-pulse" style="animation-delay: 1s;"></div>
          <div class="absolute bottom-6 right-6 w-2 h-2 bg-elegant-300 rounded-full opacity-50 animate-pulse" style="animation-delay: 1.5s;"></div>
        </div>
      `;
      
      // Add single click event to the entire map area
      const mapClickArea = document.getElementById('mapClickArea');
      if (mapClickArea) {
        mapClickArea.addEventListener('click', () => {
          window.open(clinicInfo.naverMapUrl, '_blank');
        });
      }
    }
  }, [clinicInfo.naverMapUrl]);

  const handleMapClick = () => {
    window.open(clinicInfo.naverMapUrl, '_blank');
  };

  const getTodayIndex = () => {
    return new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  };

  return (
    <PageLayout>
      {/* 헤더 배너 */}
      <div className="bg-gradient-to-r from-teal-smoke-400 via-elegant-400 to-teal-smoke-500 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-display font-light mb-6 tracking-wide">
              진료시간 안내 / 오시는길
            </h1>
            <div className="w-20 h-0.5 bg-white/60 rounded-full mx-auto mb-8"></div>
            <p className="text-xl font-elegant-sans font-light text-white/90">
              실로스 성형외과로 오시는 방법과 진료 안내를 확인하세요
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 병원 기본 정보 */}
        <section className="mb-16">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-10 shadow-lg border border-teal-smoke-200/30">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-display font-light text-teal-smoke-800 mb-8 tracking-wide">
                  병원 정보
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-teal-smoke-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-elegant font-medium text-teal-smoke-800 mb-2">주소</h3>
                      <p className="font-elegant-sans font-light text-teal-smoke-700 leading-relaxed">
                        {clinicInfo.address}
                      </p>
                      <p className="font-elegant-sans font-light text-teal-smoke-600 text-sm mt-1">
                        {clinicInfo.landmark}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-teal-smoke-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-elegant font-medium text-teal-smoke-800 mb-2">대표 전화</h3>
                      <p className="font-elegant-sans font-light text-teal-smoke-700">
                        <a href={`tel:${clinicInfo.phone}`} className="hover:text-teal-smoke-900 transition-colors">
                          {clinicInfo.phone}
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-6">
                    <button
                      onClick={handleMapClick}
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-smoke-300 to-elegant-300 hover:from-teal-smoke-400 hover:to-elegant-400 text-teal-smoke-800 font-elegant-sans font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <Navigation className="w-5 h-5 mr-2" />
                      네이버 지도로 길찾기
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 지도 */}
              <div>
                <h2 className="text-3xl font-display font-light text-teal-smoke-800 mb-8 tracking-wide">
                  위치
                </h2>
                <div 
                  id="map" 
                  className="w-full h-80 rounded-2xl shadow-lg border border-teal-smoke-200/30 overflow-hidden"
                >
                  {/* Naver Map will be embedded here */}
                </div>
                <p className="text-center text-sm font-elegant-sans font-light text-teal-smoke-600 mt-4">
                  지도를 클릭하여 네이버 지도에서 정확한 위치와 길찾기를 확인하세요
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 진료시간 */}
        <section className="mb-16">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-10 shadow-lg border border-teal-smoke-200/30">
            <h2 className="text-3xl font-display font-light text-teal-smoke-800 mb-8 tracking-wide text-center">
              진료시간 안내
            </h2>
            
            <div className="max-w-2xl mx-auto">
              <div className="space-y-4">
                {operatingHours.map((schedule, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-6 rounded-xl transition-all duration-300 ${
                      index === getTodayIndex()
                        ? 'bg-gradient-to-r from-teal-smoke-100 to-elegant-100 border border-teal-smoke-300/50'
                        : schedule.isHoliday
                        ? 'bg-gray-50 border border-gray-200'
                        : 'bg-white/50 border border-teal-smoke-200/30'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <Clock className={`w-5 h-5 ${
                        index === getTodayIndex() 
                          ? 'text-teal-smoke-700' 
                          : schedule.isHoliday 
                          ? 'text-gray-400' 
                          : 'text-teal-smoke-600'
                      }`} />
                      <span className={`font-elegant font-medium ${
                        index === getTodayIndex()
                          ? 'text-teal-smoke-800'
                          : schedule.isHoliday
                          ? 'text-gray-500'
                          : 'text-teal-smoke-700'
                      }`}>
                        {schedule.day}
                        {index === getTodayIndex() && <span className="text-teal-smoke-600 ml-2">(오늘)</span>}
                      </span>
                    </div>
                    <span className={`font-elegant-sans font-light ${
                      index === getTodayIndex()
                        ? 'text-teal-smoke-800 font-medium'
                        : schedule.isHoliday
                        ? 'text-red-500'
                        : 'text-teal-smoke-700'
                    }`}>
                      {schedule.time}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-elegant-100 to-teal-smoke-100 rounded-xl border border-teal-smoke-200/30">
                <h3 className="font-elegant font-medium text-teal-smoke-800 mb-3">📋 진료 안내</h3>
                <ul className="space-y-2 text-sm font-elegant-sans font-light text-teal-smoke-700">
                  <li>• 점심시간: (추후 정보 수정 예정)</li>
                  <li>• 휴진일: (추후 정보 수정 예정)</li>
                  <li>• 예약 안내: (추후 정보 수정 예정)</li>
                  <li>• 특별 사항: (추후 정보 수정 예정)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 교통 정보 */}
        <section className="mb-16">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-10 shadow-lg border border-teal-smoke-200/30">
            <h2 className="text-3xl font-display font-light text-teal-smoke-800 mb-8 tracking-wide text-center">
              대중교통 안내
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {transportInfo.map((transport, index) => {
                const IconComponent = transport.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-teal-smoke-200 to-elegant-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <IconComponent className="w-10 h-10 text-teal-smoke-700" />
                    </div>
                    <h3 className="text-xl font-elegant font-medium text-teal-smoke-800 mb-4">{transport.type}</h3>
                    <ul className="space-y-2">
                      {transport.details.map((detail, idx) => (
                        <li key={idx} className="font-elegant-sans font-light text-teal-smoke-700 text-sm leading-relaxed">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 주차 안내 */}
        <section>
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-10 shadow-lg border border-teal-smoke-200/30">
            <h2 className="text-3xl font-display font-light text-teal-smoke-800 mb-8 tracking-wide text-center">
              주차장 안내
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Car className="w-6 h-6 text-teal-smoke-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-elegant font-medium text-teal-smoke-800 mb-3">주차 정보</h3>
                      <ul className="space-y-2">
                        {parkingInfo.map((info, index) => (
                          <li key={index} className="font-elegant-sans font-light text-teal-smoke-700 text-sm leading-relaxed">
                            • {info}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-elegant-100 to-teal-smoke-100 rounded-2xl p-6 border border-teal-smoke-200/30">
                  <h3 className="font-elegant font-medium text-teal-smoke-800 mb-4">🚗 주차 요금</h3>
                  <div className="space-y-3 text-sm font-elegant-sans font-light text-teal-smoke-700">
                    <div className="flex justify-between">
                      <span>기본 요금</span>
                      <span className="text-teal-smoke-600">(추후 정보 수정 예정)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>할인 혜택</span>
                      <span className="text-teal-smoke-600">(추후 정보 수정 예정)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1일 최대</span>
                      <span className="text-teal-smoke-600">(추후 정보 수정 예정)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* 온라인 상담 섹션 - 전체 폭 사용 */}
      <section id="contact" className="w-full py-24 bg-gradient-to-br from-teal-smoke-400 via-elegant-400 to-teal-smoke-500">
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <h2 className="text-4xl font-display font-light mb-6 tracking-wide">온라인 상담 예약</h2>
              <div className="w-20 h-0.5 bg-white/60 rounded-full mx-auto mb-8"></div>
              <p className="text-xl font-elegant-sans font-light mb-16 text-white/90 max-w-3xl mx-auto leading-relaxed">
                전문의와의 1:1 맞춤 상담으로 당신만의 아름다움을 계획하세요
              </p>
              
              <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
                  <form className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

    </PageLayout>
  );
}