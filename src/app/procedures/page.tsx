'use client';

import { useState } from 'react';
import PageLayout from '../../components/PageLayout';
import { Sparkles, Clock, ShoppingCart, Check, Eye, Zap, Syringe } from 'lucide-react';

// 전체 시술 데이터
const proceduresData = {
  '리프팅': [
    {
      id: 'laser-lifting',
      title: '레이저 리프팅',
      subtitle: 'LASER LIFTING',
      description: '시간을 거스르는 리프팅, 입체적이고 세련된 라인을 시작하세요',
      duration: '15분내외',
      features: ['FDA승인', '실시간영상', '근막층도달'],
      category: '리프팅',
      link: '/procedures/laser-lifting',
      image: '/images/procedures/laser-lifting/hero.jpg',
      subProcedures: [
        { name: '울쎄라 리프팅', link: '/procedures/laser-lifting?procedure=ulthera' },
        { name: '슈링크 리프팅', link: '/procedures/laser-lifting?procedure=shrink' },
        { name: '온다 리프팅', link: '/procedures/laser-lifting?procedure=onda' },
        { name: '엔코어 리프팅', link: '/procedures/laser-lifting?procedure=encore' },
        { name: '덴서티 리프팅', link: '/procedures/laser-lifting?procedure=density' },
        { name: '브이로 리프팅', link: '/procedures/laser-lifting?procedure=vero' }
      ]
    },
    {
      id: 'silos-lifting',
      title: '실로스 커스터마이징 실리프팅',
      subtitle: 'SILOS CUSTOMIZING THREAD LIFTING',
      description: '시술 부위, 피부 처짐, 지방량, 골격, 니즈 등을 고려해 다양한 실을 복합적으로 활용',
      duration: '30분내외',
      features: ['무절개', '즉시효과', '자연스러움'],
      category: '리프팅',
      link: '/procedures/silos-lifting',
      image: '/images/procedures/silos-lifting/hero.jpg',
      subProcedures: [
        { name: '실로스 실리프팅', link: '/procedures/silos-lifting?procedure=thread-lifting' },
        { name: '실로스 파워 실리프팅', link: '/procedures/silos-lifting?procedure=power-lifting' },
        { name: '코리프팅', link: '/procedures/silos-lifting?procedure=nose-lifting' },
        { name: '턱라인 리프팅', link: '/procedures/silos-lifting?procedure=jawline-lifting' },
        { name: '이마 리프팅', link: '/procedures/silos-lifting?procedure=forehead-lifting' },
        { name: '불독살 리프팅', link: '/procedures/silos-lifting?procedure=jowl-lifting' },
        { name: '팔자주름 리프팅', link: '/procedures/silos-lifting?procedure=nasolabial-lifting' }
      ]
    },
    {
      id: 'neck-lifting',
      title: '목 리프팅',
      subtitle: 'NECK LIFTING',
      description: '처진 목선과 이중턱을 개선하여 선명한 턱라인을 연출',
      duration: '45분내외',
      features: ['목라인개선', '이중턱해결', '자연스러운결과'],
      category: '리프팅',
      link: '/procedures/neck-lifting',
      image: '/images/procedures/neck-lifting/hero.jpg',
      subProcedures: []
    },
    {
      id: 'forehead-eyebrow-lifting',
      title: '이마 눈썹 리프팅',
      subtitle: 'FOREHEAD EYEBROW LIFTING',
      description: '처진 이마와 눈썹을 리프팅하여 젊고 또렷한 인상을 연출',
      duration: '1시간내외',
      features: ['이마주름개선', '눈썹리프팅', '젊은인상'],
      category: '리프팅',
      link: '/procedures/forehead-eyebrow-lifting',
      image: '/images/procedures/forehead-eyebrow-lifting/hero.jpg',
      subProcedures: []
    },
    {
      id: 'face-lifting',
      title: '페이스 리프팅',
      subtitle: 'FACE LIFTING',
      description: '전체적인 얼굴 라인을 리프팅하여 젊고 탄력있는 얼굴로 개선',
      duration: '1시간 30분내외',
      features: ['전체리프팅', '자연스러운라인', '오래가는효과'],
      category: '리프팅',
      link: '/procedures/face-lifting',
      image: '/images/procedures/face-lifting/hero.jpg',
      subProcedures: []
    }
  ],
  '성형': [
    {
      id: 'eyelid-lifting',
      title: '눈꺼풀 처짐 리프팅',
      subtitle: 'EYELID LIFTING',
      description: '개성과 보편적인 아름다움 그 사이의 균형을 찾아가는 과정',
      duration: '약 1시간',
      features: ['자연스러운결과', '빠른회복', '맞춤수술'],
      category: '성형',
      link: '/procedures/eyelid-lifting',
      image: '/images/procedures/eyelid-lifting/hero.jpg',
      subProcedures: [
        { name: '실로스 상안검', link: '/procedures/eyelid-lifting?procedure=upper-blepharoplasty' },
        { name: '실로스 듀얼 상안검', link: '/procedures/eyelid-lifting?procedure=dual-upper-blepharoplasty' },
        { name: '실로스 눈썹하 절개', link: '/procedures/eyelid-lifting?procedure=brow-incision' },
        { name: '실로스 하안검', link: '/procedures/eyelid-lifting?procedure=lower-blepharoplasty' }
      ]
    }
  ],
  '체형관리': [
    {
      id: 'silofat',
      title: '실로팻',
      subtitle: 'SILO-FAT',
      description: '실로스만의 노하우로 개인의 체형에 맞는 맞춤 라인으로 개선',
      duration: '1시간 이내',
      features: ['짧은시술시간', '순수지방추출', '압박복불필요'],
      category: '체형관리',
      link: '/silofat',
      image: '/images/procedures/silofat/hero.jpg',
      subProcedures: [
        { name: '부유방', area: '부유방' },
        { name: '팔 라인', area: '팔 라인' },
        { name: '복부', area: '복부' },
        { name: '러브핸들', area: '러브핸들' },
        { name: '종아리/허벅지', area: '종아리/허벅지' }
      ]
    }
  ]
};

export default function ProceduresPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('리프팅');
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
      case '리프팅':
        return <Sparkles className="w-5 h-5" />;
      case '성형':
        return <Eye className="w-5 h-5" />;
      case '체형관리':
        return <Syringe className="w-5 h-5" />;
      default:
        return <Zap className="w-5 h-5" />;
    }
  };

  return (
    <PageLayout>
      {/* 히어로 섹션 */}
      <div className="relative pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-smoke-400 via-elegant-400 to-teal-smoke-500"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center text-white">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-elegant-sans font-medium mb-8 border border-white/30">
              <Sparkles className="w-4 h-4 mr-2" />
              SILOS PROCEDURES
            </div>
            <h1 className="text-5xl lg:text-6xl font-display font-light mb-6 tracking-wide leading-tight">
              전체 시술
            </h1>
            <div className="w-24 h-0.5 bg-white/60 rounded-full mx-auto mb-8"></div>
            <p className="text-xl font-elegant-sans font-light max-w-4xl mx-auto leading-relaxed text-white/90">
              실로스의 모든 시술을 카테고리별로 확인하고<br />
              나에게 맞는 시술을 찾아보세요
            </p>
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
                      : 'bg-white text-teal-smoke-700 border-2 border-teal-smoke-200 hover:border-teal-smoke-300 hover:bg-teal-smoke-50'
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
                className="bg-white rounded-3xl shadow-xl border border-teal-smoke-200/30 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
              >
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
                  <p className="text-sm font-elegant-sans font-medium text-elegant-600 mb-4">
                    {procedure.subtitle}
                  </p>
                  <p className="text-teal-smoke-700 font-elegant-sans font-light leading-relaxed mb-6">
                    {procedure.description}
                  </p>

                  {/* 특징 배지들 */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {procedure.features.map((feature, i) => (
                      <div key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-elegant-sans font-medium bg-teal-smoke-100 text-teal-smoke-700 border border-teal-smoke-200">
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* 시술시간 */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="inline-flex items-center px-3 py-2 rounded-full text-sm font-elegant-sans font-medium bg-elegant-100 text-elegant-700 border border-elegant-200">
                      <Clock className="w-4 h-4 mr-2" />
                      {procedure.duration}
                    </div>
                  </div>

                  {/* 하위 시술들 */}
                  {procedure.subProcedures.length > 0 && (
                    <div className="mb-6">
                      <p className="text-sm font-elegant-sans font-medium text-teal-smoke-700 mb-3">
                        포함 시술:
                      </p>
                      <div className="space-y-2">
                        {procedure.subProcedures.slice(0, 3).map((subProc, i) => (
                          <div key={i} className="text-xs font-elegant-sans text-teal-smoke-600 flex items-center">
                            <div className="w-1 h-1 bg-teal-smoke-400 rounded-full mr-2"></div>
                            {subProc.name}
                          </div>
                        ))}
                        {procedure.subProcedures.length > 3 && (
                          <div className="text-xs font-elegant-sans text-teal-smoke-500">
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
                          : 'bg-white text-teal-smoke-700 border border-teal-smoke-300 hover:bg-teal-smoke-50'
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

          {/* 전체 상담 신청 섹션 */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-br from-white/80 to-teal-smoke-50/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/50">
              <h3 className="text-3xl lg:text-4xl font-display font-bold text-teal-smoke-800 mb-6">
                맞춤 시술 상담 신청
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto mb-8"></div>
              <p className="text-xl font-elegant-sans font-medium text-teal-smoke-700 mb-10">
                전문 의료진과 함께 나에게 가장 적합한 시술을 찾아보세요
              </p>
              <a
                href="/consultation/request"
                className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-teal-smoke-500 to-elegant-500 text-white rounded-xl font-elegant-sans font-bold text-lg hover:from-teal-smoke-600 hover:to-elegant-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 space-x-3"
              >
                <ShoppingCart className="w-6 h-6" />
                <span>전체 상담 신청하기</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}