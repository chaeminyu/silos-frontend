'use client';

import { useState } from 'react';
import PageLayout from '../../components/PageLayout';
import StandardConsultationSection from '../../components/StandardConsultationSection';
import { Sparkles, Clock, ShoppingCart, Check, Eye, Zap, Syringe } from 'lucide-react';

// 새로운 15개 카테고리 기반 시술 데이터 구조 - 계층 URL 적용
const proceduresData = {
  '실로스 시그니처': [
    {
      id: 'silos-lifting',
      title: '실로프팅(실리프팅)',
      subtitle: 'SILOS THREAD LIFTING',
      description: '실로스만의 특허받은 실리프팅 기법으로 개인맞춤 리프팅',
      duration: '30분내외',
      features: ['무절개', '즉시효과', '자연스러움'],
      category: '실로스 시그니처',
      link: '/procedures/silos-signature/silos-lifting',
      image: '/images/procedures/silos-signature/silos-lifting/hero.jpg',
      isSignature: true,
      subProcedures: [
        { name: '커스텀 실로프팅' },
        { name: '상안면부(이마)' },
        { name: '중안면부(팔자/애플존)' },
        { name: '하안면부' },
        { name: '눈밑/눈가/입가' }
      ]
    },
    {
      id: 'silofat',
      title: '실로팻(지방추출주사)',
      subtitle: 'SILO-FAT',
      description: '실로스만의 노하우로 개인의 체형에 맞는 맞춤 라인으로 개선',
      duration: '1시간 이내',
      features: ['짧은시술시간', '순수지방추출', '압박복불필요'],
      category: '실로스 시그니처',
      link: '/procedures/silos-signature/silofat',
      image: '/images/procedures/silos-signature/silofat/hero.jpg',
      isSignature: true,
      subProcedures: []
    },
    {
      id: 'under-eye-laser',
      title: '반달레이저(눈밑지방레이저)',
      subtitle: 'UNDER-EYE FAT LASER',
      description: '절개 없는 10분 완성 눈밑 개선술',
      duration: '10분내외',
      features: ['비절개', '흉터없음', '자연개선'],
      category: '실로스 시그니처',
      link: '/procedures/silos-signature/under-eye-laser',
      image: '/images/procedures/under-eye-laser/hero.jpg',
      isSignature: true,
      subProcedures: []
    },
    {
      id: 'neck-lifting',
      title: '넥리프팅(목리프팅)',
      subtitle: 'NECK LIFTING',
      description: '처진 목선과 이중턱을 개선하여 선명한 턱라인을 연출',
      duration: '45분내외',
      features: ['복합시술', '목주름개선', '자연결과'],
      category: '실로스 시그니처',
      link: '/procedures/silos-signature/neck-lifting',
      image: '/images/procedures/neck-lifting/hero.jpg',
      isSignature: true,
      subProcedures: []
    }
  ],
  '실로프팅': [
    {
      id: 'silos-lifting-detail',
      title: '실로프팅(실리프팅)',
      subtitle: 'SILOS THREAD LIFTING',
      description: '시술 부위, 피부 처짐, 지방량, 골격, 니즈 등을 고려해 다양한 실을 복합적으로 활용',
      duration: '30-60분',
      features: ['개인맞춤', '복합시술', '자연스러움'],
      category: '실로프팅',
      link: '/procedures/silos-lifting/custom-thread',
      image: '/images/procedures/silos-signature/silos-lifting/main.jpg',
      subProcedures: [
        { name: '커스텀 실로프팅' },
        { name: '상안면부(이마)' },
        { name: '중안면부(팔자/애플존)' },
        { name: '하안면부' },
        { name: '눈밑/눈가/입가' },
        { name: '코프팅(코실리프팅)' },
        { name: '실로케어(애프터케어)' }
      ]
    }
  ],
  '커스텀 리프팅': [
    {
      id: 'ulthera',
      title: '울쎄라',
      subtitle: 'ULTHERA',
      description: 'FDA 승인 HIFU 리프팅의 대표주자',
      duration: '30-60분',
      features: ['FDA승인', '실시간영상', '근막층도달'],
      category: '커스텀 리프팅',
      link: '/procedures/custom-lifting/ulthera',
      image: '/images/procedures/custom-lifting/ulthera.jpg',
      subProcedures: []
    },
    {
      id: 'density',
      title: '덴서티',
      subtitle: 'DENSITY',
      description: '볼륨 리프팅과 탄력 개선을 동시에',
      duration: '20-40분',
      features: ['볼륨리프팅', '탄력개선', '자연결과'],
      category: '커스텀 리프팅',
      link: '/procedures/custom-lifting/density',
      image: '/images/procedures/custom-lifting/density.jpg',
      subProcedures: []
    },
    {
      id: 'onda',
      title: '온다',
      subtitle: 'ONDA',
      description: '마이크로파 리프팅으로 안전하고 효과적인 개선',
      duration: '30-45분',
      features: ['마이크로파', '안전시술', '효과적'],
      category: '커스텀 리프팅',
      link: '/procedures/custom-lifting/onda',
      image: '/images/procedures/custom-lifting/onda.jpg',
      subProcedures: []
    }
  ],
  '스킨리프팅': [
    {
      id: 'collagen-fill',
      title: '콜라채움',
      subtitle: 'COLLAGEN FILL',
      description: '콜라겐 생성 촉진으로 근본부터 다른 피부 개선',
      duration: '30분내외',
      features: ['콜라겐생성', '근본개선', '자연회복'],
      category: '스킨리프팅',
      link: '/procedures/skin-lifting/collagen-fill',
      image: '/images/procedures/skin-lifting/collagen-fill.jpg',
      subProcedures: []
    },
    {
      id: 'skin-botox',
      title: '스킨보톡스',
      subtitle: 'SKIN BOTOX',
      description: '피부 전용 보톡스로 모공 개선과 탄력 증진',
      duration: '20분내외',
      features: ['모공개선', '탄력증진', '자연스러움'],
      category: '스킨리프팅',
      link: '/procedures/skin-lifting/skin-botox',
      image: '/images/procedures/skin-lifting/skin-botox.jpg',
      subProcedures: []
    },
    {
      id: 'rejuran',
      title: '리쥬란힐러',
      subtitle: 'REJURAN HEALER',
      description: '연어 DNA를 이용한 피부 재생 시술',
      duration: '30-40분',
      features: ['피부재생', 'DNA성분', '자연회복'],
      category: '스킨리프팅',
      link: '/procedures/skin-lifting/rejuran',
      image: '/images/procedures/skin-lifting/rejuran.jpg',
      subProcedures: []
    }
  ],
  '쁘띠리프팅': [
    {
      id: 'special-filler',
      title: '특수부위 필러',
      subtitle: 'SPECIAL AREA FILLER',
      description: '얼굴의 특별한 부위까지 세심하게 개인의 매력을 극대화',
      duration: '20-30분',
      features: ['정교한시술', '개인맞춤', '즉시효과'],
      category: '쁘띠리프팅',
      link: '/procedures/petit-lifting/special-area-filler',
      image: '/images/procedures/special-filler/hero.jpg',
      subProcedures: []
    },
    {
      id: 'botox',
      title: '보톡스',
      subtitle: 'BOTOX',
      description: '주름 개선을 위한 정밀한 보톡스 시술',
      duration: '15-20분',
      features: ['주름개선', '정밀시술', '자연스러움'],
      category: '쁘띠리프팅',
      link: '/procedures/petit-lifting/botox',
      image: '/images/procedures/petit-lifting/botox.jpg',
      subProcedures: []
    }
  ],
  '처진눈리프팅': [
    {
      id: 'eyelid-lifting',
      title: '상/하안검',
      subtitle: 'EYELID LIFTING',
      description: '개성과 보편적인 아름다움 그 사이의 균형을 찾아가는 과정',
      duration: '약 1시간',
      features: ['자연스러운결과', '빠른회복', '맞춤수술'],
      category: '처진눈리프팅',
      link: '/procedures/droopy-eye-lifting/upper-lower-bleph',
      image: '/images/procedures/droopy-eye-lifting/hero.jpg',
      subProcedures: []
    }
  ]
};

export default function ProceduresPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('실로스 시그니처');
  const [addedToCart, setAddedToCart] = useState<string[]>([]);

  const categories = Object.keys(proceduresData);

  const handleAddToCart = (procedureId: string, procedureName: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!addedToCart.includes(procedureId)) {
      setAddedToCart([...addedToCart, procedureId]);
      console.log(`Added to cart: ${procedureName}`);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case '실로스 시그니처':
        return <Sparkles className="w-5 h-5" />;
      case '커스텀 리프팅':
        return <Zap className="w-5 h-5" />;
      case '스킨리프팅':
        return <Eye className="w-5 h-5" />;
      case '쁘띠리프팅':
        return <Syringe className="w-5 h-5" />;
      case '처진눈리프팅':
        return <Eye className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <PageLayout>
      {/* 히어로 섹션 - Enhanced Glass Design */}
      <div className="relative pb-32 overflow-hidden">
        {/* Multi-layered Glass Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-smoke-100/70 via-white/50 to-teal-smoke-200/70 backdrop-blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-teal-smoke-300/40 via-transparent to-elegant-300/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/5"></div>
        
        {/* Dynamic floating elements */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white/8 to-transparent"></div>
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-teal-smoke-200/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-elegant-300/15 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl animate-spin-slow"></div>
        
        {/* Geometric glass patterns */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 backdrop-blur-sm rounded-3xl rotate-12 border border-white/10"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-teal-smoke-200/10 backdrop-blur-sm rounded-2xl -rotate-12 border border-teal-smoke-300/20"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-elegant-300/10 backdrop-blur-sm rounded-xl rotate-45 border border-elegant-400/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center">
            {/* Enhanced glass badge */}
            <div className="relative group mb-12">
              <div className="absolute -inset-1 bg-gradient-to-r from-white/20 via-cyan-300/30 to-white/20 rounded-full blur opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative inline-flex items-center px-8 py-4 bg-white/25 backdrop-blur-xl rounded-full text-sm font-elegant-sans font-medium border border-white/40 shadow-xl">
                <Sparkles className="w-4 h-4 mr-2 text-slate-700" />
                <span className="text-slate-800 drop-shadow-sm">SILOS PROCEDURES</span>
              </div>
            </div>
            
            {/* Enhanced title with glass effects */}
            <div className="relative mb-8">
              <h1 className="text-5xl lg:text-7xl font-display font-light mb-6 tracking-wide leading-tight text-slate-800 drop-shadow-lg">
                전체 시술
              </h1>
              <div className="absolute inset-0 text-5xl lg:text-7xl font-display font-light mb-6 tracking-wide leading-tight text-white/20 blur-sm -z-10">
                전체 시술
              </div>
            </div>
            
            {/* Enhanced divider */}
            <div className="relative mb-12">
              <div className="w-32 h-1 bg-gradient-to-r from-teal-smoke-400/80 via-elegant-400/80 to-teal-smoke-400/80 rounded-full mx-auto shadow-lg"></div>
              <div className="absolute inset-0 w-32 h-1 bg-gradient-to-r from-white/40 via-transparent to-white/40 rounded-full mx-auto blur-sm"></div>
            </div>
            
            {/* Enhanced description in glass container */}
            <div className="relative group max-w-5xl mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-3xl blur opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/20 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl">
                <p className="text-xl font-elegant-sans font-light leading-relaxed text-slate-800 drop-shadow-sm">
                  실로스의 모든 시술을 카테고리별로 확인하고<br />
                  나에게 맞는 시술을 찾아보세요
                </p>
                
                {/* Floating decorative elements inside the container */}
                <div className="absolute top-4 right-4 w-6 h-6 bg-white/20 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-4 h-4 bg-teal-smoke-300/20 rounded-full"></div>
                <div className="absolute top-1/2 left-6 w-2 h-2 bg-elegant-300/30 rounded-full"></div>
                <div className="absolute bottom-8 right-8 w-3 h-3 bg-white/15 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative -mt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 카테고리 탭 */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 mb-16">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-elegant-sans font-medium transition-all duration-300 text-lg ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-teal-smoke-500 to-elegant-500 text-white shadow-lg transform scale-105'
                      : 'bg-white text-slate-700 border-2 border-teal-smoke-200 hover:border-teal-smoke-300 hover:bg-teal-smoke-50'
                  }`}
                >
                  {getCategoryIcon(category)}
                  <span>{category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 시술 카드들 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {proceduresData[selectedCategory as keyof typeof proceduresData].map((procedure) => (
              <div
                key={procedure.id}
                className={`bg-white rounded-3xl shadow-xl border overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col relative ${
                  procedure.isSignature 
                    ? 'border-cyan-300/50 ring-2 ring-cyan-200/30 shadow-cyan-200/20' 
                    : 'border-teal-smoke-200/30'
                }`}
              >
                {/* Signature Badge */}
                {procedure.isSignature && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <Sparkles className="w-4 h-4 text-white fill-white" />
                    </div>
                  </div>
                )}
                {/* 헤더 이미지 */}
                <div className="h-48 bg-gradient-to-br from-teal-smoke-400 to-elegant-400 relative overflow-hidden">
                  {procedure.image ? (
                    <img 
                      src={procedure.image} 
                      alt={procedure.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      {getCategoryIcon(procedure.category)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-elegant-sans font-medium">
                      {procedure.category}
                    </span>
                  </div>
                </div>

                {/* 콘텐츠 */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-display font-light text-teal-smoke-800 mb-2">
                    {procedure.title}
                  </h3>
                  <p className="text-sm font-elegant-sans font-medium text-slate-700 mb-4">
                    {procedure.subtitle}
                  </p>
                  <p className="text-slate-700 font-elegant-sans font-light leading-relaxed mb-6">
                    {procedure.description}
                  </p>

                  {/* 특징 배지들 */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {procedure.features.map((feature, i) => (
                      <div key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-elegant-sans font-medium bg-teal-smoke-100 text-slate-700 border border-teal-smoke-200">
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* 시술시간 */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="inline-flex items-center px-3 py-2 rounded-full text-sm font-elegant-sans font-medium bg-elegant-100 text-slate-700 border border-elegant-200">
                      <Clock className="w-4 h-4 mr-2" />
                      {procedure.duration}
                    </div>
                  </div>

                  {/* 하위 시술들 */}
                  {procedure.subProcedures.length > 0 && (
                    <div className="mb-6">
                      <p className="text-sm font-elegant-sans font-medium text-slate-700 mb-3">
                        포함 시술:
                      </p>
                      <div className="space-y-2">
                        {procedure.subProcedures.slice(0, 3).map((subProc, i) => (
                          <div key={i} className="text-xs font-elegant-sans text-slate-600 flex items-center">
                            <div className="w-1 h-1 bg-teal-smoke-400 rounded-full mr-2"></div>
                            {subProc.name}
                          </div>
                        ))}
                        {procedure.subProcedures.length > 3 && (
                          <div className="text-xs font-elegant-sans text-slate-600">
                            +{procedure.subProcedures.length - 3}개 더
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 여백을 자동으로 채우는 spacer */}
                  <div className="flex-1"></div>

                  {/* 버튼들 */}
                  <div className="flex space-x-3 mt-auto">
                    <a
                      href={procedure.link}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 text-white rounded-xl font-elegant-sans font-medium text-center hover:from-teal-smoke-500 hover:to-elegant-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      자세히 보기
                    </a>
                    <button
                      onClick={(e) => handleAddToCart(procedure.id, procedure.title, e)}
                      className={`px-4 py-3 rounded-xl font-elegant-sans font-medium transition-all duration-300 flex items-center justify-center ${
                        addedToCart.includes(procedure.id)
                          ? 'bg-green-100 text-green-700 cursor-default border border-green-300'
                          : 'bg-white text-slate-700 border border-teal-smoke-300 hover:bg-teal-smoke-50'
                      }`}
                      disabled={addedToCart.includes(procedure.id)}
                    >
                      {addedToCart.includes(procedure.id) ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <ShoppingCart className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* 상담 신청 섹션 */}
      <StandardConsultationSection
        title="맞춤 시술 상담 신청"
        description="전문 의료진과 함께 나에게 가장 적합한 시술을 찾아보세요"
      />
    </PageLayout>
  );
}