'use client';

import PageLayout from '../../../components/PageLayout';
import StandardConsultationSection from '../../../components/StandardConsultationSection';

const DoctorsPage = () => {
  // Doctors data (same as main page)
  const doctorsData = [
    {
      id: 1,
      name: '정영진',
      title: '원장',
      image: '/images/doctors/정영진_원장.png',
      bio: {
        title: 'MEDICAL DOCTOR',
        name: '정영진 원장',
        positions: [
          '실로스 창원 원장',
          '포에버 성형외과 창립 원장',
          '(전)시온성형외과 대표 원장',
          '중한국제미용성형의학회장',
          '국제성형외과학회 정회원',
          '시온 열린성형세미나 주관원장',
          '(2009년부터 65회 개회 강의 수술.시연)'
        ],
        specialties: [
          '실리프팅/이마 & 안면거상/눈성형',
          '실로팻/고난이도 필러'
        ]
      }
    },
    {
      id: 2,
      name: '임동혁',
      title: '원장',
      image: '/images/doctors/임동혁_원장.png',
      bio: {
        title: 'MEDICAL DOCTOR',
        name: '임동혁 원장',
        positions: [
          '실로스 창원 원장',
          '대한 미용성형레이져 학회 정회원',
          '대한 리프팅연구회 정회원',
          '대한 미용외과 학회 정회원',
          '고난도 필러, 보톡스 전문',
          '울쎄라, 온다 레이져 키닥터',
          '덴서티, 엔코어 키닥터',
          '슈링크, 인모드 시술 1만건',
          '쁘띠 시술 경력 10만건'
        ],
        specialties: [
          '실리프팅/코 실리프팅/고난이도 필러',
          '심부볼 축소 실&레이져 리프팅'
        ]
      }
    },
    {
      id: 3,
      name: '이원준',
      title: '원장',
      image: '/images/doctors/이원준_원장.png',
      bio: {
        title: 'MEDICAL DOCTOR',
        name: '이원준 원장',
        positions: [
          '실로스 창원 원장',
          '대한성형외과 학회',
          '대한 미용성형레이져 학회',
          '대한 리프팅 학회',
          '올타이트 레이저 EXPERT',
          '온다 레이저 키닥터',
          '울쎄라 슈링크 마에스트로'
        ],
        specialties: [
          '실리프팅/눈성형/실로팻/레이저리프팅/필러/보톡스',
          '스킨부스터/스킨보톡스'
        ]
      }
    },
    {
      id: 4,
      name: '안소현',
      title: '원장',
      image: '/images/doctors/안소현_원장.png',
      bio: {
        title: 'MEDICAL DOCTOR',
        name: '안소현 원장',
        positions: [
          '실로스 창원 원장',
          '대한 미용성형레이져 학회 회원',
          '대한 리프팅 연구회 회원',
          '울쎄라, 온다 레이져 키닥터',
          '덴거티, 엔코어 시술 마에스트로',
          '슈링크, 인모드 시술 2만건',
          '쁘띠 시술 경력 5만건'
        ],
        specialties: [
          '실리프팅/레이저리프팅/색소레이저',
          '보톡스/필러/스킨부스터/스킨보톡스'
        ]
      }
    },
    {
      id: 5,
      name: '방다솔',
      title: '원장',
      image: '/images/doctors/방다솔_원장.png',
      bio: {
        title: 'MEDICAL DOCTOR',
        name: '방다솔 원장',
        positions: [
          '실로스 창원 원장',
          '대한 미용성령레이져 학회 회원',
          '대한 리프팅 연구회 회원',
          '대한 미용외과학회 회원',
          '올타이트 레이저 EXPERT',
          '온다 레이저 키닥터',
          '울쎄라 슈링크 마에스트로'
        ],
        specialties: [
          '실리프팅/레이저리프팅/색소레이저',
          '보톡스/필러/스킨부스터/스킨보톡스'
        ]
      }
    }
  ];

  const doctorColors = [
    '#A8A8A7', // 정영진
    '#4C4845', // 임동혁
    '#656661', // 이원준
    '#7D7E77', // 안소현
    '#878884'  // 방다솔
  ];

  return (
    <PageLayout>
      {/* 헤더 배너 */}
      <section className="relative min-h-[60vh] bg-white overflow-hidden">
        {/* 배경 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-teal-smoke-50"></div>
        
        {/* 글래스 효과 백그라운드 */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-teal-smoke-300/20 to-elegant-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 left-20 w-80 h-80 bg-gradient-to-tr from-elegant-300/15 to-teal-smoke-400/15 rounded-full blur-3xl"></div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="relative z-10 flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-4xl mx-auto px-6">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm font-elegant-sans font-medium tracking-wide text-teal-smoke-800 border border-teal-smoke-200/30">
                MEDICAL PROFESSIONALS
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-light mb-6 tracking-tight leading-tight text-gray-800">
              의료진 소개
            </h1>
            
            <div className="w-16 h-0.5 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto mb-6"></div>
            
            <p className="text-lg md:text-xl font-elegant-sans font-light leading-relaxed text-gray-600 max-w-2xl mx-auto">
              20년 노하우의 전문 의료진이<br />
              당신만의 아름다움을 완성합니다
            </p>
          </div>
        </div>
      </section>

      {/* 트랜지션 섹션 */}
      <div className="relative h-32 bg-gradient-to-b from-white via-gray-50 to-gray-100">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-smoke-50/30 to-transparent"></div>
        
        {/* 연결 곡선 */}
        <svg className="absolute bottom-0 w-full h-16" viewBox="0 0 1200 64" preserveAspectRatio="none">
          <path d="M0,64 C300,20 600,20 1200,64 L1200,64 L0,64 Z" fill="currentColor" className="text-gray-100"/>
        </svg>
        
        {/* 미묘한 분리선 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2">
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-teal-smoke-300 to-transparent"></div>
            <div className="w-2 h-2 rounded-full bg-teal-smoke-300"></div>
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-teal-smoke-300 to-transparent"></div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-100">

      {/* Doctors Sections */}
      {doctorsData.map((doctor, index) => (
        <section
          key={doctor.id}
          className="w-full transition-all duration-700 ease-in-out"
          style={{
            backgroundColor: doctorColors[index]
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${
              index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
            }`}>
              {/* 의사 사진 */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} flex items-end ${
                index % 2 === 1 ? 'pr-0' : 'pl-0'
              }`}>
                <div className={`relative aspect-[3/5] w-96 overflow-hidden ${
                  index % 2 === 1 ? 'ml-auto' : 'mr-auto'
                }`}>
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `
                        radial-gradient(ellipse 150% 120% at center, transparent 0%, transparent 30%, ${doctorColors[index]}10 60%, ${doctorColors[index]}30 85%, ${doctorColors[index]}60 100%)
                      `,
                      zIndex: 10
                    }}
                  ></div>
                  
                  {/* 사진 가장자리 그라데이션 */}
                  <div 
                    className={`absolute ${index % 2 === 1 ? 'left-0' : 'right-0'} top-0 bottom-0 w-12 z-20`}
                    style={{
                      background: index % 2 === 1 
                        ? `linear-gradient(to right, ${doctorColors[index]}40 0%, ${doctorColors[index]}20 50%, transparent 100%)`
                        : `linear-gradient(to left, ${doctorColors[index]}40 0%, ${doctorColors[index]}20 50%, transparent 100%)`
                    }}
                  ></div>
                  
                  <img
                    src={doctor.image}
                    alt={`${doctor.name} ${doctor.title}`}
                    className="w-full h-full object-cover object-center relative z-0"
                    onError={(e) => {
                      e.currentTarget.src = '/images/placeholder-doctor.jpg';
                    }}
                  />
                </div>
              </div>

              {/* 약력 정보 */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} space-y-2 px-8 py-6 flex flex-col justify-center`}>
                <div>
                  <h3 className={`text-2xl md:text-3xl font-display font-bold mb-1 tracking-wide ${
                    index === 1 ? 'text-white' : 
                    index === 2 || index === 3 || index === 4 ? 'text-white' : 'text-slate-800'
                  }`}>
                    {doctor.name} {doctor.title}
                  </h3>
                  <p className={`text-base font-elegant-sans font-medium mb-4 ${
                    index === 1 ? 'text-white/80' : 
                    index === 2 || index === 3 || index === 4 ? 'text-white/90' : 'text-slate-600'
                  }`}>
                    {doctor.bio.title}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className={`text-lg font-elegant font-semibold mb-2 ${
                    index === 1 ? 'text-white' : 
                    index === 2 || index === 3 || index === 4 ? 'text-white' : 'text-slate-800'
                  }`}>주요 경력</h4>
                  <ul className="space-y-1">
                    {doctor.bio.positions.map((position, idx) => (
                      <li key={idx} className="flex items-start">
                        <div 
                          className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                          style={{
                            backgroundColor: doctorColors[index]
                          }}
                        ></div>
                        <p className={`font-elegant-sans leading-relaxed ${
                          index === 1 ? 'text-white/90' : 
                          index === 2 || index === 3 || index === 4 ? 'text-white/85' : 'text-slate-700'
                        }`}>{position}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <h4 className={`text-xl font-elegant font-semibold mb-3 ${
                    index === 1 ? 'text-white' : 
                    index === 2 || index === 3 || index === 4 ? 'text-white' : 'text-slate-800'
                  }`}>전문시술분야</h4>
                  <div className="flex flex-wrap gap-3">
                    {doctor.bio.specialties.flatMap(specialty => 
                      specialty.split('/').map(item => item.trim())
                    ).map((specialty, idx) => (
                      <span 
                        key={idx} 
                        className="inline-flex items-center px-5 py-3 rounded-full text-sm font-elegant-sans font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-default backdrop-blur-sm"
                        style={{
                          background: `linear-gradient(135deg, ${doctorColors[index]}40, ${doctorColors[index]}80)`,
                          borderColor: doctorColors[index],
                          borderWidth: '2px',
                          borderStyle: 'solid',
                          color: '#ffffff',
                          textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                        }}
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* 온라인 상담 예약 섹션 - 메인 페이지와 동일 */}
      <StandardConsultationSection
        title="온라인 상담 예약"
        description="전문의와의 1:1 맞춤 상담으로 당신만의 아름다움을 계획하세요"
        initialProcedureId="silos-lifting"
      />
      </div>
    </PageLayout>
  );
};

export default DoctorsPage;