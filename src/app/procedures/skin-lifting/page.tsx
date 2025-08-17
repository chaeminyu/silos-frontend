'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PageLayout from '../../../components/PageLayout';
import { Droplets, Clock, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../../../contexts/CartContext';

const skinLiftingProcedures = [
  {
    id: 'collagen',
    title: '콜라채움',
    subtitle: 'COLLAGEN FILLING',
    mainTitle: '피부 속 시간을 되돌리다, SILOS만의 노하우까지 "콜라(겐)채움주사"',
    mainDescription: '콜라겐이 부족한 부위에 직접 콜라겐을 주입해 피부 속부터 차오르는 볼륨감과 탄력을 기대할 수 있는 시술로, 피부 치유 능력을 활성화하여 건강한 피부로 만들어줍니다.',
    benefits: [
      '1. 볼륨 회복(자연스러운 볼륨)',
      '2. 피부 탄력/주름 개선',
      '3. 피부 노화개선'
    ],
    differentiator: '★ 실로스만의 차별화',
    differentiatorDescription: [
      '속부터 채우는 콜라겐 근본적인 피부 노화개선',
      '본인의 콜라겐으로 볼륨을 재생성하는 원리로 노화진행 전의 피부로 돌아가는 것을 추구하는 시술'
    ],
    additionalInfo: '효과는 올리고 부작용은 줄이고\n실로스만의 차별화된 시술 방식과 테크닉으로 최상의 결과를 만들어 냅니다.',
    ageInfo: {
      title: '연령대 별 피부 속 콜라겐 감소 표 예시',
      description: '콜라겐이 줄어들면 피부는 주름이 지고 얇게 탄력을 잃어버리게 되기때문에 필요시술임을 강조'
    },
    description: [
      '콜라겐 자체 생성을 촉진하여 자연스러운 볼륨감과 탄력을 제공',
      '주름 개선과 동시에 피부 전반적인 질감 향상',
      '안전한 성분으로 부작용 걱정 없는 시술',
      '즉각적인 효과와 지속적인 개선 효과를 동시에'
    ],
    features: ['자연스러운볼륨', '콜라겐생성', '안전성분'],
    duration: '30분내외',
    category: '필러'
  },
  {
    id: 'rejuran',
    title: '리쥬란',
    subtitle: 'REJURAN',
    description: [
      '연어에서 추출한 PDRN 성분으로 피부 재생 촉진',
      '손상된 피부 조직을 근본적으로 회복시키는 시술',
      '모공, 흉터, 잔주름을 동시에 개선',
      '자연치유력을 높여 건강한 피부로 회복'
    ],
    features: ['피부재생', '모공개선', 'PDRN성분'],
    duration: '20분내외',
    category: '재생'
  },
  {
    id: 'olydia',
    title: '올리디아',
    subtitle: 'OLYDIA',
    description: [
      '히알루론산과 아미노산의 완벽한 조합',
      '깊은 보습과 함께 피부 탄력 개선',
      '자연스러운 리프팅 효과로 V라인 완성',
      '부작용 없는 안전한 성분으로 구성'
    ],
    features: ['히알루론산', '아미노산', 'V라인'],
    duration: '25분내외',
    category: '보습'
  },
  {
    id: 'juvelook',
    title: '쥬베룩',
    subtitle: 'JUVELOOK',
    description: [
      'PDLLA 성분으로 콜라겐 생성을 지속적으로 촉진',
      '점진적이고 자연스러운 리프팅 효과',
      '볼륨 손실 부위의 근본적인 개선',
      '장기간 지속되는 탄력과 볼륨감'
    ],
    features: ['PDLLA성분', '지속효과', '자연리프팅'],
    duration: '35분내외',
    category: '볼륨'
  },
  {
    id: 'radius',
    title: '래디어스',
    subtitle: 'RADIUS',
    description: [
      'CaHA 성분으로 즉각적인 볼륨 효과',
      '콜라겐 생성을 촉진하여 지속적인 개선',
      '깊은 주름과 볼륨 손실에 효과적',
      '자연스러우면서도 확실한 결과'
    ],
    features: ['CaHA성분', '즉각효과', '깊은주름'],
    duration: '30분내외',
    category: '볼륨'
  },
  {
    id: 'vollasome',
    title: '볼라썸',
    subtitle: 'VOLLASOME',
    description: [
      '리포좀 기술을 활용한 혁신적인 스킨부스터',
      '피부 깊숙이 영양분을 전달하여 근본적 개선',
      '모공, 탄력, 보습을 동시에 해결',
      '민감한 피부도 안전하게 시술 가능'
    ],
    features: ['리포좀기술', '깊은침투', '종합개선'],
    duration: '25분내외',
    category: '부스터'
  },
  {
    id: 'skin-booster',
    title: '물광주사',
    subtitle: 'SKIN BOOSTER',
    description: [
      '히알루론산과 비타민의 완벽한 조합',
      '건조하고 칙칙한 피부를 촉촉하고 투명하게',
      '즉각적인 수분 공급과 광채 효과',
      '메이크업 없이도 빛나는 피부 완성'
    ],
    features: ['수분공급', '광채효과', '즉각효과'],
    duration: '15분내외',
    category: '보습'
  }
];

export default function SkinLiftingPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>('collagen');
  const { addToCart, isInCart } = useCart();
  
  // Handle URL parameter for direct access
  useEffect(() => {
    const procedureParam = searchParams.get('procedure');
    if (procedureParam) {
      setActiveTab(procedureParam);
    }
  }, [searchParams]);

  const handleAddToCart = (procedure: typeof skinLiftingProcedures[0]) => {
    addToCart({
      id: procedure.id,
      name: procedure.title,
      category: '피부리프팅'
    });
  };

  const activeProcedure = skinLiftingProcedures.find(proc => proc.id === activeTab) || skinLiftingProcedures[0];

  return (
    <PageLayout>
      {/* 히어로 섹션 */}
      <div className="relative pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-smoke-400 via-elegant-400 to-teal-smoke-500"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center text-white">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-elegant-sans font-medium mb-8 border border-white/30">
              <Droplets className="w-4 h-4 mr-2" />
              SILOS SKIN LIFTING
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-light mb-6 tracking-wide leading-tight">
              피부 리프팅
            </h1>
            <div className="w-24 h-0.5 bg-white/60 rounded-full mx-auto mb-8"></div>
            <p className="text-xl font-elegant-sans font-light max-w-3xl mx-auto leading-relaxed text-white/90">
              근본부터 다른 피부 개선<br />
              건강하고 젊은 피부로의 변화를 경험하세요
            </p>
          </div>
        </div>
      </div>

      {/* 메인 섹션 */}
      <div className="relative pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          
          {/* 탭 네비게이션 */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-display font-light text-teal-smoke-800 mb-4">
                TREATMENTS
              </h3>
              <h4 className="text-2xl font-elegant font-light text-elegant-600 mb-6">
                피부 리프팅 시술
              </h4>
              <div className="w-20 h-0.5 bg-teal-smoke-300 rounded-full mx-auto"></div>
            </div>

            {/* 탭 버튼들 */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {skinLiftingProcedures.map((procedure) => (
                <button
                  key={procedure.id}
                  onClick={() => setActiveTab(procedure.id)}
                  className={`px-6 py-3 rounded-xl font-elegant-sans font-medium transition-all duration-300 ${
                    activeTab === procedure.id
                      ? 'bg-gradient-to-r from-teal-smoke-500 to-elegant-500 text-white shadow-lg'
                      : 'bg-white text-teal-smoke-700 border-2 border-teal-smoke-200 hover:border-teal-smoke-300 hover:bg-teal-smoke-50'
                  }`}
                >
                  {procedure.title}
                </button>
              ))}
            </div>

            {/* 선택된 시술 상세 정보 */}
            <div className="bg-white rounded-3xl shadow-2xl border border-teal-smoke-200/30 overflow-hidden">
              {/* 헤더 */}
              <div className="bg-gradient-to-r from-teal-smoke-500 to-elegant-500 py-12 px-8 text-center">
                <h3 className="text-4xl font-display font-light text-white mb-4 tracking-wide">
                  {activeProcedure.title}
                </h3>
                <p className="text-xl font-elegant-sans font-light text-white/90">
                  {activeProcedure.subtitle}
                </p>
              </div>

              {/* 콘텐츠 */}
              <div className="p-12">
                {/* 콜라채움 특별 레이아웃 */}
                {activeTab === 'collagen' && activeProcedure.mainTitle ? (
                  <div className="space-y-12">
                    {/* 메인 타이틀 및 설명 */}
                    <div className="text-center">
                      <h2 className="text-3xl lg:text-4xl font-display font-bold text-teal-smoke-800 mb-8 leading-tight">
                        {activeProcedure.mainTitle}
                      </h2>
                      <div className="w-32 h-1 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto mb-8"></div>
                      <p className="text-lg font-elegant-sans font-light text-teal-smoke-700 leading-relaxed max-w-4xl mx-auto">
                        {activeProcedure.mainDescription}
                      </p>
                    </div>

                    {/* 시술 효과와 벤다이어그램 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                      {/* 왼쪽: 시술 효과 박스 */}
                      <div className="bg-gradient-to-br from-teal-smoke-50 to-elegant-50 rounded-2xl p-8">
                        <h3 className="text-2xl font-elegant font-bold text-teal-smoke-800 mb-6 text-center">시술 효과</h3>
                        <div className="space-y-4">
                          {activeProcedure.benefits?.map((benefit, i) => (
                            <div key={i} className="flex items-center space-x-4">
                              <div className="w-8 h-8 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-sm">{i + 1}</span>
                              </div>
                              <p className="text-lg font-elegant-sans font-medium text-teal-smoke-700">{benefit}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* 오른쪽: 벤다이어그램 이미지 */}
                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-teal-smoke-200/30 flex items-center justify-center h-fit">
                        <img 
                          src="/images/procedures/skin-lifting/collagen/venn-diagram.jpg" 
                          alt="벤다이어그램"
                          className="w-auto h-auto max-w-full max-h-60 object-contain"
                        />
                      </div>
                    </div>

                    {/* 실로스만의 차별화 섹션 */}
                    <div className="text-center">
                      <h3 className="text-2xl font-elegant font-bold text-teal-smoke-800 mb-6">{activeProcedure.differentiator}</h3>
                      <div className="space-y-4 max-w-3xl mx-auto">
                        {activeProcedure.differentiatorDescription?.map((desc, i) => (
                          <p key={i} className="text-lg font-elegant-sans font-light text-teal-smoke-700 leading-relaxed">
                            {desc}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* 주사 이미지와 추가 정보 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      {/* 왼쪽: 주사 이미지 */}
                      <div className="bg-white rounded-2xl p-4 shadow-lg border border-teal-smoke-200/30 flex items-center justify-center max-w-md mx-auto">
                        <img 
                          src="/images/procedures/skin-lifting/collagen/injection-image.jpg" 
                          alt="주사 이미지"
                          className="w-auto h-auto max-w-full max-h-64 object-contain"
                        />
                      </div>
                      
                      {/* 오른쪽: 추가 정보 */}
                      <div>
                        <p className="text-lg font-elegant-sans font-medium text-teal-smoke-700 leading-relaxed whitespace-pre-line">
                          {activeProcedure.additionalInfo}
                        </p>
                      </div>
                    </div>

                    {/* 바 다이어그램과 연령별 정보 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      {/* 왼쪽: 바 다이어그램 */}
                      <div className="bg-white rounded-2xl p-4 shadow-lg border border-teal-smoke-200/30 flex items-center justify-center max-w-lg mx-auto">
                        <img 
                          src="/images/procedures/skin-lifting/collagen/age-collagen-chart.jpg" 
                          alt="연령별 콜라겐 감소 차트"
                          className="w-auto h-auto max-w-full max-h-72 object-contain"
                        />
                      </div>
                      
                      {/* 오른쪽: 연령별 콜라겐 감소 정보 */}
                      <div>
                        <h3 className="text-xl font-elegant font-bold text-teal-smoke-800 mb-4">{activeProcedure.ageInfo?.title}</h3>
                        <p className="text-lg font-elegant-sans font-light text-teal-smoke-700 leading-relaxed">
                          {activeProcedure.ageInfo?.description}
                        </p>
                      </div>
                    </div>

                    {/* 장바구니 버튼 */}
                    <div className="text-center">
                      <button
                        onClick={() => handleAddToCart(activeProcedure)}
                        className={`py-4 px-8 rounded-xl font-elegant-sans font-bold text-base transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 mx-auto ${
                          isInCart(activeProcedure.id)
                            ? 'bg-gradient-to-r from-green-200 to-green-300 text-green-800 cursor-default border-2 border-green-400'
                            : 'bg-gradient-to-r from-teal-smoke-400 to-elegant-400 text-white hover:from-teal-smoke-500 hover:to-elegant-500 border-2 border-transparent'
                        }`}
                        disabled={isInCart(activeProcedure.id)}
                      >
                        {isInCart(activeProcedure.id) ? (
                          <>
                            <Check className="w-5 h-5" />
                            <span>상담 리스트에 담김</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-5 h-5" />
                            <span>상담 신청하기</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* 기본 레이아웃 (다른 시술들) */
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* 설명 (2/3) */}
                    <div className="lg:col-span-2">
                      <div className="space-y-6 mb-10">
                        {activeProcedure.description.map((desc, i) => (
                          <div key={i} className="flex items-start space-x-4">
                            <div className="w-2 h-2 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mt-3 flex-shrink-0"></div>
                            <p className="text-lg text-teal-smoke-700 font-elegant-sans font-light leading-relaxed">
                              {desc}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* 특징 배지들 */}
                      <div className="flex flex-wrap gap-4 mb-8">
                        {activeProcedure.features.map((feature, i) => (
                          <div key={i} className="inline-flex items-center px-5 py-3 rounded-full text-sm font-elegant-sans font-bold bg-gradient-to-r from-teal-smoke-100 to-elegant-100 text-teal-smoke-800 border-2 border-teal-smoke-200 shadow-lg">
                            <Droplets className="w-4 h-4 mr-2" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      {/* 시술시간 및 카테고리 */}
                      <div className="flex items-center space-x-4">
                        <div className="inline-flex items-center px-5 py-3 rounded-full text-sm font-elegant-sans font-bold bg-gradient-to-r from-elegant-200 to-teal-smoke-200 text-teal-smoke-800 border-2 border-elegant-300 shadow-lg">
                          <Clock className="w-4 h-4 mr-2" />
                          {activeProcedure.duration}
                        </div>
                        <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-elegant-sans font-bold bg-gray-200 text-gray-700 border border-gray-300">
                          {activeProcedure.category}
                        </div>
                      </div>
                    </div>

                    {/* 이미지 및 장바구니 (1/3) */}
                    <div className="flex flex-col items-center justify-between">
                      <div className="w-full h-64 bg-gradient-to-br from-teal-smoke-100 to-elegant-100 rounded-2xl border-2 border-teal-smoke-200/30 flex items-center justify-center mb-8 shadow-lg">
                        <div className="text-center text-teal-smoke-400">
                          <Droplets className="w-20 h-20 mx-auto mb-4" />
                          <p className="font-elegant-sans font-medium">
                            {activeProcedure.title}
                          </p>
                        </div>
                      </div>

                      {/* 장바구니 버튼 */}
                      <button
                        onClick={() => handleAddToCart(activeProcedure)}
                        className={`w-full py-4 px-6 rounded-xl font-elegant-sans font-bold text-base transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                          isInCart(activeProcedure.id)
                            ? 'bg-gradient-to-r from-green-200 to-green-300 text-green-800 cursor-default border-2 border-green-400'
                            : 'bg-gradient-to-r from-teal-smoke-400 to-elegant-400 text-white hover:from-teal-smoke-500 hover:to-elegant-500 border-2 border-transparent'
                        }`}
                        disabled={isInCart(activeProcedure.id)}
                      >
                        {isInCart(activeProcedure.id) ? (
                          <>
                            <Check className="w-5 h-5" />
                            <span>상담 리스트에 담김</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-5 h-5" />
                            <span>상담 신청하기</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 전체 상담 신청 섹션 */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-white/80 to-teal-smoke-50/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/50">
              <h3 className="text-3xl lg:text-4xl font-display font-bold text-teal-smoke-800 mb-6">
                피부 리프팅 상담 신청
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto mb-8"></div>
              <p className="text-xl font-elegant-sans font-medium text-teal-smoke-700 mb-10">
                나에게 가장 적합한 피부 리프팅을 찾아보세요
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