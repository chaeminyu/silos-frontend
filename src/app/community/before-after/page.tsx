'use client';

import { useState } from 'react';
import PageLayout from '../../../components/PageLayout';
import { ChevronLeft, ChevronRight, Eye, Calendar, Sparkles } from 'lucide-react';

// Mock Before & After data
const mockBeforeAfterData = [
  {
    id: '1',
    title: '실로스 실리프팅 - 40대 여성',
    category: '실리프팅',
    beforeImage: '/images/before-after/ba-1-before.jpg',
    afterImage: '/images/before-after/ba-1-after.jpg',
    description: '처진 볼살과 팔자주름이 개선된 자연스러운 변화',
    procedure: '실로스 실리프팅 + 볼살 리프팅',
    duration: '30분',
    period: '시술 후 2개월',
    views: 1247,
    date: '2024-01-15',
    gradient: 'from-teal-smoke-100 to-elegant-100'
  },
  {
    id: '2',
    title: '실로팻 지방추출주사 - 30대 여성',
    category: '지방추출',
    beforeImage: '/images/before-after/ba-2-before.jpg',
    afterImage: '/images/before-after/ba-2-after.jpg',
    description: '이중턱과 볼살이 슬림하게 정리된 V라인',
    procedure: '실로팻 - 이중턱 + 볼라인',
    duration: '20분',
    period: '시술 후 1개월',
    views: 892,
    date: '2024-01-10',
    gradient: 'from-elegant-100 to-teal-smoke-100'
  },
  {
    id: '3',
    title: '반달레이저 눈밑지방제거 - 50대 여성',
    category: '눈밑지방레이저',
    beforeImage: '/images/before-after/ba-3-before.jpg',
    afterImage: '/images/before-after/ba-3-after.jpg',
    description: '다크서클과 눈밑 불룩함이 동시에 개선',
    procedure: '반달레이저 + 눈밑지방제거',
    duration: '15분',
    period: '시술 후 3주',
    views: 654,
    date: '2024-01-05',
    gradient: 'from-teal-smoke-200 to-elegant-200'
  },
  {
    id: '4',
    title: '넥리프팅 + 이중턱 개선 - 60대 여성',
    category: '넥리프팅',
    beforeImage: '/images/before-after/ba-4-before.jpg',
    afterImage: '/images/before-after/ba-4-after.jpg',
    description: '목주름과 이중턱이 획기적으로 개선된 사례',
    procedure: '넥리프팅 + 실로팻 복합시술',
    duration: '45분',
    period: '시술 후 6주',
    views: 1156,
    date: '2023-12-28',
    gradient: 'from-elegant-200 to-teal-smoke-300'
  },
  {
    id: '5',
    title: '울쎄라 + 실리프팅 복합 - 45대 여성',
    category: '복합시술',
    beforeImage: '/images/before-after/ba-5-before.jpg',
    afterImage: '/images/before-after/ba-5-after.jpg',
    description: '피부 탄력과 리프팅 효과를 동시에',
    procedure: '울쎄라 + 실로스 실리프팅',
    duration: '60분',
    period: '시술 후 2개월',
    views: 943,
    date: '2023-12-20',
    gradient: 'from-teal-smoke-300 to-elegant-300'
  },
  {
    id: '6',
    title: '미니거상 + 볼살리프팅 - 35대 여성',
    category: '미니거상',
    beforeImage: '/images/before-after/ba-6-before.jpg',
    afterImage: '/images/before-after/ba-6-after.jpg',
    description: '최소 절개로 자연스러운 동안 효과',
    procedure: '실로퀵 미니거상 + 볼살정리',
    duration: '40분',
    period: '시술 후 1개월',
    views: 578,
    date: '2023-12-15',
    gradient: 'from-elegant-300 to-teal-smoke-200'
  }
];

const categories = ['전체', '실리프팅', '지방추출', '눈밑지방레이저', '넥리프팅', '복합시술', '미니거상'];

export default function BeforeAfterPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedCase, setSelectedCase] = useState<typeof mockBeforeAfterData[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredData = selectedCategory === '전체' 
    ? mockBeforeAfterData 
    : mockBeforeAfterData.filter(item => item.category === selectedCategory);

  const handleCaseClick = (caseData: typeof mockBeforeAfterData[0]) => {
    setSelectedCase(caseData);
    setCurrentImageIndex(0);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => prev === 0 ? 1 : 0);
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => prev === 0 ? 1 : 0);
  };

  return (
    <PageLayout>
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-light text-slate-800 mb-6 tracking-wide">
              Before & After
            </h1>
            <div className="w-24 h-0.5 bg-teal-smoke-300 rounded-full mx-auto mb-8"></div>
            <p className="text-lg md:text-xl font-elegant-sans font-light text-slate-700 max-w-3xl mx-auto leading-relaxed">
              실로스에서 새로운 아름다움을 찾은 고객들의 <span className="text-cyan-700 font-medium">실제 변화</span>를 확인하세요
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-elegant-sans font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-teal-smoke-500 to-elegant-500 text-white shadow-lg'
                    : 'bg-white text-slate-700 border-2 border-teal-smoke-200 hover:border-teal-smoke-300 hover:bg-teal-smoke-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredData.map((item) => (
              <div
                key={item.id}
                onClick={() => handleCaseClick(item)}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group hover:-translate-y-2 border border-teal-smoke-200/30"
              >
                {/* Before/After Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                    <div className="text-center text-slate-700">
                      <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-10 h-10 text-slate-600" />
                      </div>
                      <p className="font-elegant-sans font-medium text-lg">
                        Before & After
                      </p>
                      <p className="text-sm text-slate-600 mt-2">
                        클릭하여 확인
                      </p>
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-cyan-700 text-xs font-elegant-sans font-bold rounded-full">
                      {item.category}
                    </span>
                  </div>
                  
                  {/* Views Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center px-2 py-1 bg-black/20 backdrop-blur-sm text-white text-xs font-elegant-sans rounded-full">
                      <Eye className="w-3 h-3 mr-1" />
                      {item.views}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-elegant font-medium text-slate-800 mb-3 leading-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-600 font-elegant-sans text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                  
                  <div className="space-y-2 text-xs text-slate-500 font-elegant-sans">
                    <div className="flex items-center">
                      <span className="font-medium text-slate-700 w-16">시술:</span>
                      <span>{item.procedure}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-slate-700 w-16">기간:</span>
                      <span>{item.period}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1 text-slate-400" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredData.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-500 font-elegant-sans text-lg">
                해당 카테고리의 사례가 준비 중입니다.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal for detailed view */}
      {selectedCase && (
        <div className="fixed inset-0 z-[100000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-teal-smoke-200">
              <h2 className="text-2xl font-elegant font-medium text-slate-800">
                {selectedCase.title}
              </h2>
              <button
                onClick={() => setSelectedCase(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Section */}
                <div className="space-y-4">
                  <div className="relative">
                    <div className={`aspect-[4/3] bg-gradient-to-br ${selectedCase.gradient} rounded-2xl flex items-center justify-center relative overflow-hidden`}>
                      <div className="text-center text-slate-700">
                        <div className="w-24 h-24 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Sparkles className="w-12 h-12 text-slate-600" />
                        </div>
                        <p className="font-elegant-sans font-medium text-xl mb-2">
                          {currentImageIndex === 0 ? 'Before' : 'After'}
                        </p>
                        <p className="text-sm text-slate-600">
                          실제 시술 사례
                        </p>
                      </div>
                    </div>
                    
                    {/* Navigation Buttons */}
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all"
                    >
                      <ChevronLeft className="w-5 h-5 text-slate-600" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all"
                    >
                      <ChevronRight className="w-5 h-5 text-slate-600" />
                    </button>
                  </div>
                  
                  {/* Image Toggle */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentImageIndex(0)}
                      className={`flex-1 py-2 px-4 rounded-xl font-elegant-sans font-medium transition-all ${
                        currentImageIndex === 0
                          ? 'bg-teal-smoke-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Before
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex(1)}
                      className={`flex-1 py-2 px-4 rounded-xl font-elegant-sans font-medium transition-all ${
                        currentImageIndex === 1
                          ? 'bg-teal-smoke-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      After
                    </button>
                  </div>
                </div>

                {/* Details Section */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-elegant font-medium text-slate-800 mb-3">시술 정보</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <span className="font-medium text-slate-700 w-20 flex-shrink-0">카테고리:</span>
                        <span className="text-slate-600 font-elegant-sans">{selectedCase.category}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium text-slate-700 w-20 flex-shrink-0">시술명:</span>
                        <span className="text-slate-600 font-elegant-sans">{selectedCase.procedure}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium text-slate-700 w-20 flex-shrink-0">소요시간:</span>
                        <span className="text-slate-600 font-elegant-sans">{selectedCase.duration}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium text-slate-700 w-20 flex-shrink-0">촬영시기:</span>
                        <span className="text-slate-600 font-elegant-sans">{selectedCase.period}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-elegant font-medium text-slate-800 mb-3">변화 포인트</h3>
                    <p className="text-slate-700 font-elegant-sans leading-relaxed bg-teal-smoke-50 rounded-xl p-4">
                      {selectedCase.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-500 font-elegant-sans border-t border-teal-smoke-200 pt-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{selectedCase.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      <span>{selectedCase.views} views</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}